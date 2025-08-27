import { PrimaryKeyEntity } from "entities";
import { IRepositoryCreator } from "./irepository.creator";
import { IModelRepository } from "../imodel.repository";
import { EntityTarget } from "typeorm";
import { DbContext } from "db/context";
import { Repository } from "typeorm";

export class BaseRepositoryCreator<
    Entity extends PrimaryKeyEntity,
    Repo extends IModelRepository<Entity>
> implements IRepositoryCreator<Entity> {
    
    constructor(
        private readonly dbContext: DbContext,
        private readonly RepositoryClass: new (repo: Repository<Entity>) => Repo
    ) {}

    createRepository(entityTarget: EntityTarget<Entity>): IModelRepository<Entity> {
        const ormRepository = this.dbContext.getConnection().getRepository(entityTarget)
        return new this.RepositoryClass(ormRepository)
    }
}