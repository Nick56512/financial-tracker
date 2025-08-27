import { PrimaryKeyEntity } from "db/entities/primary.key.entity.js";

export interface IModelRepository<Model extends PrimaryKeyEntity> {
    createOrUpdate(entity: Model): Promise<Model>;
    removeById(entityId: string): Promise<boolean>;
    findById(entityId: string): Promise<Model | null>
    getAll(): Promise<Model[]>
    findOneBy<K extends keyof Model>(field: K, value: Model[K]): Promise<Model | null>;
    findManyBy<K extends keyof Model>(field: K, value: Model[K]): Promise<Model[]>
    filterByMany(filterParams: Partial<Model>): Promise<Model[]>
}