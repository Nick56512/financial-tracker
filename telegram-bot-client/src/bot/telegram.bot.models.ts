import { Context } from "telegraf";

export interface BotContext extends Context {
    chatId: number,
    messageText?: string
    session: BotSession | null
}

export type BotSession = {
    email: string,
    access_token: string,
    current_command: string,
    bot_state: string
}
