#!/usr/bin/env bash

# Аргументы командной строки

code_input_file=$1
standard_input_file=$2
standard_output_file=$3
standard_error_file=$4
meta_output_file=$5

language=$6
memory_limit=$7
cpu_limit=$8
tmpfs_size=$9
timeout=${10}
output_limit=${11}
error_limit=${12}

shift 12

# Определяем язык

container_tmpfs=(
	"--tmpfs" "/mnt:rw,exec,nosuid,size=$tmpfs_size"
	"--workdir" "/mnt"
)

case "$language" in
"python")
	container_code_file="/main.py"
	container_image="python:3-slim"
	container_command=("python" "/main.py")
	container_tmpfs=() # TMPFS не нужен
	;;
"javascript")
	container_code_file="/main.js"
	container_image="node:slim"
	container_command=("node" "/main.js")
	container_tmpfs=() # TMPFS не нужен
	;;
"native")
	container_code_file="/a.out"
	container_image="gcc"
	container_command=("/a.out")
	container_tmpfs=() # TMPFS не нужен
	;;
"c-compile")
	container_code_file="/main.c"
	container_image="gcc"
	container_command=("bash" "-c" "gcc /main.c && ./a.out")
	;;
"c++-compile")
	container_code_file="/main.cpp"
	container_image="gcc"
	container_command=("bash" "-c" "g++ /main.cpp && ./a.out")
	;;
*)
	echo "Неизвестный язык" >&2
	exit 1
esac

# Создаём контейнер

container_id=$(docker create \
	--read-only \
	--network none \
	--memory "$memory_limit" \
	--ulimit cpu="$cpu_limit" \
	--stop-signal KILL \
	--interactive \
	--mount type=bind,source="$code_input_file",destination="$container_code_file",readonly \
	"${container_tmpfs[@]}" \
	"$container_image" \
	"${container_command[@]}" "$@")

# Запускаем таймер, который остановит контейнер, если он не успеет завершиться сам

(sleep "$timeout"; docker stop "$container_id" > /dev/null 2> /dev/null) &

# Запускаем контейнер

cat "$standard_input_file" | \
	docker start --interactive --attach "$container_id" > \
	>(head -c "$output_limit" > "$standard_output_file") 2> \
	>(head -c "$error_limit" > "$standard_error_file")

# Получаем информацию о статусе контейнера и удаляем его

docker stop "$container_id" > /dev/null
docker inspect "$container_id" > "$meta_output_file"
docker rm "$container_id" > /dev/null
