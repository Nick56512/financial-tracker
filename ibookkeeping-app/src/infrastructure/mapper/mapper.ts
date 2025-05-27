import { ClassConstructor, plainToInstance } from "class-transformer";
import { IMapper } from './imapper';
import { PrimaryKeyEntity } from 'data-provider';

export class Mapper<Entity extends PrimaryKeyEntity, Dto> implements IMapper<Entity, Dto>{

    constructor(    
        private readonly entity: ClassConstructor<Entity>,
        private readonly dto: ClassConstructor<Dto>) {}

    public mapToDto(item: Entity): Dto {
        return plainToInstance(this.dto, item)
    }

    public mapToEntity(dto: Dto): Entity {
        return plainToInstance(this.entity, dto)
    }
}