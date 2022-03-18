import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TredService } from "src/tred/tred.service";
import { User } from "src/users/users.entity";
import { Repository } from "typeorm";
import { CreatePackageDto } from "./dto/createPackageDto.dto";
import { Package } from "./entities/package.entity";

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package) private packageRepository: Repository<Package>,
    private tredService: TredService
  ) {}

  async create(dto: CreatePackageDto, user: User) {
    const tred = await this.tredService.getTred(dto.tredId, user);
    if (!tred.isOpen) {
      throw new HttpException("Тред уже закрыт!", HttpStatus.BAD_REQUEST);
    }

    const pack = this.packageRepository.create({
      ...dto,
      tred,
      user,
      date: new Date(Date.now()),
    });
    await this.packageRepository.save(pack);

    return pack;
  }

  async getPackage(id: number, user: User) {
    const pack = await this.getById(id);

    if (!pack.tred.isPublic && user.id !== pack.user.id) {
      throw new HttpException("Не хватает доступа!", HttpStatus.FORBIDDEN);
    }

    return pack;
  }

  async getById(id: number) {
    const pack = this.packageRepository.findOne(id, {
      relations: ["user", "tred", "language"],
    });

    if (!pack) {
      throw new HttpException("Посылка не найдена!", HttpStatus.NOT_FOUND);
    }

    return pack;
  }
}
