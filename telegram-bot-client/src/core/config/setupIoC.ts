import { Container } from 'inversify';
import { IoCInjectionKeys } from './keys/injection.keys';
import { UserAccountController } from '@domains/user-account/user.account.controller';
import { ISessionProvider } from '@domains/infrastructure/session-provider/isession.provider';
import { UserSession } from '@domains/infrastructure/session-provider/isession.provider';
import { IStorageManager } from '@core/storage-manager/istorage.manager';
import { FinanceTrackerBot } from '@bot/telegram.bot';
import config from '@config/app.config';
import { RedisStorageManager } from '@core/storage-manager/redis.storage.manager';
import {
   IKeyBuilder,
   SessionKeyBuilder,
} from '@domains/infrastructure/session-provider/key-builder/key.builder';
import { SessionProvider } from '@domains/infrastructure/session-provider/session.provider';
import { IVerificationService } from '@domains/infrastructure/iverification.service';
import { UserAccountService } from '@domains/user-account/user.account.service';
import { Scenes } from 'telegraf';
import { BotContext } from '@bot/telegram.bot.context';
import { AxiosHttpService } from '@domains/infrastructure/http-service/axios.http.service';
import { IHttpService } from '@domains/infrastructure/http-service/ihttp.service';
import { IAuthHttpService } from '@domains/infrastructure/http-service/iauth.http.service';
import { FinanceApiBaseUrls } from '@core/api.routes';
import { IAuthorizationProvider } from '@domains/infrastructure/http-service/auth-provider/iauth.provider';
import { JwtAuthorizationProvider } from '@domains/infrastructure/http-service/auth-provider/jwt.auth.provider';
import { ReportsController } from '@domains/reports/reports.controller';
import { Category } from '@domains/category/category.model';
import { CategoryController } from '@domains/category/category.controller';
import { PaymentsController } from '@domains/payments/payments.controller';
import {
   IGetSummaryByCategories,
   PaymentsService,
} from '@domains/payments/payments.service';
import { Payment } from '@domains/payments/payments.models';
import { IBuilder } from 'stage-builder/ibuilder';
import { BotStageBuilder } from '../../stage-builder/stage.builder';

export function setupIoCContainer(): Container {
   const container = new Container();
   setupServices(container);
   setupControllers(container);
   setupBot(container);
   return container;
}

function setupBot(container: Container) {
   container
      .bind<IStorageManager>(IoCInjectionKeys.StorageManager)
      .toDynamicValue(() => {
         return new RedisStorageManager({
            host: config.REDIS_SERVER_HOST,
            port: config.REDIS_SERVER_PORT,
            db: config.REDIS_SERVER_DB,
         });
      });
   container
      .bind<IKeyBuilder>(IoCInjectionKeys.KeyBuilder)
      .to(SessionKeyBuilder);
   container
      .bind<ISessionProvider<UserSession>>(IoCInjectionKeys.SessionProvider)
      .toDynamicValue(() => {
         const storage = container.get<IStorageManager>(
            IoCInjectionKeys.StorageManager
         );
         const keyBuilder = container.get<IKeyBuilder>(
            IoCInjectionKeys.KeyBuilder
         );
         return new SessionProvider(
            storage,
            keyBuilder,
            config.SESSION_TTL_SECONDS
         );
      });
   container
      .bind<
         IBuilder<Scenes.Stage<BotContext>>
      >(IoCInjectionKeys.BotStageBuilder)
      .to(BotStageBuilder);

   container
      .bind<FinanceTrackerBot>(IoCInjectionKeys.BotTracker)
      .toDynamicValue(() => {
         const dispatcher = container.get<IBuilder<Scenes.Stage<BotContext>>>(
            IoCInjectionKeys.BotStageBuilder
         );
         return new FinanceTrackerBot(dispatcher, config.TELEGRAM_BOT_TOKEN);
      })
      .inSingletonScope();
}

function setupControllers(container: Container) {
   container
      .bind<UserAccountController>(IoCInjectionKeys.UserAccountController)
      .to(UserAccountController);
   (container
      .bind<ReportsController>(IoCInjectionKeys.ReportsController)
      .to(ReportsController),
      container
         .bind<CategoryController>(IoCInjectionKeys.CategoryController)
         .to(CategoryController));
   container
      .bind<PaymentsController>(IoCInjectionKeys.PaymentsController)
      .to(PaymentsController);
}

function setupServices(container: Container) {
   container
      .bind<IVerificationService>(IoCInjectionKeys.VerificationService)
      .to(UserAccountService);
   container
      .bind<IAuthorizationProvider>(IoCInjectionKeys.AuthorizationProvider)
      .to(JwtAuthorizationProvider);
   container
      .bind<
         IAuthHttpService & IHttpService<Report>
      >(IoCInjectionKeys.ReportsService)
      .toDynamicValue(() => {
         const provider = container.get<IAuthorizationProvider>(
            IoCInjectionKeys.AuthorizationProvider
         );
         return new AxiosHttpService(
            FinanceApiBaseUrls.baseReportsUrl,
            provider
         );
      });
   container
      .bind<
         IAuthHttpService & IHttpService<Category>
      >(IoCInjectionKeys.CategoryService)
      .toDynamicValue(() => {
         const provider = container.get<IAuthorizationProvider>(
            IoCInjectionKeys.AuthorizationProvider
         );
         return new AxiosHttpService(
            FinanceApiBaseUrls.baseCategoriesUrl,
            provider
         );
      });
   container
      .bind<
         AxiosHttpService<Payment> & IGetSummaryByCategories
      >(IoCInjectionKeys.PaymentsService)
      .toDynamicValue(() => {
         const provider = container.get<IAuthorizationProvider>(
            IoCInjectionKeys.AuthorizationProvider
         );
         return new PaymentsService(
            FinanceApiBaseUrls.basePaymentsUrl,
            provider
         );
      });
}
