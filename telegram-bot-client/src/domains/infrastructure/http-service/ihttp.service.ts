export interface IHttpService<Model> {
    get(): Promise<Model[]>
    getById(id: string): Promise<Model | null>
    create(model: Model): Promise<Model>
    update(model: Model): Promise<Model>
}