import { ApiProperty } from "@nestjs/swagger";
import { Group } from "src/group/group.entity";
import { Package } from "src/package/entities/package.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
  @ApiProperty({ example: 1, description: "Уникальный идентификатор" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "user@mail.ru",
    description: "Адрес электронной почты",
  })
  @Column({ unique: true, nullable: false, select: false })
  email: string;

  @ApiProperty({
    example: "poncik009",
    description: "Имя (никнейм)",
  })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ example: "qwerty", description: "Пароль" })
  @Column({ nullable: false, select: false })
  password: string;

  @ApiProperty({
    example: [
      { id: 1, name: "Сообщество 1" },
      { id: 2, name: "Сообщество 2" },
    ],
    description: "Сообщества пользователя",
  })
  @ManyToMany(() => Group, (group: Group) => group.members)
  groups: Group[];

  @ApiProperty({
    example: [
      {
        id: 1,
        date: "Tue, 15 Mar 2022 06:25:11 GMT",
      },
      {
        id: 2,
        date: "Tue, 15 Mar 2022 06:25:11 GMT",
      },
    ],
    description: "Посылки пользователя",
  })
  @OneToMany(() => Package, (pack: Package) => pack.user)
  packages: Package[];
}
