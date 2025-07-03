import { PrimaryKeyEntity } from "../entities/abstract.entity.js";
import { EntityTarget } from "typeorm";
import { IModelRepository } from "./entity/imodel.repository.js";

export interface IRepositoryCreator<Entity extends PrimaryKeyEntity> {
    createRepository(entityTarget: EntityTarget<Entity>): IModelRepository<Entity>;
}