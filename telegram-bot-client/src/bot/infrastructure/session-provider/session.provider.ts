import { IStorageManager } from "core/storage-manager/istorage.manager";
import { UserSession } from "domains/user-account/user.account.models";
import { ISessionProvider } from "./isession.provider";
import { IKeyBuilder, SessionKeyBuilder } from "./key-builder/key.builder";

// Work with user session
export class SessionProvider implements ISessionProvider<UserSession> {

    private userSessionTtlSeconds = 604800
    constructor(private readonly storage: IStorageManager,
                private readonly keyBuilder: IKeyBuilder = new SessionKeyBuilder()
    ) {}

    public async create(chatId: string): Promise<UserSession> {
        const newUserSession: UserSession = {
            access_token: '',
            email: '',
            current_command: '',
            bot_state: ''
        }
        const sessionKey = this.keyBuilder.build(chatId)
        const json = JSON.stringify(newUserSession)
        await this.storage.set(sessionKey, json, this.userSessionTtlSeconds)
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
        const result = await this.storage.set(sessionKey, JSON.stringify(userSession), this.userSessionTtlSeconds)
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