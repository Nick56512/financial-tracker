import { PrimaryKeyEntity } from "entities";

export interface IModelRepository<Model extends PrimaryKeyEntity> {
    create(entity: Model): Promise<string>;
    removeById(entityId: string): Promise<void>;
    findById(entityId: string): Promise<Model | null>
    getAll(): Promise<Model[]>
}