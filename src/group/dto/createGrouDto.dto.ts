import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateGroupDto {
  @ApiProperty({
    example: "Отряд сосистеров!!",
    description: "Название сообщества",
  })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example:
      "Группа для смелых парней, которые знают, что значит быть успешным",
    description: "Описание",
  })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({
    example: true,
    description: "Доступно ли сообщество в глобальном поиске",
    required: false,
    default: true,
  })
  @IsNotEmpty()
  readonly isOpen: boolean;
}
