import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/CreateUserDto";
import { AuthService } from "./auth.service";
import { GetUserDto } from "./dto/getUserDto.dto";
import { LocalAuthenticationGuard } from "./guard/localAuthGuard.guard";
import RequestWithUser from "./interface/requestWithUser.interface";
import JwtAuthenticationGuard from "./guard/jwtAuthGuard.guard";
import { LoginDto } from "./dto/login.dto";

@ApiTags("Авторизация")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "Вход в аккаунт" })
  @ApiResponse({ status: 200, type: GetUserDto })
  @ApiBody({ type: LoginDto })
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post("/login")
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader("Set-Cookie", cookie);
    return response.send(user);
  }

  @ApiOperation({ summary: "Регистрация пользователя" })
  @ApiResponse({ status: 200, type: () => GetUserDto })
  @ApiBody({ type: () => CreateUserDto })
  @Post("/register")
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }

  @ApiOperation({ summary: "Выход из аккаунта" })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthenticationGuard)
  @Post("logout")
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader("Set-Cookie", this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @ApiOperation({ summary: "Авторизация пользователя" })
  @ApiResponse({ status: 200, type: () => GetUserDto })
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    return user;
  }
}
