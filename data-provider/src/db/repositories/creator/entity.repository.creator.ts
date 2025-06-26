import { PrimaryKeyEntity } from "entities";
import { EntityTarget } from "typeorm";
import { DbContext } from "../../context";
import { EntityRepository } from "../entity.repository";
import { IRepositoryCreator } from "./irepository.creator";

export class EntityRepositoryCreator implements IRepositoryCreator {
    constructor(private readonly dbContext: DbContext) {}
    createRepository<Entity extends PrimaryKeyEntity>(entityTarget: EntityTarget<Entity>) {
        const ormRepository = this.dbContext.getConnection().getRepository(entityTarget)
        return new EntityRepository(ormRepository)
    }
}