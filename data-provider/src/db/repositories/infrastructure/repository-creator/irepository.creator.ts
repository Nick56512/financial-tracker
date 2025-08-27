import { PrimaryKeyEntity } from "../../../entities/primary.key.entity.js";
import { EntityTarget } from "typeorm";
import { IModelRepository } from "../imodel.repository.js";

export interface IRepositoryCreator<Entity extends PrimaryKeyEntity> {
    createRepository(entityTarget: EntityTarget<Entity>): IModelRepository<Entity>;
}