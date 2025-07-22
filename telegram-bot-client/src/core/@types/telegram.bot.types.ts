import { Context, NarrowedContext } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { Message } from "telegraf/typings/core/types/typegram";


export type TextMessageContext = NarrowedContext<Context, Update.MessageUpdate<Message.TextMessage>>