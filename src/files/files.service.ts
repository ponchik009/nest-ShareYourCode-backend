import { Injectable } from "@nestjs/common";
import fs from "fs";
import { v4 } from "uuid";
import { spawnSync } from "child_process";
import { Language } from "src/package/entities/language.entity";

@Injectable()
export class FilesService {
  async execute(
    code: string,
    input: string,
    cmd_input: string,
    language: Language
  ) {
    const script_path = "/home/syc/run.sh";
    const dirname = "/tmp/syc";

    const code_filename = dirname + "/" + v4();
    const input_filename = dirname + "/" + v4();
    const out_filename = dirname + "/" + v4();
    const out_err_filename = dirname + "/" + v4();
    const meta_out_filename = dirname + "/" + v4();

    const memory_limit = "25m";
    const cpu_limit = "1";
    const tmpfs = "0";
    const time = "3";
    const size = "65536";
    const size_2 = "65536";
    const cmd = cmd_input.split(" ");

    // создаем директорию
    this.createDir(dirname);

    // пишем файлы
    await this.writeFiles(code_filename, code, input_filename, input);

    // вызываем скрипт
    // console.log("execute script");
    const ls = spawnSync(script_path, [
      code_filename,
      input_filename,
      out_filename,
      out_err_filename,
      meta_out_filename,
      language.name,
      memory_limit,
      cpu_limit,
      tmpfs,
      time,
      size,
      size_2,
      ...cmd,
    ]);

    // читаем с выходных файлов
    // console.log("read from files");
    const [out, out_err, out_meta] = await this.readFiles(
      out_filename,
      out_err_filename,
      meta_out_filename
    );

    // удаляем файлы
    // console.log("delete files");
    await this.deleteFiles(
      code_filename,
      input_filename,
      out_filename,
      out_err_filename,
      meta_out_filename
    );

    return {
      out,
      out_err,
      out_meta,
    };
  }

  private createDir(dirname: string) {
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname);
    }
    fs.chmodSync(dirname, 0x700);
  }

  private async writeFiles(
    code_filename: string,
    code: string,
    input_filename: string,
    input: string
  ) {
    const codeFile = this.writeFileAsync(code_filename, code);
    const inputFile = this.writeFileAsync(input_filename, input);

    return Promise.all([codeFile, inputFile]);
  }

  private async readFiles(
    out_filename: string,
    out_err_filename: string,
    meta_out_filename: string
  ) {
    const out = this.readFileAsync(out_filename);
    const out_err = this.readFileAsync(out_err_filename);
    const out_meta = this.readFileAsync(meta_out_filename);

    return Promise.all([out, out_err, out_meta]);
  }

  private async deleteFiles(
    code_filename: string,
    input_filename: string,
    out_filename: string,
    out_err_filename: string,
    meta_out_filename: string
  ) {
    const code = this.deleteFileAsync(code_filename);
    const input = this.deleteFileAsync(input_filename);
    const out = this.deleteFileAsync(out_filename);
    const out_err = this.deleteFileAsync(out_err_filename);
    const out_meta = this.deleteFileAsync(meta_out_filename);

    return Promise.all([code, input, out, out_err, out_meta]);
  }

  // make promise version of fs.readFile()
  private writeFileAsync(filename: string, text: string) {
    return new Promise(function (resolve, reject) {
      fs.writeFile(filename, text, (err) => {
        if (err) reject(err);
        else resolve("writed");
      });
    });
  }

  private readFileAsync(filename: string) {
    return new Promise(function (resolve, reject) {
      fs.readFile(filename, "utf-8", function (err, data) {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  private deleteFileAsync(filename: string) {
    return new Promise(function (resolve, reject) {
      fs.unlink(filename, (err) => {
        if (err) reject(err);
        else resolve("deleted");
      });
    });
  }
}
