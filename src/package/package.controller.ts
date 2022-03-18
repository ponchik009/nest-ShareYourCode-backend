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
import { CreatePackageDto } from "./dto/createPackageDto.dto";
import { PackageService } from "./package.service";

@Controller("package")
export class PackageController {
  constructor(private packageService: PackageService) {}

  @ApiOperation({ summary: "Создание посылки" })
  @ApiResponse({ status: 201 })
  @UseGuards(JwtAuthenticationGuard)
  @Post()
  async create(@Body() dto: CreatePackageDto, @Req() req: RequestWithUser) {
    return await this.packageService.create(dto, req.user);
  }

  @ApiOperation({ summary: "Получение посылки" })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthenticationGuard)
  @Get("/:id")
  async get(@Param("id") id: number, @Req() req: RequestWithUser) {
    return await this.packageService.getPackage(id, req.user);
  }
}
