import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import JwtAuthenticationGuard from "src/auth/guard/jwtAuthGuard.guard";
import RequestWithUser from "src/auth/interface/requestWithUser.interface";
import { CreateGroupDto } from "./dto/createGrouDto.dto";
import { Group } from "./group.entity";
import { GroupService } from "./group.service";

@ApiTags("Сообщества")
@Controller("group")
export class GroupController {
  constructor(private groupService: GroupService) {}

  @ApiOperation({ summary: "Создание сообщества" })
  @ApiResponse({ status: 201 })
  @UseGuards(JwtAuthenticationGuard)
  @Post()
  async create(@Body() dto: CreateGroupDto, @Req() req: RequestWithUser) {
    const user = req.user;
    user.password = undefined;
    user.groups = undefined;
    user.email = undefined;
    const group = await this.groupService.create(dto, user);
    return group;
  }

  @ApiOperation({ summary: "Получение публичных сообществ" })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async getPublic() {
    const groups = await this.groupService.getPublic();
    return groups;
  }
}
