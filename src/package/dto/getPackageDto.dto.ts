import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Comment } from "src/comment/comment.entity";
import { Tred } from "src/tred/tred.entity";
import { User } from "src/users/users.entity";
import { Language } from "../entities/language.entity";

export class GetPackageDto {
  @ApiProperty({
    example: "print('Hello world!')",
    description: "Исходный код",
  })
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: 3,
    description: "ID посылки",
  })
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: "Восхитительно",
    description: "Ревью",
  })
  @IsNotEmpty()
  review: string;

  @ApiProperty({
    example: {
      id: 1,
      name: "python",
    },
    description: "Язык программирования",
    type: () => Language,
  })
  @IsNotEmpty()
  language: Language;

  @ApiProperty({
    example: {
      id: 4,
      name: "ponchik009",
    },
    description: "Автор",
    type: () => User,
  })
  @IsNotEmpty()
  user: User;

  @ApiProperty({
    example: {
      id: 7,
      name: "Tred 6",
    },
    description: "Родительский тред",
    type: () => Tred,
  })
  @IsNotEmpty()
  tred: Tred;

  @ApiProperty({
    example: [
      {
        id: 1,
        text: "very nice code!!!",
      },
    ],
    description: "Комментарии",
    type: () => [Comment],
  })
  @IsNotEmpty()
  comments: Comment[];
}
