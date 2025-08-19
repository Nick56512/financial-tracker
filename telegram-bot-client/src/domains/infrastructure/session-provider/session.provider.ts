import { IStorageManager } from "core/storage-manager/istorage.manager";
import { ISessionProvider, UserSession } from "./isession.provider";
import { IKeyBuilder } from "./key-builder/key.builder";
import { injectable } from "inversify";


@injectable()
export class SessionProvider implements ISessionProvider<UserSession> {

    constructor(
        private readonly storage: IStorageManager,
        private readonly keyBuilder: IKeyBuilder,
        private readonly sessionTtl: number
    ) {}

    public async create(chatId: number, userSession: UserSession): Promise<UserSession> {
        const sessionKey = this.keyBuilder.build(chatId)
        const json = JSON.stringify(userSession)
        await this.storage.set(sessionKey, json, this.sessionTtl)
        return userSession
    }

    public async getByChatId(chatId: number): Promise<UserSession | null> {
        const sessionKey = this.keyBuilder.build(chatId)
        const sessionJson = await this.storage.get(sessionKey)
        if(!sessionJson) {
            return null
        }
        try{
            const session: UserSession = JSON.parse(sessionJson)
            return session
        }
        catch(ex) {
            console.log(ex)
            return null
        }
    }

    async update<K extends keyof UserSession>(chatId: number, propertyName: K, value: UserSession[K]): Promise<UserSession | null> {
        const userSession = await this.getByChatId(chatId)
        if(!userSession) {
            return userSession
        }
        userSession[propertyName] = value
        const sessionKey = this.keyBuilder.build(chatId)
        const result = await this.storage.set(sessionKey, JSON.stringify(userSession), this.sessionTtl)
        if(!result) {
            return null
        }
        return userSession
    }
    delete(chatId: number): Promise<boolean> {
        const sessionKey = this.keyBuilder.build(chatId)
        return this.storage.delete(sessionKey)
    }
}