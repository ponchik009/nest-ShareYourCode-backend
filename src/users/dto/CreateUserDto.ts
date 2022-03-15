import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: "user@mail.ru",
    description: "Адрес электронной почты",
  })
  readonly email: string;

  @MaxLength(20)
  @IsNotEmpty()
  @ApiProperty({ example: "ponchik009", description: "Имя (никнейм)" })
  readonly name: string;

  @MinLength(6)
  @IsNotEmpty()
  @ApiProperty({ example: "qwerty", description: "Пароль" })
  readonly password: string;
}
