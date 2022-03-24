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
    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(
        "Пользователь с таким email уже зарегестрирован!",
        HttpStatus.BAD_REQUEST
      );
    }
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .select(["user.id", "user.name", "user.password", "user.isPublic"])
      .where("user.email = :email", { email })
      .getOne();

    if (!user) {
      throw new HttpException("Пользователь не найден!", HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getById(id: number) {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .select(["user.id", "user.name", "user.isPublic"])
      .where("user.id = :id", { id })
      .getOne();

    if (!user) {
      throw new HttpException("Пользователь не найден!", HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
