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
    const group = await this.groupService.getGroup(dto.groupId, user);

    if (group.admin.id !== user.id) {
      throw new HttpException("Не хватает доступа", HttpStatus.FORBIDDEN);
    }

    const tred = this.tredRepository.create({
      ...dto,
    });
    await this.tredRepository.save(tred);
    return tred;
  }
}
