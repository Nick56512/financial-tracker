import { IModelRepository, PrimaryKeyEntity } from 'data-provider'
import { IService } from './idto.service';
import { plainToClass, plainToClassFromExist, plainToInstance } from 'class-transformer';
export class AbstractService<Entity extends PrimaryKeyEntity, Dto> implements IService<Dto> {
    constructor(private readonly imodelRepo: IModelRepository<Entity>) {}
    createOrUpdate(item: Dto): Promise<string> {
        const entity = plainToInstance<>()
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