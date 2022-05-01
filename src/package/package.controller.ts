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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import JwtAuthenticationGuard from "src/auth/guard/jwtAuthGuard.guard";
import RequestWithUser from "src/auth/interface/requestWithUser.interface";
import { AddReviewDto } from "./dto/addReviewDto.dto";
import { CreatePackageDto } from "./dto/createPackageDto.dto";
import { GetPackageDto } from "./dto/getPackageDto.dto";
import { ProgramDto } from "../files/dto/programDto.dto";
import { PackageService } from "./package.service";
import { GetProgramResultDto } from "src/files/dto/getProgramResultDto.dto";
import { Language } from "./entities/language.entity";

@ApiTags("Посылки")
@Controller("package")
export class PackageController {
  constructor(private packageService: PackageService) {}

  @ApiOperation({ summary: "Создание посылки" })
  @ApiResponse({ status: 201, type: GetPackageDto })
  @ApiBody({ type: CreatePackageDto })
  @UseGuards(JwtAuthenticationGuard)
  @Post()
  async create(@Body() dto: CreatePackageDto, @Req() req: RequestWithUser) {
    return await this.packageService.create(dto, req.user);
  }

  @ApiOperation({ summary: "Добавление ревью кода" })
  @ApiResponse({ status: 200, type: GetPackageDto })
  @ApiBody({ type: AddReviewDto })
  @UseGuards(JwtAuthenticationGuard)
  @Patch("/review")
  async addReview(@Body() dto: AddReviewDto, @Req() req: RequestWithUser) {
    return await this.packageService.addReview(dto, req.user);
  }

  @ApiOperation({ summary: "Получение посылки" })
  @ApiResponse({ status: 200, type: GetPackageDto })
  @UseGuards(JwtAuthenticationGuard)
  @Get("/:id")
  async get(@Param("id") id: number, @Req() req: RequestWithUser) {
    return await this.packageService.getPackage(id, req.user);
  }

  @ApiOperation({ summary: "Компиляция скрипта" })
  @ApiResponse({ status: 200, type: GetProgramResultDto })
  @ApiBody({ type: ProgramDto })
  @UseGuards(JwtAuthenticationGuard)
  @Post("/execute")
  async execute(@Body() program: ProgramDto) {
    return await this.packageService.execute(program);
  }

  @ApiOperation({ summary: "Получение списка языков" })
  @ApiResponse({ status: 200, type: Language })
  @UseGuards(JwtAuthenticationGuard)
  @Post("/language")
  async getLanguages() {
    return await this.packageService.getLanguages();
  }
}
