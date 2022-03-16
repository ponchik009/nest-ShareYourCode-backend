import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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

  async getGroup(id: number, user: User) {
    const group = await this.groupRepository.findOne(id, {
      relations: ["admin", "members"],
    });

    console.log(group);

    if (!group) {
      throw new HttpException("Группа не найдена!", HttpStatus.NOT_FOUND);
    }

    if (!group.members.some((member) => member.id === user.id)) {
      throw new HttpException(
        "Пользователь не состоит в группе",
        HttpStatus.FORBIDDEN
      );
    }

    return group;
  }
}
