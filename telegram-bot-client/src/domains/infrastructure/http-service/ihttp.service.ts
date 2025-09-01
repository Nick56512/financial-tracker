export interface IHttpService<Model> {
   getById(id: string): Promise<Model | null>;
   create(model: Model): Promise<Model>;
   removeById(id: string): Promise<boolean>;
}
