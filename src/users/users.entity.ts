import { ApiProperty } from "@nestjs/swagger";
import { Group } from "src/group/group.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @ApiProperty({ example: 1, description: "Уникальный идентификатор" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "user@mail.ru",
    description: "Адрес электронной почты",
  })
  @Column({ unique: true, nullable: false })
  email: string;

  @ApiProperty({
    example: "poncik009",
    description: "Имя (никнейм)",
  })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ example: "qwerty", description: "Пароль" })
  @Column({ nullable: false })
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
}
