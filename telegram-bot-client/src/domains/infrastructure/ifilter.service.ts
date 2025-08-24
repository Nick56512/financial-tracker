export interface IFilterHttpService<T> {
    filter(params: Partial<T>): Promise<T[]>;
}