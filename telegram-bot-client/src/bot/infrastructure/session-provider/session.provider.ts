import { IStorageManager } from "core/storage-manager/istorage.manager";
import { ISessionProvider } from "./isession.provider";
import { IKeyBuilder } from "./key-builder/key.builder";
import { injectable } from "inversify";
import { UserSession } from "@bot/telegram.bot.models";

@injectable()
export class SessionProvider implements ISessionProvider<UserSession> {

    constructor(
        private readonly storage: IStorageManager,
        private readonly keyBuilder: IKeyBuilder,
        private readonly sessionTtl: number
    ) {}

    public async create(chatId: string): Promise<UserSession> {
        const newUserSession: UserSession = {
            access_token: '',
            email: '',
        }
        const sessionKey = this.keyBuilder.build(chatId)
        const json = JSON.stringify(newUserSession)
        await this.storage.set(sessionKey, json, this.sessionTtl)
        return newUserSession
    }

    public async getByChatId(chatId: string): Promise<UserSession | null> {
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

    async update<K extends keyof UserSession>(chatId: string, propertyName: K, value: UserSession[K]): Promise<UserSession | null> {
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
    delete(chatId: string): Promise<boolean> {
        const sessionKey = this.keyBuilder.build(chatId)
        return this.storage.delete(sessionKey)
    }
}