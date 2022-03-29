import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Language } from "../../package/entities/language.entity";

export class ProgramDto {
  @ApiProperty({
    example: "print('Hello world!')",
    description: "Исходный код",
  })
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: "1 2 3",
    description: "Стандартный поток ввода",
  })
  @IsNotEmpty()
  input: string;

  @ApiProperty({
    example: {
      id: 1,
      name: "python",
    },
    description: "Язык программирования",
    type: () => Language,
  })
  @IsNotEmpty()
  language: Language;

  @ApiProperty({
    example: "1 2 3",
    description: "Входные параметры командной строки",
  })
  @IsNotEmpty()
  cmd_input: string;
}
