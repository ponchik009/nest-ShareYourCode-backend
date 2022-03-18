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
      group,
    });
    await this.tredRepository.save(tred);
    return tred;
  }

  async getTred(tredId: number, user: User) {
    const tred = await this.getById(tredId);
    // костыль?
    const group = await this.groupService.getGroup(tred.group.id, user);

    return tred;
  }

  async getById(tredId: number) {
    const tred = await this.tredRepository.findOne(tredId, {
      relations: ["packages", "group"],
    });

    if (!tred) {
      throw new HttpException("Тред не найден!", HttpStatus.NOT_FOUND);
    }

    return tred;
  }
}
