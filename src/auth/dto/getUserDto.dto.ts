import { ApiProperty } from "@nestjs/swagger";
import { GetGroupDto } from "src/group/dto/getGroupDto.dto";

export class GetUserDto {
  @ApiProperty({
    example: "1",
    description: "Уникальный идентификатор",
  })
  readonly id: number;

  @ApiProperty({
    example: "ponchik009",
    description: "Имя (никнейм)",
  })
  readonly name: string;

  @ApiProperty({
    example: true,
    description: "Открытый или закрытый аккаунт",
  })
  readonly isPublic: boolean;
}
