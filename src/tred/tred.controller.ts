import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import JwtAuthenticationGuard from "src/auth/guard/jwtAuthGuard.guard";
import RequestWithUser from "src/auth/interface/requestWithUser.interface";
import { CreateTredDto } from "./dto/createTredDto.dto";
import { TredService } from "./tred.service";

@Controller("tred")
export class TredController {
  constructor(private tredService: TredService) {}

  @ApiOperation({ summary: "Создание треда" })
  @ApiResponse({ status: 201 })
  @UseGuards(JwtAuthenticationGuard)
  @Post()
  async create(@Body() dto: CreateTredDto, @Req() req: RequestWithUser) {
    return await this.tredService.create(dto, req.user);
  }

  @ApiOperation({ summary: "Получение информации о треде" })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthenticationGuard)
  @Get("/:id")
  async get(@Param("id") id: number, @Req() req: RequestWithUser) {
    return await this.tredService.getTred(id, req.user);
  }
}
