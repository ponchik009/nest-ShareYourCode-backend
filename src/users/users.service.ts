import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/CreateUserDto";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async createUser(dto: CreateUserDto) {
    return await this.userRepository.create(dto);
  }

  async getAll() {
    return await this.userRepository.find();
  }
}
