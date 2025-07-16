import { Telegraf } from "telegraf";
import { message } from "telegraf/filters"

const token = '7974462926:AAGkCV6JdCrfBIsPubzZ5NUct4_TkZyuxgA'

const bot = new Telegraf(token)

bot.start((ctx) => {
    ctx.reply('Привіт?')
})

bot.on(message('text'), (ctx) => {
    const res = ctx.message.text
    ctx.reply('ТИ ввів ')
})

bot.launch()

console.log('Bot is running')