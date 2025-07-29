import { BotReplies } from "bot/telegram.bot.keys"
import { BotContext } from "bot/telegram.bot.models"
import { IVerificationService } from "domains/infrastructure/iverification.service"

export class UserAccountController {
    constructor(private readonly verificationService: IVerificationService) {}

    public async sendVerificationCode(context: BotContext) {

        if(!context.messageText) {
            return Promise.resolve(false)
        }
        const result = await this.verificationService.sendVerificationCode(context.messageText)
        if(!result) {
            context.reply(BotReplies.notSendedVerificationCode)
            return
        }
        context.reply(BotReplies.sendedVerificationCode)
    }
}