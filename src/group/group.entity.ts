import { ApiProperty } from "@nestjs/swagger";
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
}
