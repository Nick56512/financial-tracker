import { IModelRepository, PrimaryKeyEntity } from 'data-provider'
import { IService } from './idto.service';
import { IMapper } from './mapper/imapper';
export class AbstractService<Entity extends PrimaryKeyEntity, Dto> implements IService<Dto> {

    constructor(private readonly modelRepository: IModelRepository<Entity>,  
                private readonly mapper: IMapper<Entity, Dto>   
    ) {}
    async createOrUpdate(item: Dto): Promise<string> {
        const entity = this.mapper.mapToEntity(item)
        const createdEnity = await this.modelRepository.createOrUpdate(entity)
        return createdEnity.id
    }
    removeById(entityId: string): Promise<void> {
        return this.modelRepository.removeById(entityId)
    }
    async findById(entityId: string): Promise<Dto | null> {
        const entity = await this.modelRepository.findById(entityId)
        if(!entity) {
            return null;
        }
        return this.mapper.mapToDto(entity);
    }
    async getAll(): Promise<Dto[]> {
        const entities = await this.modelRepository.getAll()
        return entities.map(x => this.mapper.mapToDto(x))
    }
}