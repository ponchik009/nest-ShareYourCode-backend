import { ApiProperty } from "@nestjs/swagger";
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
import { Package } from "./package.entity";

@Entity()
export class Language {
  @ApiProperty({ example: 1, description: "Уникальный идентификатор" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: `python 3`,
    description: "Название языка",
  })
  @Column({ nullable: false })
  name: string;

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
    description: "Поылки на этом языке",
    type: () => [Package],
  })
  @OneToMany(() => Package, (pack: Package) => pack.language)
  packages: Package[];
}
