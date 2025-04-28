import { PrimaryKeyEntity } from "entities";
import { Repository } from "typeorm";
import { IModelRepository } from "./infrastructure/imodel.repository";

export class EntityRepository<Entity extends PrimaryKeyEntity> implements IModelRepository<Entity> {
    
    constructor(private readonly repository: Repository<Entity>, 
    ) {}

    async createOrUpdate(entity: Entity): Promise<string> {
        const id = (await this.repository.save(entity)).id
        return id
    }
    async removeById(entityId: string): Promise<void> {
        if(this.repository.existsBy({ id: entityId } as any)) {
            await this.repository.delete(entityId)
        }
    }
    findById(entityId: string): Promise<Entity> {
        return this.repository.findOneBy({ id: entityId } as any)
    }
    getAll(): Promise<Entity[]> {
        return this.repository.find({ })
    }
}