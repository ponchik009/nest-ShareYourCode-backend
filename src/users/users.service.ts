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
    const user = this.userRepository.create(dto);
    await this.userRepository.save(user);
    return user;
  }

  async getAll() {
    return await this.userRepository.find();
  }
}
