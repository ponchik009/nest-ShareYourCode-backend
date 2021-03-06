# Бекенд приложения Share Your Code. Инструкция по развёртыванию

## Что это?

Цель данного приложения - создать платформу, участники которой смогут выклыдывать свой код, исполнять его, а также давать оценки.
В данном репозитории представлена бекенд часть приложения.

## Требования к системе

Linux (тестировалось на Debian), Windows. В случае Windows компиляция работать не будет (т.к. участвует bash-скрипт).

## Требования к ПО

1. NodeJS (разработка была на версии 16) - интерпритатор javascript. Ссылка на установку: https://nodejs.org/en/
2. npm - сборщик пакетов javascript (поставляется вместе с NodeJS)
3. Docker (версия 3+) - инструмент контейнеризации (в данном проекте необходим для Базы данных, а также для исполнения кода пользователей). Ссылка на установку: https://www.docker.com/products/docker-desktop/

Вроде бы всё.

## Инструкция по сборке

### Клоинрование репозитория
$ git clone https://github.com/ponchik009/nest-ShareYourCode-backend/

### Переход в папку проекта
$ cd nest-ShareYourCode-backend

### Установка пакетов
$ npm install

### Найтрока конфигурации
<p>В корне проекта создаем файл .env</p>
<p>Содержимое файла:</p>
<ul>
  <li>PORT=<порт, на котром будет висеть приложение></li>
  <li>POSTRES_HOST=<сеть, в которой находится база данных (в нашем случае localhost)></li>
  <li>POSTGRES_PORT=<порт, на котором будет висеть база данных (например, 5432)></li>
  <li>POSTGRES_USER=<пользователь базы данных (например, postgres)></li>
  <li>POSTGRES_PASSWORD=<пароль к пользователю базы данных (например, admin)></li>
  <li>POSTGRES_DB=<название базы данных (например, syc)></li>
  <li>POSTGRES_DATA_DIR=<путь к директории, в которой контейнер будет хранить данные постгреса на хостовой машине (например, /data/postgres)></li>
  <li>PORPGADMIN_DEFAULT_EMAIL=< email для использования pgadmin (например, admin@admin.com)></li>
  <li>PGADMIN_DEFAULT_PASSWORD=<пароль для pgadmin (например, admin)></li>
  <li>PGADMIN_PORT=<порт для pgadmin (например, 9000)></li>
  <li>PGADMIN_DATA_DIR=<путь к директории, в которой контейнер будет хранить данные постгреса на хостовой машине (например, /data/pgadmin)></li>
  <li>JWT_SECRET = <секретный ключ для jwt-токена (например, 'aboba228')></li>
  <li>JWT_EXPIRATION_TIME = <время жизни jwt-токена (например, '31536000' - год)></li>
  <li>SCRIPT_PATH=<путь до скрипта, компилирующего код (изначально он находится в корне, указываем "./run.sh")></li>
  <li>TMP_DIR=<путь к директории для создания промежуточных файлов во время компиляции (например, "/etc/tmp")></li>
</ul>

### Запуск контейнера с базой данных и pgadmin
$ docker-compose up &

<p>Примечание: возможно, после этой команды надо будет открыть новое окно терминала</p>

###  Добавление фронтенда
<p>Если вам нужен фронтенд (сайт), то вам необходимо произвести его сборку: https://github.com/ponchik009/react-ShareYourCode-frontend</p>
<p>После получения папки build, необходимо перенести её в корень ДАННОГО проекта и переименовать на <b>client</b></p>

### Запуск приложения
$ npm run start:dev

### Итого
После выполнения всех вышеперечисленных действий, на указанном порту будет запущено приложение.
