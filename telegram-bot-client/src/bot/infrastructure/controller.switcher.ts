/*import { MessageContext } from "bot/telegram.bot.models";
import { StorageKeys } from "core/enum.keys";
import { IStorageManager } from "core/storage-manager/istorage.manager";
import { TextMessageContext } from "core/types";
import { UserSession } from "domains/user-account/user.account.models";

export class CommandStateManager {
    constructor(private readonly storageManager: IStorageManager ) {}

    public async redirectActionToController(context: MessageContext) {
        const userSessionKey = `${StorageKeys.chatIdLabel}${context.chatId}`
        const currentSession = await this.storageManager.get<UserSession>(userSessionKey)
        if(!currentSession) {
            throw new Error(`Session with chatId: ${context.chatId} doesn't exists`)
        }
        if(currentSession.s === 'auth') {

        }
    }
}*/