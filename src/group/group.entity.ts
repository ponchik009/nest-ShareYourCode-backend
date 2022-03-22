import { ApiProperty } from "@nestjs/swagger";
import { truncate } from "fs";
import { Tred } from "src/tred/tred.entity";
import { User } from "src/users/users.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Group {
  @ApiProperty({ example: 1, description: "Уникальный идентификатор" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Отряд сосистеров!!",
    description: "Название сообщества",
  })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({
    example:
      "Группа для смелых парней, которые знают, что значит быть успешным",
    description: "Описание",
  })
  @Column("text", { nullable: false })
  description: string;

  @ApiProperty({
    example: true,
    description: "Доступно ли сообщество в глобальном поиске",
  })
  @Column({ nullable: false })
  isOpen: boolean;

  @ApiProperty({
    example: "uuuu-aaaa-bbbb-cccc",
    description: "Пригласительная ссылка",
  })
  @Column({ nullable: true, unique: true })
  inviteLink: string;

  @ApiProperty({
    example: "Tue, 15 Mar 2022 06:25:11 GMT",
    description: "Дата окончания действия ссылки",
  })
  @Column({ nullable: true })
  inviteLinkEndDate: Date;

  @ApiProperty({
    example: { id: 1, email: "123@mail.ru" },
    description: "Администратор сообщества",
  })
  @ManyToOne(() => User)
  admin: User;

  @ApiProperty({
    example: [
      { id: 1, email: "123@mail.ru" },
      { id: 2, email: "321@mail.ru" },
    ],
    description: "Члены сообщества",
  })
  @ManyToMany(() => User, (user: User) => user.groups)
  @JoinTable()
  members: User[];

  @ApiProperty({
    example: {
      id: 1,
      name: "Сообщество 1",
      descrtiption: "Крутое сообщвество для крутых парней",
      isPublic: true,
      isOpen: true,
      maxPackages: 10,
      closeDate: new Date(),
    },
    description: "Треды сообщества",
  })
  @OneToMany(() => Tred, (tred: Tred) => tred.group, { onDelete: "CASCADE" })
  treds: Tred[];
}
