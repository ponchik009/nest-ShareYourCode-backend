import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { GetGroupDto } from "src/group/dto/getGroupDto.dto";

export class CreateTredDto {
  @ApiProperty({
    example: 1,
    description: "ID сообщества",
  })
  groupId: number;

  @ApiProperty({
    example: "Задача про огурцы",
    description: "Название треда",
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example:
      "На вход подаются два огурца разной длины. Необходимо посчитать сумму длин этих огурцов",
    description: "Описание",
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: true,
    description: "Могут ли участники сообщества смотреть посылки друг друга",
  })
  isPublic: boolean;

  @ApiProperty({
    example: 10,
    description: "Ограничение по числу посылок для одного пользователя",
  })
  maxPackages: number;

  @ApiProperty({
    example: true,
    description: "Можно ли отправлять посылки в тред",
  })
  isOpen: boolean;

  @ApiProperty({
    example: "Tue, 15 Mar 2022 06:25:11 GMT",
    description:
      "Дата закрытия треда (можно использовать new Date(Date.now() + 10000)toUTCString())",
  })
  closeDate: Date;
}
