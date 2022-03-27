import { ApiProperty } from "@nestjs/swagger";
import { GetUserDto } from "src/auth/dto/getUserDto.dto";
import { GetUsernameDto } from "src/auth/dto/getUsernameDto.dto";

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
    example: 100500,
    description: "Количество людей в сообществе",
  })
  readonly membersCount: number;
}
