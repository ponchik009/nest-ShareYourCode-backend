import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { Repository } from "typeorm";
import { CreateGroupDto } from "./dto/createGrouDto.dto";
import { Group } from "./group.entity";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>
  ) {}

  async create(dto: CreateGroupDto, admin: User) {
    const group = this.groupRepository.create({ ...dto, admin });
    group.members = [admin];

    await this.groupRepository.save(group);
    return group;
  }

  async getPublic() {
    return this.groupRepository
      .createQueryBuilder("group")
      .select(["group", "user.name", "user.id"])
      .leftJoin("group.members", "user")
      .where("group.isOpen = true")
      .getMany();
  }
}