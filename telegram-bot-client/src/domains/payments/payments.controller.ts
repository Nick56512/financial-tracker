import { IoCInjectionKeys } from "@core/config/keys/injection.keys";
import { IAuthHttpService } from "@domains/infrastructure/http-service/iauth.http.service";
import { IHttpService } from "@domains/infrastructure/http-service/ihttp.service";
import { inject } from "inversify";
import { Payment, PaymentsSummaryByCategories } from "./payments.models";
import { ISessionProvider, UserSession } from "@domains/infrastructure/session-provider/isession.provider";
import { Markup, Scenes } from "telegraf";
import { BotContext } from "@bot/telegram.bot.context";
import { BotKeyboardButtons, BotReplies } from "@bot/telegram.bot.keys";
import { IGetSummaryByCategories } from "./payments.service";

export class PaymentsController {
    constructor(
                @inject(IoCInjectionKeys.PaymentsService) private readonly paymentsService: IAuthHttpService & IHttpService<Payment> & IGetSummaryByCategories,
                @inject(IoCInjectionKeys.SessionProvider) private readonly sessionProvider: ISessionProvider<UserSession>
            ) { }

    public getSummaryByCategories(): Scenes.BaseScene<BotContext> {
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
            this.paymentsService.setAuthenticationToken(session.access_token)
            const result = await this.paymentsService.getSummaryByCategoriesInReport(session.currentReportId)
            ctx.reply(this.formatSummaryByCategories(result))
            return ctx.scene.leave()
        })
        return scene
    }

    private formatSummaryByCategories(summary: PaymentsSummaryByCategories): string {
        const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' }
        const formatDate = summary.reportCreatedAt.toLocaleString('uk-UA', options)
        let message = `🗓 ${formatDate}\n`;
        message += '------------------------------\n';
        summary.categories.forEach(category => {
            const space = ' '.repeat(20 - category.categoryName.length)
            message += `${category.categoryName}${space}${category.sum}\n`;
        })
        message += '------------------------------\n';
        message += `УСЬОГО${' '.repeat(18)}${summary.total}\n`;
        message += '------------------------------';
        return message
    }
}