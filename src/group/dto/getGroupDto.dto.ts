import { ApiProperty } from "@nestjs/swagger";
import { GetUserDto } from "src/auth/dto/getUserDto.dto";
import { GetUsernameDto } from "src/auth/dto/getUsernameDto.dto";
import { Tred } from "src/tred/tred.entity";
import { User } from "src/users/users.entity";

export class GetGroupDto {
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
    example: "aaaa-bbbb-cccc-dddd",
    description: "Пригласительная ссылка",
  })
  readonly inviteLink: string;

  @ApiProperty({
    example: "Tue, 15 Mar 2022 06:25:11 GMT",
    description: "Дата окончания действия пригласительной ссылки",
  })
  readonly inviteLinkEndDate: Date;

  @ApiProperty({
    example: [
      {
        id: 1,
        name: "ponchik009",
      },
    ],
    description: "Члены сообщества",
    type: () => [User],
  })
  readonly members: User[];

  @ApiProperty({
    example: {
      id: 1,
      name: "ponchik009",
    },
    description: "Администратор сообщества",
    type: () => User,
  })
  readonly admin: User;

  @ApiProperty({
    example: [
      {
        id: 3,
        name: "Tred 1",
        description: "cool tred for cool guys",
        isPublic: true,
        maxPackages: 1,
        isOpen: true,
        closeDate: "2022-03-30T06:25:11.000Z",
      },
    ],
    description: "Треды сообщества",
    type: () => [Tred],
  })
  readonly treds: Tred[];
}
