import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Language } from "./entities/language.entity";
import { Package } from "./entities/package.entity";
import { PackageController } from "./package.controller";
import { PackageService } from "./package.service";

@Module({
  controllers: [PackageController],
  providers: [PackageService],
  imports: [TypeOrmModule.forFeature([Package, Language])],
})
export class PackageModule {}
