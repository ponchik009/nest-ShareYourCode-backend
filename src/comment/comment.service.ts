import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PackageService } from "src/package/package.service";
import { User } from "src/users/users.entity";
import { Repository } from "typeorm";
import { Comment } from "./comment.entity";
import { CreateCommentDto } from "./dto/createCommentDto.dto";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private packageService: PackageService
  ) {}

  async create(dto: CreateCommentDto, user: User) {
    const pack = await this.packageService.getPackageWithRights(
      dto.packageId,
      user
    );

    const comment = this.commentRepository.create({
      text: dto.text,
      user,
      pack,
    });
    await this.commentRepository.save(comment);

    return {
      ...comment,
      pack: {
        id: comment.pack.id,
      },
      user: {
        id: comment.user.id,
        name: comment.user.name,
      },
    };
  }
}
