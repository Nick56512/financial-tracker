import { Telegraf, Scenes, Context } from "telegraf";
import { IDispose } from "core/idispose";
import { BotCommands, BotReplies } from "./telegram.bot.keys";
import { session } from "telegraf/session";
import { BotContext } from "./infrastructure/bot.context";
import { IBuilder } from "./infrastructure/stage-builder/ibuilder";
import { ScenesKeys } from "@core/scenes.keys";

export class FinanceTrackerBot implements IDispose {
    private readonly bot: Telegraf<BotContext>;
    
    constructor(
        private readonly stageBuilder: IBuilder<Scenes.Stage<BotContext>>,
        botToken: string,
    ) {
        this.bot = new Telegraf<BotContext>(botToken)
    }

    public useMiddlewares() {
        this.bot.use(session())
        this.bot.use(this.stageBuilder.build().middleware())
        this.bot.catch((err) => {
            console.log(err)
        })
    }
    

    public registerCommands() {

        this.bot.start((ctx: BotContext) => ctx.reply(BotReplies.greetings))
        this.bot.command(BotCommands.authorization, (ctx) => ctx.scene.enter(ScenesKeys.Authorization))
        /*const commands = Object.keys(BotCommands)
        
        commands.forEach((command) => {
            this.bot.command(command, (ctx: BotContext) => { ctx.scene.enter(ScenesKeys.Authorization) })
        })*/
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