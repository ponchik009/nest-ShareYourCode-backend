import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupController } from "./group.controller";
import { Group } from "./group.entity";
import { GroupService } from "./group.service";

@Module({
  controllers: [GroupController],
  providers: [GroupService],
  imports: [TypeOrmModule.forFeature([Group])],
  exports: [GroupService],
})
export class GroupModule {}
