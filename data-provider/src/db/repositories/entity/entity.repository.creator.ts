import { EntityTarget } from "typeorm";
import { DbContext } from "../../context.js";
import { EntityRepository } from "./entity.repository.js";
import { IRepositoryCreator } from "../irepository.creator.js";
import { IModelRepository } from "./imodel.repository.js";
import { PrimaryKeyEntity } from "db/entities/primary.key.entity.js";

export class EntityRepositoryCreator<Entity extends PrimaryKeyEntity> implements IRepositoryCreator<Entity> {
    constructor(private readonly dbContext: DbContext) {}
    createRepository<Entity extends PrimaryKeyEntity>(entityTarget: EntityTarget<Entity>): IModelRepository<Entity>  {
        const ormRepository = this.dbContext.getConnection().getRepository(entityTarget)
        return new EntityRepository(ormRepository)
    }
}