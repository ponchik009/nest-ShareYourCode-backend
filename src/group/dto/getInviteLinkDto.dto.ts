import { ApiProperty } from "@nestjs/swagger";
import { GetUserDto } from "src/auth/dto/getUserDto.dto";
import { GetUsernameDto } from "src/auth/dto/getUsernameDto.dto";

export class GetInviteLinkDto {
  @ApiProperty({
    example: "uuuu-aaaa-bbbb-cccc",
    description: "Пригласительная ссылка",
  })
  readonly inviateLink: string;

  @ApiProperty({
    example: "Tue, 15 Mar 2022 06:25:11 GMT",
    description: "Дата окончания действия ссылки",
  })
  readonly inviteLinkEndDate: Date;
}
