import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupModule } from "src/group/group.module";
import { TredModule } from "src/tred/tred.module";
import { Language } from "./entities/language.entity";
import { Package } from "./entities/package.entity";
import { PackageController } from "./package.controller";
import { PackageService } from "./package.service";

@Module({
  controllers: [PackageController],
  providers: [PackageService],
  imports: [
    TypeOrmModule.forFeature([Package, Language]),
    TredModule,
    GroupModule,
  ],
})
export class PackageModule {}
