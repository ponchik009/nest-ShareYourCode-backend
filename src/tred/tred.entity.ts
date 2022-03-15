import { ApiProperty } from "@nestjs/swagger";
import { Group } from "src/group/group.entity";
import { User } from "src/users/users.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Tred {
  @ApiProperty({ example: 1, description: "Уникальный идентификатор" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Задача про огурцы",
    description: "Название треда",
  })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({
    example:
      "На вход подаются два огурца разной длины. Необходимо посчитать сумму длин этих огурцов",
    description: "Описание",
  })
  @Column("text", { nullable: false })
  description: string;

  @ApiProperty({
    example: true,
    description: "Могут ли участники сообщества смотреть посылки друг друга",
  })
  @Column({ nullable: false, default: false })
  isPublic: boolean;

  @ApiProperty({
    example: 10,
    description: "Ограничение по числу посылок для одного пользователя",
  })
  @Column({ nullable: false, default: 100 })
  maxPackages: number;

  @ApiProperty({
    example: true,
    description: "Можно ли отправлять посылки в тред",
  })
  @Column({ nullable: false, default: true })
  isOpen: boolean;

  @ApiProperty({
    example: "Tue, 15 Mar 2022 06:25:11 GMT",
    description:
      "Дата закрытия треда (можно использовать new Date(Date.now() + 10000)toUTCString())",
  })
  @Column({ nullable: true, default: null })
  closeDate: Date;

  @ApiProperty({
    example: {
      id: 1,
      name: "Сообщество 1",
      descrtiption: "Крутое сообщвество для крутых парней",
      isOpen: true,
    },
    description: "Группа, в которой находится тред",
  })
  @ManyToOne(() => Group, (group: Group) => group.treds)
  group: Group;
}
