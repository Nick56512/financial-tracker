import { Telegraf } from "telegraf";
import { BotContext } from "./telegram.bot.models";
import { IDispose } from "core/idispose";
import { IBotDispatcher } from "./infrastructure/bot.dispatcher";
import { BotCommands } from "./telegram.bot.keys";

export class FinanceTrackerBot implements IDispose {
    private readonly bot: Telegraf<BotContext>;
    
    constructor(
        private readonly botDispather: IBotDispatcher,
        botToken: string,
    ) {
        this.bot = new Telegraf<BotContext>(botToken)
    }

    public useMiddlewares() {
        this.bot.use(async (ctx, next) => {
            if(!ctx.chat?.id) {
                throw new Error('ChatId not found')
            }
            ctx.chatId = ctx.chat.id
            ctx.messageText = ctx.text
            return next()
        })
 
        this.bot.catch((err) => {
            console.log(err)
        })
    }
    

    public registerCommands() {
        const commands = Object.keys(BotCommands)
        commands.forEach((command) => {
            this.bot.command(command, (ctx: BotContext) => this.botDispather.dispatch(ctx))
        })
    }

    public launch() {
        this.bot.launch(() => {
            console.log('Bot is starting')
        })
    }

    public dispose() {
        this.bot.stop('dispose')
    }
}