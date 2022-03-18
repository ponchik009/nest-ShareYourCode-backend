import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/users.entity";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { GroupModule } from "./group/group.module";
import { Group } from "./group/group.entity";
import { TredModule } from "./tred/tred.module";
import { Tred } from "./tred/tred.entity";
import { PackageModule } from "./package/package.module";
import { Package } from "./package/entities/package.entity";
import { Language } from "./package/entities/language.entity";
import { CommentModule } from "./comment/comment.module";
import { Comment } from "./comment/comment.entity";

require("dotenv").config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Group, Tred, Package, Language, Comment],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    GroupModule,
    TredModule,
    PackageModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
