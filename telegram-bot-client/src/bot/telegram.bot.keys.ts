export const enum BotCommands {
    authorization = 'auth',
}
export const enum BotCommandsStates {
    verifyEmail = 'verifyEmail',
    verifyCode = 'verifyCode'
}
export const enum BotReplies {
    greetings = 'Вітаю! Я – бот-трекер, який допоможе тобі приручити твої фінанси. Гроші – це не проблема, якщо їх правильно рахувати 😉',
    commandNotFound = 'Такої команди не знайдено',
    authorizationNeed = 'Вкажи свій email, щоб я знав, кому рахувати грошики 😉',
    sendedEmail = 'Я щойно надіслав код на пошту. Впиши його сюди, як отримаєш.'
}
