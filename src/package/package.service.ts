import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilesService } from "src/files/files.service";
import { GroupService } from "src/group/group.service";
import { TredService } from "src/tred/tred.service";
import { User } from "src/users/users.entity";
import { Repository } from "typeorm";
import { AddReviewDto } from "./dto/addReviewDto.dto";
import { CreatePackageDto } from "./dto/createPackageDto.dto";
import { ProgramDto } from "../files/dto/programDto.dto";
import { Package } from "./entities/package.entity";
import { Language } from "./entities/language.entity";

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package) private packageRepository: Repository<Package>,
    @InjectRepository(Language) private languageRepo: Repository<Language>,
    private tredService: TredService,
    private filesSservice: FilesService
  ) {}

  async create(dto: CreatePackageDto, user: User) {
    const tred = await this.tredService.getTred(dto.tredId, user);

    if (!tred.isOpen) {
      throw new HttpException("Тред уже закрыт!", HttpStatus.BAD_REQUEST);
    }

    if (
      tred.packages.filter((pack) => pack.user.id === user.id).length >=
      tred.maxPackages
    ) {
      throw new HttpException(
        "Превышено максимальное число посылок!",
        HttpStatus.BAD_REQUEST
      );
    }

    const pack = this.packageRepository.create({
      ...dto,
      tred: {
        id: tred.id,
        name: tred.name,
      },
      user,
      date: new Date(Date.now()),
    });
    await this.packageRepository.save(pack);

    pack.tred.packages = undefined;
    pack.tred.group = undefined;

    return pack;
  }

  async getPackage(id: number, user: User) {
    const pack = await this.getById(id);

    if (!pack.tred.isPublic && user.id !== pack.user.id) {
      // проверка на админа
      const tred = await this.tredService.getTredWithRights(pack.tred.id, user);
    }

    return {
      ...pack,
      tred: {
        id: pack.tred.id,
        name: pack.tred.name,
      },
    };
  }

  async getPackageWithRights(id: number, user: User) {
    const pack = await this.getById(id);

    const tred = await this.tredService.getTredWithRights(pack.tred.id, user);

    return pack;
  }

  async getById(id: number) {
    const pack = await this.packageRepository.findOne(id, {
      relations: ["user", "tred", "language", "comments"],
    });

    if (!pack) {
      throw new HttpException("Посылка не найдена!", HttpStatus.NOT_FOUND);
    }

    return pack;
  }

  async addReview(dto: AddReviewDto, user: User) {
    const pack = await this.getPackageWithRights(dto.id, user);
    pack.review = dto.review;

    await this.packageRepository.save(pack);

    return pack;
  }

  async execute(program: ProgramDto) {
    return await this.filesSservice.execute(
      program.code,
      program.input,
      program.cmd_input,
      program.language
    );
  }

  async getLanguages() {
    return await this.languageRepo.find();
  }
}
