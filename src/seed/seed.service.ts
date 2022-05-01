import { Injectable } from "@nestjs/common";
import { Language } from "src/package/entities/language.entity";
import { EntityManager } from "typeorm";

@Injectable()
export class SeedService {
  constructor(private readonly entityManager: EntityManager) {}

  public async seedLanguages() {
    if (!(await this.entityManager.find(Language)).length) {
      await this.entityManager.save(Language, [
        { name: "python" },
        { name: "javascript" },
        { name: "c-compile" },
        { name: "c++-compile" },
      ]);
    }
  }
}
