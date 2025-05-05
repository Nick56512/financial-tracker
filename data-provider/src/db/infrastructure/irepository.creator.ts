import { PrimaryKeyEntity } from "entities";
import { EntityTarget } from "typeorm";
import { IModelRepository } from "./imodel.repository";

export interface IRepositoryCreator {
    createRepository<Entity extends PrimaryKeyEntity>(entityTarget: EntityTarget<Entity>): IModelRepository<Entity>;
}