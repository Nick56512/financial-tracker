import { IoCInjectionKeys } from "@core/config/keys/injection.keys";
import { IAuthHttpService } from "@domains/infrastructure/http-service/iauth.http.service";
import { IHttpService } from "@domains/infrastructure/http-service/ihttp.service";
import { inject, injectable } from "inversify";
import { Category } from "./category.model";
import { ISessionProvider, UserSession } from "@domains/infrastructure/session-provider/isession.provider";
import { Markup, Scenes } from "telegraf";
import { BotContext } from "@bot/infrastructure/bot.context";
import { BotKeyboardButtons, BotReplies } from "@bot/telegram.bot.keys";

@injectable()
export class CategoryController {
    constructor(@inject(IoCInjectionKeys.CategoryService) private readonly categoryService: IAuthHttpService & IHttpService<Category>,
                @inject(IoCInjectionKeys.SessionProvider) private readonly sessionProvider: ISessionProvider<UserSession>) { }
    
    public createNewCategory(): Scenes.WizardScene<BotContext> {
        const scene = new Scenes.WizardScene<BotContext>(BotKeyboardButtons.addCategory, 
            async (ctx) => {
                ctx.reply(BotReplies.enterCategoryName)
                return ctx.wizard.next()
            },
            async (ctx) => {
                if(!ctx.chat?.id || !ctx.text) {
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
                const reportId = session.currentReportId
                await this.categoryService.setAuthenticationToken(session.access_token)
                const result: Category = await this.categoryService.create({
                    name: ctx.text,
                    reportId
                })
                if(result.id) {
                    ctx.reply(BotReplies.successAddedCategory, Markup.keyboard([
                        BotKeyboardButtons.addCategory,
                        BotKeyboardButtons.watchReports,
                        BotKeyboardButtons.summaryByCategories
                    ]).resize().oneTime())
                }
                else {
                    ctx.reply(BotReplies.unsuccessAddedCategory, Markup.keyboard([
                        BotKeyboardButtons.addCategory,
                        BotKeyboardButtons.watchReports,
                        BotKeyboardButtons.summaryByCategories
                    ]).resize().oneTime())
                }
                return ctx.scene.leave()
            }
        )
        return scene
    }
}