import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupModule } from "src/group/group.module";
import { TredController } from "./tred.controller";
import { Tred } from "./tred.entity";
import { TredService } from "./tred.service";

@Module({
  controllers: [TredController],
  providers: [TredService],
  imports: [TypeOrmModule.forFeature([Tred]), GroupModule],
  exports: [TredService],
})
export class TredModule {}
