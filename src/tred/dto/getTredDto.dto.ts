import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { GetGroupDto } from "src/group/dto/getGroupDto.dto";
import { GetPublicGroupDto } from "src/group/dto/getPublicGroupsDto.dto";
import { Group } from "src/group/group.entity";
import { Package } from "src/package/entities/package.entity";

export class GetTredDto {
  @ApiProperty({
    example: 1,
    description: "ID треда",
  })
  id: number;

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
    default: false,
    required: false,
  })
  isPublic: boolean;

  @ApiProperty({
    example: 10,
    description: "Ограничение по числу посылок для одного пользователя",
    default: 10,
    required: false,
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

  @ApiProperty({
    example: {
      id: 7,
      name: "Group 1",
    },
    description: "Группа треда",
    type: () => Group,
  })
  group: Group;

  @ApiProperty({
    example: [
      {
        id: 7,
        date: "2022-03-24T12:30:10.471Z",
        user: {
          id: 4,
          name: "ponchik009",
        },
        language: {
          id: 1,
          name: "python",
        },
      },
    ],
    description: "Посылки треда",
    type: () => [Package],
  })
  packages: Package[];
}
