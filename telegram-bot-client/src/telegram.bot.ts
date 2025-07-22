import Redis from "ioredis";
import { AuthService } from "./services/auth.service";
import { SendCodeModel } from "./models/auth.models";
import { FinanceBotReplies } from "./core/@types/telegram.bot.types";
import { Telegraf } from "telegraf";
import { message } from 'telegraf/filters'

export class FinanceTrackerBot {
    private readonly bot: Telegraf;
    private readonly redis: Redis;
    private readonly auth: AuthService

    constructor(private readonly botToken: string) {
        this.bot = new Telegraf(botToken)
        this.redis = new Redis({
            host: '127.0.0.1',
            port: 6379,
            retryStrategy: (times) => {
                const delay = Math.min(times * 50, 2000);
                return delay;
            },
            db: 1
        })
        this.auth = new AuthService()
    }

    public listen() {
        this.bot.start((ctx) => {
            ctx.reply(FinanceBotReplies.greetings)
            ctx.reply(FinanceBotReplies.authorizationNeed)
        })
        this.bot.command('auth', async (ctx) => {
            await this.redis.set('currentCommand', 'auth')

            
           /* const model: SendCodeModel = {
                email: ctx.message.text
            } 
            const res = await auth.sendCode(model)
            ctx.reply(JSON.stringify('cc'))*/
        })
        this.bot.on(message('text'), async (ctx) => {
            const currentCommand = await this.redis.get('currentCommand')
            if(currentCommand === 'auth') {
                const model: SendCodeModel = {
                email: ctx.message.text
            } 
            const res = await this.auth.sendCode(model)
            ctx.reply(JSON.stringify(res))
            }
        })
        //this.bot.command('beer', (ctx) => { ctx.reply('Nrtt') })
        this.bot.launch()
    }

}

const bot: FinanceTrackerBot = new FinanceTrackerBot('7974462926:AAGkCV6JdCrfBIsPubzZ5NUct4_TkZyuxgA')
bot.listen()

//const token = '7974462926:AAGkCV6JdCrfBIsPubzZ5NUct4_TkZyuxgA'

//const bot = new Telegraf(token)


//ot.launch()

console.log('Bot is running')