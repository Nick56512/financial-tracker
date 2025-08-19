export enum BotCommands {
    authorization = 'auth',
    start = 'start',
    help = 'help'
}

export const enum BotReplies {
    greetings = 'Вітаю! Я – бот-трекер, який допоможе тобі приручити твої фінанси. Гроші – це не проблема, якщо їх правильно рахувати 😉',
    notHaveActiveSession = 'Немає активної сесії. Необхідно авторизуватися',
    commandNotFound = 'Такої команди не знайдено',
    enterEmail = 'Вкажи свій email, щоб я знав, кому рахувати грошики 😉',
    sendedVerificationCode = 'Я щойно надіслав код на пошту. Впиши його сюди, як отримаєш.',
    notSendedVerificationCode = 'Не вдалося надіслати код на пошту. Перевір, чи правильно ти вказав email.',
    codeIsAlredySended = 'Код вже надіслано на пошту. Він буде дійсний протягом 10 хвилин. Перевір свою пошту та введи код, який я тобі надіслав.',
    notValidateCode = 'Цей код неправильний, введи інший',
    verificationUnsuccess = 'Не вдалося авторизуватися. Перевір, чи правильно ти ввів код.',
    verificationCompleted = 'Верифікація пройшла успішно 😉 Якщо потрібна буде допомога, введи команду /help',
    sessionIsExists = 'Ти вже був авторизований 😉',
}

export const enum BotKeyboardButtons {
    watchReports = '🗂 Переглянути звіти',
    createReport = '📊 Створити звіт',
    help = '❓ Допомога',
    changeSelectedReport = '🔄 Змінити обраний звіт',
    reenterEmail = '✏️ Ввести email знову',
}

