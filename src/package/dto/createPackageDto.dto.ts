import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Language } from "../entities/language.entity";

export class CreatePackageDto {
  @ApiProperty({
    example: "print('Hello world!')",
    description: "Исходный код",
  })
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: 3,
    description: "ID треда",
  })
  @IsNotEmpty()
  tredId: number;

  @ApiProperty({
    example: {
      id: 1,
      name: "python",
    },
    description: "Язык программирования",
  })
  @IsNotEmpty()
  language: Language;
}
