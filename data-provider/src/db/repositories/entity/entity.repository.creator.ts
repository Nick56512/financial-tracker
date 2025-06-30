import { PrimaryKeyEntity } from "entities";
import { EntityTarget } from "typeorm";
import { DbContext } from "../../context";
import { EntityRepository } from "./entity.repository";
import { IRepositoryCreator } from "../irepository.creator";
import { IModelRepository } from "./imodel.repository";

export class EntityRepositoryCreator<Entity extends PrimaryKeyEntity> implements IRepositoryCreator<Entity> {
    constructor(private readonly dbContext: DbContext) {}
    createRepository<Entity extends PrimaryKeyEntity>(entityTarget: EntityTarget<Entity>): IModelRepository<Entity>  {
        const ormRepository = this.dbContext.getConnection().getRepository(entityTarget)
        return new EntityRepository(ormRepository)
    }
}