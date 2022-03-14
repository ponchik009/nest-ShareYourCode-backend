import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "user@mail.ru",
    description: "Адрес электронной почты",
  })
  @Column({ unique: true, nullable: false })
  email: string;

  @ApiProperty({ example: "qwerty", description: "Пароль" })
  @Column({ nullable: false })
  password: string;
}
