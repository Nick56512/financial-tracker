import { Markup } from 'telegraf';
import { ReplyKeyboardMarkup } from 'telegraf/types';

export enum BotCommands {
   login = 'login',
   logout = 'logout',
   start = 'start',
   help = 'help',
}

export enum BotCommandsDescriptions {
   login = '🔑 Зайти в систему (і приручити свої фінанси)',
   logout = '🚪 Вийти (але гроші нікуди не втечуть)',
   start = '👋 Почати магію підрахунку грошей',
   help = '📖 Підказка (бо навіть Бетмен мав Альфреда)',
}

export const enum BotReplies {
   greetings = '👋 Йо! Я – твій фінансовий сенсей. Разом ми приручимо твої гривні, щоб вони не тікали від тебе 🤑',
   notHaveActiveSession = '😶 Ти ще не авторизувався. Спочатку покажи документи (жарт), а потім увійди 😉',
   commandNotFound = '🤔 Такої команди не існує. Може, ти хотів ввести "/help"?',
   enterEmail = '📧 Кидай свій email, щоб я знав, де шукати твої грошики.',
   sendedVerificationCode = '✅ Я вже закинув код на твою пошту. Перевір inbox (і спам теж, я знаю, що вони хитрі).',
   notSendedVerificationCode = '❌ Не вдалось надіслати код. А ти впевнений, що email правильний? 👀',
   codeIsAlredySended = '⏳ Код уже летить до тебе і діє 10 хвилин. Чекни пошту 📬',
   notValidateCode = '🚫 Ні, цей код не підходить. Спробуй ще раз.',
   verificationUnsuccess = '😓 Щось пішло не так. Перевір код і повтори спробу.',
   verificationCompleted = '🎉 Верифікація пройшла успішно! Тепер ми з тобою на одній хвилі. Хочеш допомоги? Пиши /help 😉',
   sessionIsExists = '😉 Ти вже залогінений, не прикидайся.',
   notHaveAnyReports = '📂 Звітів ще нема. Але не парся — перший завжди найважчий!',
   enterReportName = '📝 Як назвемо цей шедевр-звіт?',
   enterPlannedBudget = '💰 Вкажи бюджет, який плануєш тримати.',
   enterCurrentBudget = '💵 Скільки грошей реально маєш зараз?',
   noValidNumber = '😅 Це точно число? Введи цифрами, будь ласка.',
   unsuccessAddedReport = '❌ Не вдалось створити звіт. Але ми не здаємось 💪',
   successAddedReport = '✅ Красавчик! Звіт створено!',
   successLogout = '👋 Ти вийшов із системи. Повертайся, як засумуєш 😉',
   unsuccessLogout = '😬 Хмм, щось не так із виходом. Але не хвилюйся, гроші залишаються з тобою 💸',
   selectReport = 'Обери звіт, в який хочеш перейти 😉',
   unsuccessSelectReport = '😬 Хмм, щось не так - не вдалося обрати цей звіт',
   successSelectReport = 'Супер! Новій звіт обрано',
   workWithReport = 'Можеш працювати зі своїм звітом витрат 😉',
   enterCategoryName = '📝 Введи назву категорії, яку хочеш додати',
   notHaveSelectedReport = '❌ Ти не обрав звіт, в який хочеш додати категорію',
   unsuccessAddedCategory = '❌ Не вдалося додати нову категорію',
   successAddedCategory = '✅ Красавчик! Нову категорію успішно додано у звіт',
   chooseCategory = '😉 Обери категорію.',
   successAddedPayment = '✅ Вніс витрату в поточний звіт',
   chooseCategoryForRemove = '📝 Обери категорію для видалення',
   successRemovedCategory = '✅ Категорію успішно видалено',
   unsuccessRemovedCategory = '❌ Не вдалося видалити обрану категорію',
}

export enum BotKeyboardButtons {
   watchReports = '🗂 Обрати звіт',
   createReport = '📊 Створити звіт',
   help = '❓ Допомога',
   removeReport = '❌ Видалити звіт',

   reenterEmail = '✏️ Ввести email знову',

   addCategory = '💰 Додати категорію витрат',
   summaryByCategories = '📊 Витрати по категоріям',
   removeCategory = '❌ Видалити категорію',
}

export const addPaymentScene = 'addPayment';

export const BotMainMenu: Markup.Markup<ReplyKeyboardMarkup> = Markup.keyboard([
   [BotKeyboardButtons.watchReports, BotKeyboardButtons.createReport],
   [BotKeyboardButtons.removeReport, BotKeyboardButtons.help],
])
   .resize()
   .oneTime();

export const ReenterEmailMenu: Markup.Markup<ReplyKeyboardMarkup> =
   Markup.keyboard([BotKeyboardButtons.reenterEmail]).resize().oneTime();

export const InsideReportMenu: Markup.Markup<ReplyKeyboardMarkup> =
   Markup.keyboard([
      [BotKeyboardButtons.addCategory, BotKeyboardButtons.summaryByCategories],
      [BotKeyboardButtons.removeCategory, BotKeyboardButtons.watchReports],
   ])
      .resize()
      .oneTime();
