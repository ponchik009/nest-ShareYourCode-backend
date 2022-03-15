import { ApiProperty } from "@nestjs/swagger";
import { GetUserDto } from "src/auth/dto/getUserDto.dto";

export class GetPublicGroupDto {
  @ApiProperty({
    example: "1",
    description: "Уникальный идентификатор",
  })
  readonly id: number;

  @ApiProperty({
    example: "Сообщество 1",
    description: "Название сообщества",
  })
  readonly name: string;

  @ApiProperty({
    example:
      "Группа для смелых парней, которые знают, что значит быть успешным",
    description: "Описание",
  })
  readonly description: string;

  @ApiProperty({
    example: true,
    description: "Доступно ли сообщество в глобальном поиске",
  })
  readonly isOpen: boolean;

  @ApiProperty({
    example: [
      {
        id: 1,
        name: "ponchik009",
      },
    ],
    description: "Члены сообщества",
  })
  readonly members: GetUserDto[];
}
