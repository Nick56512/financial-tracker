import { PrimaryKeyEntity } from "entities";
import { Repository } from "typeorm";
export class EntityRepository<Entity extends PrimaryKeyEntity> {
    constructor(private readonly repository: Repository<Entity> ){}

    async create(entity: Entity): Promise<Entity> {
        return this.repository.save(entity);
    }

    async getById(id: string): Promise<Entity> {
        return this.repository.findOneBy({  });
    }
}