import { Markup, Telegraf } from "telegraf";
import { BotContext, BotSession } from "./telegram.bot.models";
import { ISessionProvider } from "bot/infrastructure/session-provider/isession.provider";
import { message } from 'telegraf/filters'
import { BotCommands, BotCommandsStates, BotReplies } from "./telegram.bot.keys";
import { IDispose } from "core/idispose";
import { UserAccountController } from "domains/user-account/user.account.controller";

export class FinanceTrackerBot implements IDispose {
    private readonly bot: Telegraf<BotContext>;
    
    constructor(
        botToken: string,
        private readonly sessionProvider: ISessionProvider<BotSession>,
        private readonly userAccountConntroller: UserAccountController
    ) {
        this.bot = new Telegraf<BotContext>(botToken)
    }

    public setupCommands() {
        this.bot.telegram.setMyCommands([
            { command: 'auth', description: '🔐 Авторизуватися' },
            { command: 'help', description: '🧾 Інструкція' }
        ])
        this.bot.start((ctx: BotContext) => {
            /*if(ctx.session) {
                return
            }
            console.log(ctx.session)*/
            this.sessionProvider.create(ctx.chatId.toString())
            ctx.reply(BotReplies.greetings, 
                Markup.keyboard(['🔐 Авторизуватись'])
                .resize()
                .oneTime()
            )
        })
        this.bot.command(BotCommands.authorization, async (ctx: BotContext) => {
            await this.sessionProvider.update(ctx.chatId.toString(), 'bot_state', BotCommandsStates.verifyEmail)
            console.log(ctx.session)
            ctx.reply(BotReplies.authorizationNeed)
        })
        this.bot.on(message('text'), async (ctx: BotContext) => {
            if(!ctx.session) {
                return
            }
            if(ctx.session.bot_state == BotCommandsStates.verifyEmail) {
                await this.userAccountConntroller.sendVerificationCode(ctx)
            }                
        })
    }





    public useMiddlewares() {
        // Maybe use adapter
        this.bot.use(async (ctx, next) => {
            if(!ctx.chat?.id) {
                throw new Error('ChatId not found')
            }
            ctx.chatId = ctx.chat.id
            ctx.messageText = ctx.text
            const session = await this.sessionProvider.getByChatId(ctx.chatId.toString())
            ctx.session = session
            return next()
        })

        this.bot.catch((err) => {
            console.log(err)
        })
    }

    public launch() {
        this.bot.launch(() => {
            console.log('Bot is starting')
        })
    }

    public dispose() {
        this.bot.stop()
    }
}