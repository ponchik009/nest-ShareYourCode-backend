import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PackageModule } from "src/package/package.module";
import { CommentController } from "./comment.controller";
import { Comment } from "./comment.entity";
import { CommentService } from "./comment.service";

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [TypeOrmModule.forFeature([Comment]), PackageModule],
})
export class CommentModule {}
