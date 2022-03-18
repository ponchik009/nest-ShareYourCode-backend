import { ApiProperty } from "@nestjs/swagger";
import { Comment } from "src/comment/comment.entity";
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
        id: 5,
        code: "print(1)",
        review: null,
        date: "2022-03-18T13:43:59.425Z",
      },
      {
        id: 6,
        code: "print(1)",
        review: null,
        date: "2022-03-18T13:43:59.425Z",
      },
    ],
    description: "Посылки пользователя",
  })
  @OneToMany(() => Package, (pack: Package) => pack.user)
  packages: Package[];

  @ApiProperty({
    example: [
      {
        id: 1,
        name: "О, да",
      },
      {
        id: 2,
        name: "Это ужасно",
      },
    ],
    description: "Комментарии пользователя",
  })
  @OneToMany(() => Comment, (comment: Comment) => comment.user)
  comments: Comment[];
}
