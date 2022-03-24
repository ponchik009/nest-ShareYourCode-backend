import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: "user@mail.ru",
    description: "Адрес электронной почты",
  })
  readonly email: string;

  @MinLength(6)
  @IsNotEmpty()
  @ApiProperty({ example: "qwerty", description: "Пароль" })
  readonly password: string;
}
