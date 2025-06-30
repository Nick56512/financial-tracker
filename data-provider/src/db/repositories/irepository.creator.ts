import { PrimaryKeyEntity } from "entities";
import { EntityTarget } from "typeorm";
import { IModelRepository } from "./entity/imodel.repository";

export interface IRepositoryCreator<Entity extends PrimaryKeyEntity> {
    createRepository(entityTarget: EntityTarget<Entity>): IModelRepository<Entity>;
}