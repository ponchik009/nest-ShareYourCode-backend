import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/CreateUserDto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }
}
