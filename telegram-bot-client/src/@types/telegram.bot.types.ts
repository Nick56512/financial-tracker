import { Context, NarrowedContext } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { Message } from "telegraf/typings/core/types/typegram";

export const enum FinanceBotReplies {
    greetings = 'Вітаю! Я – бот-трекер, який допоможе тобі приручити твої фінанси. Гроші – це не проблема, якщо їх правильно рахувати 😉',
    commandNotFound = 'Такої команди не знайдено',
    authorizationNeed = 'Давай знайомитись ближче! Вкажи свій email, щоб я знав, кому рахувати грошики 😉',
    sendedEmail = 'Я щойно надіслав код на пошту. Впиши його сюди, як отримаєш.'
}



export type TextMessageContext = NarrowedContext<Context, Update.MessageUpdate<Message.TextMessage>>