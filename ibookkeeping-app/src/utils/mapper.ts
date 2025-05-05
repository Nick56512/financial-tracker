import 'reflect-metadata'
import { ClassConstructor, plainToInstance } from "class-transformer";

export class Mapper<Entity, Dto> {
    private readonly entity: ClassConstructor<Entity>
    private readonly dto: ClassConstructor<Dto>

    public mapToDto(item: Entity): Dto {
        return plainToInstance(this.dto, item)
    }

    public mapToEntity(dto: Dto): Entity {
        return plainToInstance(this.entity, dto)
    }
}