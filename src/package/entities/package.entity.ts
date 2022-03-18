import { ApiProperty } from "@nestjs/swagger";
import { Comment } from "src/comment/comment.entity";
import { Group } from "src/group/group.entity";
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
import { Language } from "./language.entity";

@Entity()
export class Package {
  @ApiProperty({ example: 1, description: "Уникальный идентификатор" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: `print("Съешь ещё этих мягких французских булок, да выпей чаю")`,
    description: "Исходный код",
  })
  @Column("text", { nullable: false })
  code: string;

  @ApiProperty({
    example: "Отличный код! Я горужсь тобой!",
    description: "Ревью кода",
  })
  @Column("text", { nullable: true })
  review: string;

  @ApiProperty({
    example: {
      id: 3,
      name: "Tred 1",
      description: "cool tred for cool guys",
      isPublic: true,
      maxPackages: 5,
      isOpen: true,
      closeDate: "2022-03-15T06:25:11.000Z",
    },
    description: "Тред, в котором находится посылка",
  })
  @ManyToOne(() => Tred, (tred: Tred) => tred.packages)
  tred: Tred;

  @ApiProperty({
    example: {
      id: 1,
      name: "ponchik009",
    },
    description: "Автор посылки",
  })
  @ManyToOne(() => User, (user: User) => user.packages)
  user: User;

  @ApiProperty({
    example: {
      id: 1,
      name: "python",
    },
    description: "Язык, на котором написан код",
  })
  @ManyToOne(() => Language, (language: Language) => language.packages)
  language: Language;

  @ApiProperty({
    example: "Tue, 15 Mar 2022 06:25:11 GMT",
    description: "Дата отправки",
  })
  @Column({ nullable: false })
  date: Date;

  @ApiProperty({
    example: [
      {
        id: 1,
        name: "python",
      },
    ],
    description: "Язык, на котором написан код",
  })
  @OneToMany(() => Comment, (comment: Comment) => comment.pack)
  comments: Comment[];
}
