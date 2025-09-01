import { Scenes } from 'telegraf';
import { IBuilder } from './ibuilder';
import { BotContext } from '../bot/telegram.bot.context';
import { inject, injectable } from 'inversify';
import { IoCInjectionKeys } from '@core/config/keys/injection.keys';
import { UserAccountController } from '@domains/user-account/user.account.controller';
import { ReportsController } from '@domains/reports/reports.controller';
import { CategoryController } from '@domains/category/category.controller';
import { PaymentsController } from '@domains/payments/payments.controller';

@injectable()
export class BotStageBuilder implements IBuilder<Scenes.Stage<BotContext>> {
   constructor(
      @inject(IoCInjectionKeys.UserAccountController)
      private readonly userAccountController: UserAccountController,
      @inject(IoCInjectionKeys.ReportsController)
      private readonly reportsController: ReportsController,
      @inject(IoCInjectionKeys.CategoryController)
      private readonly categoryController: CategoryController,
      @inject(IoCInjectionKeys.PaymentsController)
      private readonly paymentsController: PaymentsController
   ) {}

   public build(): Scenes.Stage<BotContext> {
      const stage = new Scenes.Stage<BotContext>([
         /*
                write all controllers actions inside this stage
         */
         this.userAccountController.authorization(),
         this.userAccountController.logOut(),

         this.reportsController.chooseReportByUserId(),
         this.reportsController.createNewReport(),

         this.categoryController.createNewCategory(),
         this.categoryController.removeCategory(),

         this.paymentsController.getSummaryByCategories(),
         this.paymentsController.addNewPayment(),
      ]);
      return stage;
   }
}
