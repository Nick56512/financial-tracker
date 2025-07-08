export interface IVerificationManager {
    verificate(cacheStoreKey: string, inputCode: number): Promise<boolean>
    createCode(cacheStoreKey: string): Promise<void>
    isExistsCode(cacheStoreKey: string): Promise<boolean>
}
