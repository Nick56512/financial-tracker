import { IoCInjectionKeys } from "@core/config/keys/injection.keys";
import { IHttpService } from "@domains/infrastructure/http-service/ihttp.service";
import { ISessionProvider, UserSession } from "@domains/infrastructure/session-provider/isession.provider";
import { inject, injectable } from "inversify";
import { Report } from "./reports.models";
import { Scenes } from "telegraf";
import { ScenesKeys } from "@core/scenes.keys";
import { BotContext } from "@bot/infrastructure/bot.context";
import { BotReplies } from "@bot/telegram.bot.keys";
import { IAuthHttpService } from "@domains/infrastructure/http-service/iauth.http.service";

@injectable()
export class ReportsController {
    constructor(@inject(IoCInjectionKeys.SessionProvider) private readonly sessionProvider: ISessionProvider<UserSession>,
                @inject(IoCInjectionKeys.ReportsService) private readonly reportsService: IAuthHttpService<Report>)
    {}

    public getAllReports(): Scenes.BaseScene<BotContext> {
       const scene = new Scenes.BaseScene<BotContext>(ScenesKeys.GetAllReports)
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
            const result = await this.reportsService.get()
            ctx.reply(result.map(x=>x.name).join('\n'))
            return ctx.scene.leave()
       })
       return scene
    }
}