import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Language } from "../entities/language.entity";

export class AddReviewDto {
  @ApiProperty({
    example: 1,
    description: "ID посылки",
  })
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: "Супер!! ! !",
    description: "Ревью",
  })
  @IsNotEmpty()
  review: string;
}
