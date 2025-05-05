import { IModelRepository, PrimaryKeyEntity } from 'data-provider'
import { IService } from './idto.service';
import { Mapper } from 'src/utils/mapper';
export class AbstractService<Entity extends PrimaryKeyEntity, Dto> implements IService<Dto> {

    constructor(private readonly modelRepo: IModelRepository<Entity>,  
                private readonly mapper: Mapper<Entity, Dto>   
    ) {}
    createOrUpdate(item: Dto): Promise<string> {
        const entity = this.mapper.mapToEntity(item)
        return this.modelRepo.createOrUpdate(entity)
    }
    removeById(entityId: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    findById(entityId: string): Promise<Dto | null> {
        throw new Error('Method not implemented.');
    }
    getAll(): Promise<Dto[]> {
        throw new Error('Method not implemented.');
    }
}