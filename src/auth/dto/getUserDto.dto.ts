import { ApiProperty } from "@nestjs/swagger";

export class GetUserDto {
  @ApiProperty({
    example: "1",
    description: "Уникальный идентификатор",
  })
  readonly id: number;

  @ApiProperty({
    example: "user@mail.ru",
    description: "Адрес электронной почты",
  })
  readonly email: string;
}
