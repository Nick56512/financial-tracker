import { IoCInjectionKeys } from "@core/config/keys/injection.keys";
import { IAuthHttpService } from "@domains/infrastructure/http-service/iauth.http.service";
import { IHttpService } from "@domains/infrastructure/http-service/ihttp.service";
import { inject } from "inversify";
import { Payment } from "./payments.models";
import { ISessionProvider, UserSession } from "@domains/infrastructure/session-provider/isession.provider";
import { Markup, Scenes } from "telegraf";
import { BotContext } from "@bot/infrastructure/bot.context";
import { BotKeyboardButtons, BotReplies } from "@bot/telegram.bot.keys";

export class PaymentsController {
    constructor(@inject(IoCInjectionKeys.PaymentsService) private readonly paymentsService: IAuthHttpService & IHttpService<Payment>,
                @inject(IoCInjectionKeys.SessionProvider) private readonly sessionProvider: ISessionProvider<UserSession>) { }

    public getSummaryByCatgories(): Scenes.BaseScene<BotContext> {
        const scene = new Scenes.BaseScene<BotContext>(BotKeyboardButtons.summaryByCategories)
        scene.enter(async (ctx) => {
                if(!ctx.chat?.id) {
                    return
                }
                const session = await this.sessionProvider.getByChatId(ctx.chat.id)
                if(!session) {
                    ctx.reply(BotReplies.notHaveActiveSession)
                    return ctx.scene.leave()
                }
                if(!session.currentReportId) {
                    ctx.reply(BotReplies.notHaveSelectedReport, Markup.keyboard([
                        BotKeyboardButtons.watchReports
                    ]))
                    return ctx.scene.leave()
                }
                const result = 
        })
        return scene
    }
}