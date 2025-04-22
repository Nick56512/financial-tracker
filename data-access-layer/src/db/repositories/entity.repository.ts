import { PrimaryKeyEntity } from "entities";
import { IModelRepository } from "./imodel.repository";
import { DbContext } from "../context";
import { EntityTarget } from "typeorm";

export class ModelRepository<Entity extends PrimaryKeyEntity> implements IModelRepository<Entity>
{
    constructor(
        private readonly dbContext: DbContext,
        private readonly entityTarget: EntityTarget<Entity>)
        {}

    private get repository() {
        return this.dbContext.getRepository<Entity>(this.entityTarget)
    }
    async create(entity: Entity): Promise<string> {
        const id = (await this.repository.save(entity)).id
        return id
    }
    async removeById(entityId: string): Promise<void> {
        await this.repository.delete(entityId)
    }
    findById(entityId: string): Promise<Entity> {
        return this.repository.findOneBy({ id: entityId } as any)
    }
    getAll(): Promise<Entity[]> {
        return this.repository.find({ })
    }

}