import { Container } from "inversify";
import { IoCInjectionKeys } from "./keys/injection.keys";
import { UserAccountController } from "@domains/user-account/user.account.controller";
import { ISessionProvider } from "@bot/infrastructure/session-provider/isession.provider";
import { UserSession } from "@bot/telegram.bot.models";
import { IStorageManager } from "@core/storage-manager/istorage.manager";
import { FinanceTrackerBot } from "@bot/telegram.bot";
import config from "@config/app.config"
import { RedisStorageManager } from "@core/storage-manager/redis.storage.manager";
import { IKeyBuilder, SessionKeyBuilder } from "@bot/infrastructure/session-provider/key-builder/key.builder";
import { SessionProvider } from "@bot/infrastructure/session-provider/session.provider";
import { IVerificationService } from "@domains/infrastructure/iverification.service";
import { UserAccountService } from "@domains/user-account/user.account.service";
import { IBuilder } from "@bot/infrastructure/stage-builder/ibuilder";
import { Scenes } from "telegraf";
import { BotContext } from "@bot/infrastructure/bot.context";
import { BotStageBuilder } from "@bot/infrastructure/stage-builder/stage.builder";

export function setupIoCContainer(): Container {
    const container = new Container()
    setupBot(container)
    setupControllers(container)
    setupServices(container)
    return container
}

function setupBot(container: Container) {
    container.bind<IStorageManager>(IoCInjectionKeys.StorageManager).toDynamicValue(() => {
        return new RedisStorageManager({
            host: config.REDIS_SERVER_HOST,
            port: config.REDIS_SERVER_PORT,
            db: config.REDIS_SERVER_DB
        })
    })
    container.bind<IKeyBuilder>(IoCInjectionKeys.KeyBuilder).to(SessionKeyBuilder)
    container.bind<ISessionProvider<UserSession>>(IoCInjectionKeys.SessionProvider).toDynamicValue(() => {
        const storage = container.get<IStorageManager>(IoCInjectionKeys.StorageManager)
        const keyBuilder = container.get<IKeyBuilder>(IoCInjectionKeys.KeyBuilder)
        return new SessionProvider(storage, keyBuilder, config.SESSION_TTL_SECONDS)
    })
    container.bind<IBuilder<Scenes.Stage<BotContext>>>(IoCInjectionKeys.BotStageBuilder).to(BotStageBuilder)

    container.bind<FinanceTrackerBot>(IoCInjectionKeys.BotTracker).toDynamicValue(() => {
        const dispatcher = container.get<IBuilder<Scenes.Stage<BotContext>>>(IoCInjectionKeys.BotStageBuilder)
        return new FinanceTrackerBot(dispatcher, config.TELEGRAM_BOT_TOKEN)
    }).inSingletonScope()
}

function setupControllers(container: Container) {
    container.bind<IVerificationService>(IoCInjectionKeys.VerificationService).to(UserAccountService)
    container.bind<UserAccountController>(IoCInjectionKeys.UserAccountController).to(UserAccountController)
}

function setupServices(container: Container) {
    //container.bind<IHttpService<Report>>(IoCInjectionKeys.ReportsService).to(AxiosHttpService<Report>)
}
