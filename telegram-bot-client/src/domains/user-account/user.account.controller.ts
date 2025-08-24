import { BotContext } from "@bot/infrastructure/bot.context"
import { BotCommands, BotKeyboardButtons, BotReplies } from "@bot/telegram.bot.keys"
import { IoCInjectionKeys } from "@core/config/keys/injection.keys"
import { ISessionProvider, UserSession } from "@domains/infrastructure/session-provider/isession.provider"
import { IVerificationService } from "domains/infrastructure/iverification.service"
import { inject, injectable } from "inversify"
import { Markup, Scenes } from 'telegraf'

@injectable()
export class UserAccountController {
    constructor(
       @inject(IoCInjectionKeys.VerificationService) private readonly verificationService: IVerificationService,
       @inject(IoCInjectionKeys.SessionProvider) private readonly sessionProvider: ISessionProvider<UserSession>
    ) {}

    public authorization(): Scenes.WizardScene<BotContext> {
        return new Scenes.WizardScene<BotContext>(BotCommands.login, 
            async (ctx) => {
               if(!ctx.chat?.id) {
                    return
               }
               const session = await this.sessionProvider.getByChatId(ctx.chat.id)
               if(!session) {
                    ctx.reply(BotReplies.enterEmail)
                    return ctx.wizard.next() 
                }
                ctx.reply(BotReplies.sessionIsExists, Markup.keyboard([
                    [BotKeyboardButtons.watchReports, BotKeyboardButtons.createReport],
                    [BotKeyboardButtons.help]
                ]).resize().oneTime())
                return ctx.scene.leave()
            },
            async (ctx) => {
                if(!ctx.text) {
                    ctx.reply(BotReplies.notSendedVerificationCode)
                    return
                }
                const email = ctx.text.toLowerCase()
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if(!regex.test(email)) {
                    ctx.reply(BotReplies.notSendedVerificationCode)
                    return
                }
                const result = await this.verificationService.sendVerificationCode(email)
                if(!result) {
                    ctx.reply(BotReplies.notSendedVerificationCode)
                    return
                }
                if(result.isCodeExists) {
                    ctx.reply(BotReplies.codeIsAlredySended, Markup.keyboard([
                        BotKeyboardButtons.reenterEmail
                    ]).resize().oneTime())
                    return ctx.wizard.next()
                }
                if(!result.success) {
                    ctx.reply(BotReplies.notSendedVerificationCode)
                    return
                }
                else {
                    ctx.reply(BotReplies.sendedVerificationCode, Markup.keyboard([
                        BotKeyboardButtons.reenterEmail
                    ]).resize().oneTime())
                }
                ctx.session.user = {
                   email
                }
                return ctx.wizard.next()
            },
            async (ctx) => {
                if(ctx.text === BotKeyboardButtons.reenterEmail) {
                    ctx.reply(BotReplies.enterEmail, Markup.removeKeyboard())
                    return ctx.wizard.selectStep(1)
                }
                if(!ctx.chat?.id) {
                    ctx.reply(BotReplies.verificationUnsuccess)
                    return
                }
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
                const email = ctx.session.user.email
                const result = await this.verificationService.verifyCode(email, number)               
                if(!result) {
                    ctx.reply(BotReplies.notValidateCode)
                    return
                }
                const session: UserSession = {
                    email: ctx.session.user.email,
                    access_token: result.access_token,
                    userId: result.userId
                }
                await this.sessionProvider.create(ctx.chat.id, session)
                ctx.reply(BotReplies.verificationCompleted, Markup.keyboard([
                    [BotKeyboardButtons.watchReports, BotKeyboardButtons.createReport],
                    [BotKeyboardButtons.help]
                ]).resize().oneTime())
                return ctx.scene.leave()
            }
        )
    }

    public logOut(): Scenes.BaseScene<BotContext> {
        const scene = new Scenes.BaseScene<BotContext>(BotCommands.logout)
        scene.enter(async (ctx) => {
            if(!ctx.chat?.id) {
                return 
            }
            const result = await this.sessionProvider.delete(ctx.chat.id)
            if(result) {
                ctx.reply(BotReplies.successLogout, Markup.removeKeyboard())
            }
            else {
                ctx.reply(BotReplies.unsuccessLogout,  Markup.removeKeyboard())
            }
            return ctx.scene.leave()
        })
        return scene
    }
}