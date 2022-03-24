import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { CreateGroupDto } from "./dto/createGrouDto.dto";
import { Group } from "./group.entity";
import { v4 as uuidv4 } from "uuid";
import { group } from "console";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    private userService: UsersService
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
      .select(["group.id", "group.name", "group.description"])
      .where("group.isOpen = true")
      .getMany();
  }

  async getGroup(id: number, user: User) {
    const group = await this.getById(id);

    if (!group.members.some((member) => member.id === user.id)) {
      throw new HttpException(
        "Пользователь не состоит в сообществе",
        HttpStatus.FORBIDDEN
      );
    }

    return group;
  }

  async getMy(user: User) {
    const groups = await this.groupRepository
      .createQueryBuilder("group")
      .select(["group.id", "group.name", "group.description"])
      .leftJoin("group.members", "user")
      .where("user.id = :id", { id: user.id })
      .getMany();

    return groups;
  }

  async getById(id: number) {
    const group = await this.groupRepository.findOne(id, {
      relations: ["admin", "members", "treds"],
    });

    if (!group) {
      throw new HttpException("Сообщество не найдено!", HttpStatus.NOT_FOUND);
    }

    return group;
  }

  async enterTheGroup(group: number | Group, user: User) {
    const groupFromDb =
      typeof group !== "object" ? await this.getById(group) : group;

    if (groupFromDb.members.some((member) => member.id === user.id)) {
      throw new HttpException(
        "Пользователь уже состоит в сообществе!",
        HttpStatus.BAD_REQUEST
      );
    }

    groupFromDb.members.push(user);
    await this.groupRepository.save(groupFromDb);
    return groupFromDb;
  }

  async enterThePublicGroup(groupId: number, user: User) {
    const group = await this.getById(groupId);

    if (!group.isOpen) {
      throw new HttpException(
        "Группа закрытая, в нее нельзя вступить!",
        HttpStatus.FORBIDDEN
      );
    }

    return await this.enterTheGroup(groupId, user);
  }

  async enterFromLink(link: string, user: User) {
    const group = await this.groupRepository.findOne(
      { inviteLink: link },
      { relations: ["members"] }
    );

    if (!group) {
      throw new HttpException("Сообщество не найдено!", HttpStatus.NOT_FOUND);
    }
    if (group.inviteLinkEndDate < new Date(Date.now())) {
      throw new HttpException("Ссылка просрочена!", HttpStatus.NOT_FOUND);
    }

    const newGroup = await this.enterTheGroup(group, user);
    return newGroup;
  }

  async generateLink(id: number, user: User) {
    const group = await this.getGroupWithRights(id, user);

    const inviteLink = uuidv4();
    const inviteLinkEndDate = new Date(Date.now() + 3600 * 24 * 3 * 1000); // ms

    await this.groupRepository.save({
      ...group,
      inviteLink,
      inviteLinkEndDate,
    });

    return {
      inviteLink,
      inviteLinkEndDate,
    };
  }

  async inviteToTheGroup(groupId: number, admin: User, user: User) {
    const group = await this.getGroupWithRights(groupId, admin);
    const userFromDB = await this.userService.getById(user.id);

    if (!userFromDB.isPublic) {
      throw new HttpException(
        "Пользователь имеет закрытый аккаунт, его нельзя приглашать в сообщества",
        HttpStatus.FORBIDDEN
      );
    }

    return await this.enterTheGroup(group, {
      id: userFromDB.id,
      name: userFromDB.name,
      isPublic: userFromDB.isPublic,
    } as User);
  }

  async leaveTheGroup(groupId: number, user: User) {
    const group = await this.getGroup(groupId, user);
    return await this.removeFromTheGroup(group, user.id);
  }

  async kickOutOfTheGroup(groupId: number, userId: number, admin: User) {
    const group = await this.getGroupWithRights(groupId, admin);

    return await this.removeFromTheGroup(group, userId);
  }

  async delegateAdmin(groupId: number, candidateId: number, admin: User) {
    const group = await this.getGroupWithRights(groupId, admin);

    const newAdmin = group.members.filter(
      (member) => member.id === candidateId
    )[0];
    if (!newAdmin) {
      throw new HttpException(
        "Пользователь не состоит в сообществе",
        HttpStatus.FORBIDDEN
      );
    }

    group.admin = newAdmin;
    await this.groupRepository.save(group);

    return group;
  }

  private async removeFromTheGroup(group: Group, userId: number) {
    group.members = group.members.filter((member) => member.id !== userId);

    if (!group.members.length) {
      const deletedGroup = await this.removeTheGroup(group);
      deletedGroup.admin = undefined;
      return deletedGroup;
    }

    if (group.admin.id === userId) {
      group.admin = group.members[0];
    }

    await this.groupRepository.save(group);
    return group;
  }

  private async removeTheGroup(group: Group) {
    await this.groupRepository.delete(group.id);
    return group;
  }

  public async getGroupWithRights(groupId: number, user: User) {
    const group = await this.getGroup(groupId, user);

    if (group.admin.id !== user.id) {
      throw new HttpException("Не хватает доступа!", HttpStatus.FORBIDDEN);
    }

    return group;
  }
}
