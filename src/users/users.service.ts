import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/CreateUserDto";
import { User } from "./users.entity";

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

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne(
      { email },
      { relations: ["groups"] }
    );

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne(id, {
      relations: ["groups"],
    });

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
