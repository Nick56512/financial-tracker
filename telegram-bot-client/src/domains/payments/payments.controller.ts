import { IoCInjectionKeys } from '@core/config/keys/injection.keys';
import { IAuthHttpService } from '@domains/infrastructure/http-service/iauth.http.service';
import { IHttpService } from '@domains/infrastructure/http-service/ihttp.service';
import { inject } from 'inversify';
import { Payment, PaymentsSummaryByCategories } from './payments.models';
import {
   ISessionProvider,
   UserSession,
} from '@domains/infrastructure/session-provider/isession.provider';
import { Markup, Scenes } from 'telegraf';
import { BotContext } from '@bot/telegram.bot.context';
import {
   addPaymentScene,
   BotKeyboardButtons,
   BotReplies,
} from '@bot/telegram.bot.keys';
import { IGetSummaryByCategories } from './payments.service';
import { Category } from '@domains/category/category.model';
import { IFilterHttpService } from '@domains/infrastructure/ifilter.service';

export class PaymentsController {
   constructor(
      @inject(IoCInjectionKeys.PaymentsService)
      private readonly paymentsService: IAuthHttpService &
         IHttpService<Payment> &
         IGetSummaryByCategories,
      @inject(IoCInjectionKeys.CategoryService)
      private readonly categoryService: IAuthHttpService &
         IHttpService<Category> &
         IFilterHttpService<Category>,
      @inject(IoCInjectionKeys.SessionProvider)
      private readonly sessionProvider: ISessionProvider<UserSession>
   ) {}

   public getSummaryByCategories(): Scenes.BaseScene<BotContext> {
      const scene = new Scenes.BaseScene<BotContext>(
         BotKeyboardButtons.summaryByCategories
      );
      scene.enter(async (ctx) => {
         if (!ctx.chat?.id) {
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
         this.paymentsService.setAuthenticationToken(session.access_token);
         const result =
            await this.paymentsService.getSummaryByCategoriesInReport(
               session.currentReportId
            );
         ctx.reply(this.formatSummaryByCategories(result), {
            parse_mode: 'MarkdownV2',
         });
         return ctx.scene.leave();
      });
      return scene;
   }

   private formatSummaryByCategories(
      summary: PaymentsSummaryByCategories
   ): string {
      const options: Intl.DateTimeFormatOptions = {
         month: 'long',
         year: 'numeric',
      };
      const formatter = new Intl.DateTimeFormat('uk-UA', options);
      const formatDate = formatter.format(new Date(summary.reportCreatedAt));
      let message = `\`\`\`\n🗓 ${formatDate}\n`;
      message += '------------------------------\n';
      summary.categories.forEach((category) => {
         const space = ' '.repeat(20 - category.categoryName.length);
         message += `${category.categoryName}${space}${category.sum}\n`;
      });
      message += '------------------------------\n';
      message += `УСЬОГО${' '.repeat(18)}${summary.total}\n`;
      message += '------------------------------\n\`\`\`';
      return message;
   }

   public addNewPayment(): Scenes.BaseScene<BotContext> {
      const scene = new Scenes.BaseScene<BotContext>(addPaymentScene);
      scene.enter(async (ctx) => {
         if (!ctx.text) {
            return ctx.scene.leave();
         }
         if (!ctx.chat?.id) {
            return ctx.scene.leave();
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
         const amount = ctx.text;
         const selectedReport = session.currentReportId;
         this.categoryService.setAuthenticationToken(session.access_token);
         const categories = await this.categoryService.filter({
            reportId: session.currentReportId,
         });
         const buttons = [];
         for (let i = 0; i < categories.length; i += 2) {
            const row = [
               Markup.button.callback(
                  categories[i].name,
                  `${categories[i].id}`
               ),
            ];
            if (categories[i + 1]) {
               row.push(
                  Markup.button.callback(
                     categories[i + 1].name,
                     `${categories[i + 1].id}`
                  )
               );
            }
            buttons.push(row);
         }

         ctx.reply(BotReplies.chooseCategory, Markup.inlineKeyboard(buttons));
         scene.action(/([0-9a-f\-]{36})/, async (ctx) => {
            const categoryId = ctx.match[1];
            if (!ctx.chat?.id) {
               return;
            }
            const session = await this.sessionProvider.getByChatId(ctx.chat.id);
            if (!session) {
               ctx.reply(BotReplies.notHaveActiveSession);
               return ctx.scene.leave();
            }
            await this.paymentsService.create({
               amount: parseInt(amount),
               categoryId,
               reportId: selectedReport,
            });
            return ctx.scene.leave();
         });
      });
      return scene;
   }
}
