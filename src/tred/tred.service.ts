import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GroupService } from "src/group/group.service";
import { User } from "src/users/users.entity";
import { Repository } from "typeorm";
import { CreateTredDto } from "./dto/createTredDto.dto";
import { Tred } from "./tred.entity";

@Injectable()
export class TredService {
  constructor(
    @InjectRepository(Tred) private tredRepository: Repository<Tred>,
    private groupService: GroupService
  ) {}

  async create(dto: CreateTredDto, user: User) {
    // костыль?
    const group = await this.groupService.getGroupWithRights(dto.groupId, user);

    const tred = this.tredRepository.create({
      ...dto,
      group: {
        id: group.id,
        name: group.name,
      },
      packages: [],
    });
    await this.tredRepository.save(tred);

    return tred;
  }

  async getTred(tredId: number, user: User) {
    const tred = await this.getById(tredId);
    // костыль?
    const group = await this.groupService.getGroup(tred.group.id, user);

    return {
      ...tred,
      group: {
        ...tred.group,
        admin: group.admin,
      },
    };
  }

  async getById(tredId: number) {
    const tred = await this.tredRepository
      .createQueryBuilder("tred")
      .select([
        "tred",
        "group.id",
        "group.name",
        "package.date",
        "package.id",
        "user",
        "language",
      ])
      .leftJoin("tred.group", "group")
      .leftJoin("tred.packages", "package")
      .leftJoin("package.user", "user")
      .leftJoin("package.language", "language")
      .where({ id: tredId })
      .getOne();

    // console.log(tred);

    if (!tred) {
      throw new HttpException("Тред не найден!", HttpStatus.NOT_FOUND);
    }

    return tred;
  }

  async getTredWithRights(tredId: number, user: User) {
    const tred = await this.getById(tredId);
    // костыль?
    const group = await this.groupService.getGroupWithRights(
      tred.group.id,
      user
    );

    return tred;
  }
}
