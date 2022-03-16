import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import JwtAuthenticationGuard from "src/auth/guard/jwtAuthGuard.guard";
import RequestWithUser from "src/auth/interface/requestWithUser.interface";
import { CreateGroupDto } from "./dto/createGrouDto.dto";
import { GetGroupDto } from "./dto/getGroupDto.dto";
import { GetPublicGroupDto } from "./dto/getPublicGroupsDto.dto";
import { GroupService } from "./group.service";

@ApiTags("Сообщества")
@Controller("group")
export class GroupController {
  constructor(private groupService: GroupService) {}

  @ApiOperation({ summary: "Создание сообщества" })
  @ApiResponse({ status: 201, type: GetGroupDto })
  @UseGuards(JwtAuthenticationGuard)
  @Post()
  async create(@Body() dto: CreateGroupDto, @Req() req: RequestWithUser) {
    const user = req.user;
    const group = await this.groupService.create(dto, user);
    return group;
  }

  @ApiOperation({ summary: "Получение публичных сообществ" })
  @ApiResponse({ status: 200, type: [GetPublicGroupDto] })
  @Get("/public")
  async getPublic() {
    const groups = await this.groupService.getPublic();
    return groups;
  }

  @ApiOperation({ summary: "Получение информации о сообществе" })
  @ApiResponse({ status: 200, type: GetGroupDto })
  @Get("/:id")
  @UseGuards(JwtAuthenticationGuard)
  getGroup(@Param("id") id: number, @Req() req) {
    return this.groupService.getGroup(id, req.user);
  }
}
