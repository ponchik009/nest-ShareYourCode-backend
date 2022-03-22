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
  async enterTheGroup(@Req() req: RequestWithUser, @Param("id") id: number) {
    const group = await this.groupService.enterThePublicGroup(id, req.user);
    return group;
  }

  @ApiOperation({
    summary: "Вступление в сообщество по пригласительной ссылке",
  })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthenticationGuard)
  @Patch("/fromLink/:uuid")
  async enterFromLink(
    @Req() req: RequestWithUser,
    @Param("uuid") uuid: string
  ) {
    return await this.groupService.enterFromLink(uuid, req.user);
  }

  @ApiOperation({
    summary: "Генерация пригласительной ссылки",
  })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthenticationGuard)
  @Patch("/generate/:id")
  async generateLink(@Req() req: RequestWithUser, @Param("id") id: number) {
    return await this.groupService.generateLink(id, req.user);
  }

  @ApiOperation({ summary: "Приглашение в сообщество" })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthenticationGuard)
  @Patch("/invite/:id")
  async inviteToTheGroup(
    @Req() req: RequestWithUser,
    @Param("id") id: number,
    @Body() user: User
  ) {
    const group = await this.groupService.inviteToTheGroup(id, req.user, user);
    return group;
  }

  @ApiOperation({ summary: "Выход из сообщества" })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthenticationGuard)
  @Patch("/leave/:id")
  async leaveTheGroup(@Req() req: RequestWithUser, @Param("id") id: number) {
    const group = await this.groupService.leaveTheGroup(id, req.user);
    return group;
  }

  @ApiOperation({ summary: "Кик из сообщества" })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthenticationGuard)
  @Patch("/kick/:id")
  async kickOutOfTheGroup(
    @Req() req: RequestWithUser,
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
    @Req() req: RequestWithUser,
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
  getGroup(@Param("id") id: number, @Req() req: RequestWithUser) {
    return this.groupService.getGroup(id, req.user);
  }
}
