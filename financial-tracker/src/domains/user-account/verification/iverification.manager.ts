export interface IVerificationManager {
    verificate(cacheStoreKey: string, inputCode: number): Promise<boolean>
    createCode(cacheStoreKey: string): Promise<number>
    isExistsCode(cacheStoreKey: string): Promise<boolean>
}
