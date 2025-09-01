import { IoCInjectionKeys } from '@core/config/keys/injection.keys';
import { IAuthHttpService } from '@domains/infrastructure/http-service/iauth.http.service';
import { IHttpService } from '@domains/infrastructure/http-service/ihttp.service';
import { inject, injectable } from 'inversify';
import { Category } from './category.model';
import {
   ISessionProvider,
   UserSession,
} from '@domains/infrastructure/session-provider/isession.provider';
import { Markup, Scenes } from 'telegraf';
import { BotContext } from '@bot/telegram.bot.context';
import { BotKeyboardButtons, BotReplies, InsideReportMenu } from '@bot/telegram.bot.types';

@injectable()
export class CategoryController {
   constructor(
      @inject(IoCInjectionKeys.CategoryService)
      private readonly categoryService: IAuthHttpService &
         IHttpService<Category>,
      @inject(IoCInjectionKeys.SessionProvider)
      private readonly sessionProvider: ISessionProvider<UserSession>
   ) {}

   public createNewCategory(): Scenes.WizardScene<BotContext> {
      const scene = new Scenes.WizardScene<BotContext>(
         BotKeyboardButtons.addCategory,
         async (ctx) => {
            ctx.reply(BotReplies.enterCategoryName);
            return ctx.wizard.next();
         },
         async (ctx) => {
            if (!ctx.chat?.id || !ctx.text) {
               return;
            }
            const session = await this.sessionProvider.getByChatId(ctx.chat.id);
            if (!session) {
               ctx.reply(BotReplies.notHaveActiveSession);
               return ctx.scene.leave();
            }
            if (!session.currentReportId) {
               ctx.reply(
                  BotReplies.notHaveSelectedReport,
                  Markup.keyboard([BotKeyboardButtons.watchReports])
               );
               return ctx.scene.leave();
            }
            const reportId = session.currentReportId;
            await this.categoryService.setAuthenticationToken(
               session.access_token
            );
            const result: Category = await this.categoryService.create({
               name: ctx.text,
               reportId,
            });
            if (result.id) {
               ctx.reply(
                  BotReplies.successAddedCategory,
                  InsideReportMenu
               );
            } else {
               ctx.reply(
                  BotReplies.unsuccessAddedCategory,
                  InsideReportMenu
               );
            }
            return ctx.scene.leave();
         }
      );
      return scene;
   }

   public removeCategory(): Scenes.BaseScene<BotContext> {
      const scene = new Scenes.BaseScene<BotContext>(
         BotKeyboardButtons.removeCategory
      );
      scene.enter(async (ctx) => {
         if (!ctx.chat?.id || !ctx.text) {
            return;
         }
         const session = await this.sessionProvider.getByChatId(ctx.chat.id);
         if (!session) {
            ctx.reply(BotReplies.notHaveActiveSession);
            return ctx.scene.leave();
         }
         if (!session.currentReportId) {
            ctx.reply(
               BotReplies.notHaveSelectedReport,
               Markup.keyboard([BotKeyboardButtons.watchReports])
            );
            return ctx.scene.leave();
         }
         this.categoryService.setAuthenticationToken(session.access_token);
         ctx.reply(BotReplies.chooseCategory);
      });
      scene.action(/([0-9a-f\-]{36})/, async (ctx) => {
         const id = ctx.match[1];

         if (!ctx.chat?.id) {
            return ctx.scene.leave();
         }
         const session = await this.sessionProvider.getByChatId(ctx.chat.id);
         if (!session) {
            ctx.reply(BotReplies.notHaveActiveSession);
            return ctx.scene.leave();
         }

         const result = await this.categoryService.removeById(id);
         if (result) {
            ctx.editMessageText(BotReplies.successRemovedCategory);
            return;
         } else {
            ctx.editMessageText(BotReplies.unsuccessRemovedCategory);
         }
         return ctx.scene.leave();
      });
      return scene;
   }
}
