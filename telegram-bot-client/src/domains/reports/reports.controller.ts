import { IoCInjectionKeys } from "@core/config/keys/injection.keys";
import { IHttpService } from "@domains/infrastructure/http-service/ihttp.service";
import { ISessionProvider, UserSession } from "@domains/infrastructure/session-provider/isession.provider";
import { inject, injectable } from "inversify";
import { Report } from "./reports.models";
import { Markup, Scenes } from "telegraf";
import { BotContext } from "@bot/infrastructure/bot.context";
import { BotKeyboardButtons, BotReplies } from "@bot/telegram.bot.keys";
import { IAuthHttpService } from "@domains/infrastructure/http-service/iauth.http.service";
import { IFilterHttpService } from "@domains/infrastructure/ifilter.service";

@injectable()
export class ReportsController {
    constructor(@inject(IoCInjectionKeys.SessionProvider) private readonly sessionProvider: ISessionProvider<UserSession>,
                @inject(IoCInjectionKeys.ReportsService) private readonly reportsService: IAuthHttpService & IHttpService<Report> & IFilterHttpService<Report>)
    {}

    public chooseReportByUserId(): Scenes.BaseScene<BotContext> {
       const scene = new Scenes.BaseScene<BotContext>(BotKeyboardButtons.watchReports)
       scene.enter(async (ctx) => {
            if(!ctx.chat?.id) {
                return
            }
            const session = await this.sessionProvider.getByChatId(ctx.chat.id)
            if(!session) {
                ctx.reply(BotReplies.notHaveActiveSession)
                return ctx.scene.leave()
            }
            this.reportsService.setAuthenticationToken(session.access_token)
            const result = await this.reportsService.filter({ userId: session.userId })
            if(result.length === 0) {
                ctx.reply(BotReplies.notHaveAnyReports)
                return ctx.scene.leave()
            }

            ctx.reply(BotReplies.selectReport, Markup.inlineKeyboard(
                result.map(x => [
                    Markup.button.callback(x.name, `${x.id}`)
                ])
            ));
       })
       scene.action(/([0-9a-f\-]{36})/, async (ctx) => {
            const reportId = ctx.match[1]
            if(!ctx.chat?.id) {
                return
            }
            const session = await this.sessionProvider.getByChatId(ctx.chat.id)
            if(!session) {
                ctx.reply(BotReplies.notHaveActiveSession)
                return ctx.scene.leave()
            }
            const result = await this.sessionProvider.update(ctx.chat.id, 'currentReportId', reportId)
            if(!result) {
                ctx.editMessageText(BotReplies.unsuccessSelectReport)
                return ctx.scene.leave()
            }
            ctx.editMessageText(BotReplies.successSelectReport)
            ctx.reply(BotReplies.workWithReport, Markup.keyboard([
                BotKeyboardButtons.addCategory,
                BotKeyboardButtons.watchReports
            ]).resize().oneTime())
            return ctx.scene.leave()
        })
       return scene
    }

    public createNewReport(): Scenes.WizardScene<BotContext> {
        return new Scenes.WizardScene<BotContext>(BotKeyboardButtons.createReport, 
            async (ctx) => {
                if(!ctx.chat?.id) {
                    return
                }
                const session = await this.sessionProvider.getByChatId(ctx.chat.id)
                if(!session) {
                    ctx.reply(BotReplies.notHaveActiveSession)
                    return ctx.scene.leave()
                }
                this.reportsService.setAuthenticationToken(session.access_token)
                ctx.reply(BotReplies.enterReportName)
                return ctx.wizard.next()
            },
            async (ctx) => {
                if(!ctx.text) {
                    return
                }
                ctx.session.report = {
                    reportName: ctx.text,
                    plannedBudget: 0,
                    currentBudget: 0
                }
                ctx.reply(BotReplies.enterPlannedBudget)
                return ctx.wizard.next()
            },
            async (ctx) => {
                if(!ctx.text) {
                    return
                }
                const text = ctx.text.trim()
                const number = parseFloat(text || '')
                if(isNaN(number)) {
                    ctx.reply(BotReplies.notValidateCode)
                    return
                }
                ctx.session.report.plannedBudget = number
                ctx.reply(BotReplies.enterCurrentBudget)
                return ctx.wizard.next()
            },
            async (ctx) => {
                if(!ctx.text) {
                    return
                }
                if(!ctx.chat?.id) {
                    return
                }
                const text = ctx.text.trim()
                const number = parseFloat(text || '')
                if(isNaN(number)) {
                    ctx.reply(BotReplies.notValidateCode)
                    return
                }
                ctx.session.report.currentBudget = number
                const session = await this.sessionProvider.getByChatId(ctx.chat.id)
                if(!session) {
                    ctx.reply(BotReplies.notHaveActiveSession)
                    return ctx.scene.leave()
                }
                const result = await this.reportsService.create({
                    userId: session.userId,
                    plannedBudget: ctx.session.report.plannedBudget,
                    currentBudget: ctx.session.report.currentBudget,
                    name: ctx.session.report.reportName
                })
                if(!result.id) {
                    ctx.reply(BotReplies.unsuccessAddedReport)
                    return ctx.scene.leave()
                }
                ctx.reply(BotReplies.successAddedReport)
                return ctx.scene.leave()
            }
        )
    }
}