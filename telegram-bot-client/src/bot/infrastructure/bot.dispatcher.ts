import { BotContext, BotSession } from "@bot/telegram.bot.models"
import { BotCommands, BotReplies } from "bot/telegram.bot.keys"
import { ISessionProvider } from "./session-provider/isession.provider";

export interface IBotDispatcher {
    dispatch(bot: BotContext): void
}

export type BotAction = (context: BotContext) => void;

export type Route = {
    name: string,
    action: (context: BotContext) => void
}

export class BotDispacher implements IBotDispatcher {

    private router: Map<string, BotAction>

    constructor(
        private readonly sessionProvider: ISessionProvider<BotSession>
    ) {
        this.router = new Map<string, BotAction>()
        this.initRoutes()
    }

    private initRoutes() {
        this.router.set(BotCommands.start, (context) => { context.reply(BotReplies.greetings) })
    }

    dispatch(context: BotContext): void {
        if(!context?.messageText) {
            return
        }
        const action = this.router.get(context.messageText)
        if(!action) {
            return
        }
        action(context)
    }
}