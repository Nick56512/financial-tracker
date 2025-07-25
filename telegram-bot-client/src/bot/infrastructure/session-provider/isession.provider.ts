export interface ISessionProvider<T> {
    create(chatId: string): Promise<T> 
    getByChatId(chatId: string): Promise<T | null>
    update<K extends keyof T>(chatId: string, propertyName: K, value: T[K]): Promise<T | null>
    delete(chatId: string): Promise<boolean>
}