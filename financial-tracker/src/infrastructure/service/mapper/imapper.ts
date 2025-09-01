export interface IMapper<Entity, Dto> {
  mapToDto(entity: Entity): Dto;
  mapToEntity(dto: Dto): Entity;
}
