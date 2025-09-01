export interface IStorageManager {
   get(key: string): Promise<string | null>;
   set(key: string, value: string, ttlSeconds?: number): Promise<boolean>;
   delete(key: string): Promise<boolean>;
}
