import { FindOptionsWhere, Repository } from "typeorm";
import { IModelRepository } from "./imodel.repository.js";
import { PrimaryKeyEntity } from "db/entities/primary.key.entity.js";

export class EntityRepository<Entity extends PrimaryKeyEntity> implements IModelRepository<Entity> {
    
    constructor(protected readonly repository: Repository<Entity>, 
    ) {}

    async createOrUpdate(entity: Entity): Promise<Entity> {
       return this.repository.save(entity)
    }
    async removeById(entityId: string): Promise<boolean> {
        const entity = await this.findById(entityId)
        if(!entity) {
            return false
        }
        await this.repository.remove(entity)
        return true
    }
    findById(entityId: string): Promise<Entity> {
        return this.repository.findOne({
            where: {
                id: entityId
            } as FindOptionsWhere<Entity>
        })
    }
    getAll(): Promise<Entity[]> {
        return this.repository.find({ })
    }
}