export interface IService<DtoModel> {
    createOrUpdate(item: DtoModel): Promise<string>;
    removeById(itemId: string): Promise<void>;
    findById(itemId: string): Promise<DtoModel | null>
    getAll(): Promise<DtoModel[]>
}