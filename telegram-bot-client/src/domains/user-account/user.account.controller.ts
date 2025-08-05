import { BotContext } from "@bot/infrastructure/bot.context"
import { BotReplies } from "@bot/telegram.bot.keys"
import { IoCInjectionKeys } from "@core/config/keys/injection.keys"
import { ScenesKeys } from "@core/scenes.keys"
import { IVerificationService } from "domains/infrastructure/iverification.service"
import { inject, injectable } from "inversify"
import { Scenes } from 'telegraf'

@injectable()
export class UserAccountController {
    constructor(
       @inject(IoCInjectionKeys.VerificationService) private readonly verificationService: IVerificationService) {}

    public authorization(): Scenes.WizardScene<BotContext> {

        return new Scenes.WizardScene<BotContext>(ScenesKeys.Authorization, 
            async (ctx) => {
               ctx.reply(BotReplies.enterEmail)
               return ctx.wizard.next()
            },
            async (ctx) => {
                if(!ctx.text) {
                    ctx.reply(BotReplies.notSendedVerificationCode)
                    return
                }
                const email = ctx.text
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if(!regex.test(email.toLowerCase())) {
                    ctx.reply(BotReplies.notSendedVerificationCode)
                    return
                }
                const result = await this.verificationService.sendVerificationCode(email)
                if(!result) {
                    ctx.reply(BotReplies.notSendedVerificationCode)
                    return
                }
                ctx.reply(BotReplies.sendedVerificationCode)
                ctx.session.data.email = email
                return ctx.wizard.next()
            },
            async (ctx) => {
                if(!ctx.text) {
                    ctx.reply(BotReplies.notValidateCode)
                    return
                }
                const text = ctx.text.trim()
                const number = parseInt(text || '')
                if(isNaN(number)) {
                    ctx.reply(BotReplies.notValidateCode)
                    return
                }
                const email = ctx.session.data.email
                const result = await this.verificationService.verifyCode(email, number)               
                /*if(result) {

                }
                return*/
            }
        )
        /*if(!request.messageText) {
            return Promise.resolve(false)
        }
        const result = await this.verificationService.sendVerificationCode(context.messageText)
        if(!result) {
            request.reply(BotReplies.notSendedVerificationCode)
            return
        }
        context.reply(BotReplies.sendedVerificationCode)*/
    }
}