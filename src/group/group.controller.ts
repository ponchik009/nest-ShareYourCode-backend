import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetUserDto } from "src/auth/dto/getUserDto.dto";
import JwtAuthenticationGuard from "src/auth/guard/jwtAuthGuard.guard";
import RequestWithUser from "src/auth/interface/requestWithUser.interface";
import { User } from "src/users/users.entity";
import { CreateGroupDto } from "./dto/createGrouDto.dto";
import { GetGroupDto } from "./dto/getGroupDto.dto";
import { GetPublicGroupDto } from "./dto/getPublicGroupsDto.dto";
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

  @ApiOperation({ summary: "Вступление в сообщество" })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthenticationGuard)
  @Patch("/enter/:id")
  async enterTheGroup(@Req() req, @Param("id") id: number) {
    const group = await this.groupService.enterTheGroup(id, {
      id: req.user.id,
      name: req.user.name,
    } as User);
    return group;
  }

  @ApiOperation({ summary: "Выход из сообщества" })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthenticationGuard)
  @Patch("/leave/:id")
  async leaveTheGroup(@Req() req, @Param("id") id: number) {
    const group = await this.groupService.leaveTheGroup(id, req.user);
    return group;
  }

  @ApiOperation({ summary: "Кик из сообщества" })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthenticationGuard)
  @Patch("/kick/:id")
  async kickOutOfTheGroup(
    @Req() req,
    @Param("id") groupId: number,
    @Body() user: GetUserDto
  ) {
    const group = await this.groupService.kickOutOfTheGroup(
      groupId,
      user.id,
      req.user
    );
    return group;
  }

  @ApiOperation({ summary: "Делегирование обязанностей администратора" })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthenticationGuard)
  @Patch("/delegate/:id")
  async delegateAdministrator(
    @Req() req,
    @Param("id") groupId: number,
    @Body() user: GetUserDto
  ) {
    const group = await this.groupService.delegateAdmin(
      groupId,
      user.id,
      req.user
    );
    return group;
  }

  @ApiOperation({ summary: "Получение информации о сообществе" })
  @ApiResponse({ status: 200 })
  @Get("/:id")
  @UseGuards(JwtAuthenticationGuard)
  getGroup(@Param("id") id: number, @Req() req) {
    return this.groupService.getGroup(id, req.user);
  }
}
