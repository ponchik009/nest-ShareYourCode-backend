import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { GetGroupDto } from "src/group/dto/getGroupDto.dto";
import { Package } from "src/package/entities/package.entity";

export class CreateCommentDto {
  @ApiProperty({
    example: "Найс код, эвесам табулияция",
    description: "Текст комментария",
  })
  readonly text: string;

  @ApiProperty({
    example: 3,
    description: "ID посылки",
  })
  @IsNotEmpty()
  packageId: number;
}
