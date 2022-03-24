import { ApiProperty } from "@nestjs/swagger";
import { Group } from "src/group/group.entity";
import { Package } from "src/package/entities/package.entity";
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
export class Comment {
  @ApiProperty({ example: 1, description: "Уникальный идентификатор" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: `Прекрасно! Замечательно!`,
    description: "Текст комментария",
  })
  @Column({ nullable: false })
  text: string;

  @ApiProperty({
    example: {
      id: 5,
      code: "print(1)",
      review: null,
      date: "2022-03-18T13:43:59.425Z",
    },
    description: "Посылка, к которой прикреплен комментарий",
    type: () => Package,
  })
  @ManyToOne(() => Package, (pack: Package) => pack.comments)
  pack: Package;

  @ApiProperty({
    example: {
      id: 5,
      name: "ponchik009",
    },
    description: "Автор комментария",
    type: () => User,
  })
  @ManyToOne(() => User, (user: User) => user.comments)
  user: User;
}
