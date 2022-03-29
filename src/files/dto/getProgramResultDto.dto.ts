import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GetProgramResultDto {
  @ApiProperty({
    example: "Success",
    description: "Стандартный поток вывода",
  })
  @IsNotEmpty()
  out: string;

  @ApiProperty({
    example: "Exception!!!",
    description: "Поток ошибок",
  })
  @IsNotEmpty()
  out_err: string;

  @ApiProperty({
    example: {
      time: 1,
      memory: "25m",
    },
    description: "Данные о выполнении скрипта",
  })
  @IsNotEmpty()
  out_meta: string;
}
