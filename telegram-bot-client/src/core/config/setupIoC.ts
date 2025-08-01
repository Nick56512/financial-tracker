import { Container } from "inversify";
import { IoCInjectionKeys } from "./keys/injection.keys";
import { IHttpService } from "domains/infrastructure/http-service/ihttp.service";
import { UserAccountController } from "domains/user-account/user.account.controller";
import { AxiosHttpService } from "domains/infrastructure/http-service/axios.http.service";
import { BotDispacher, IBotDispatcher } from "@bot/infrastructure/bot.dispatcher";
import { ISessionProvider } from "@bot/infrastructure/session-provider/isession.provider";
import { BotSession } from "@bot/telegram.bot.models";
import { SessionProvider } from "@bot/infrastructure/session-provider/session.provider";
import { IStorageManager } from "@core/storage-manager/istorage.manager";
import { RedisStorageManager } from "@core/storage-manager/redis.storage.manager";

export function setupIoCContainer(): Container {
    const container = new Container()
    setupBot(container)
    setupControllers(container)
    setupServices(container)
    return container
}

function setupBot(container: Container) {
    container.bind<IStorageManager>(IoCInjectionKeys.StorageManager).to(RedisStorageManager).inSingletonScope()
    container.bind<ISessionProvider<BotSession>>(IoCInjectionKeys.SessionProvider).to(SessionProvider)
    container.bind<IBotDispatcher>(IoCInjectionKeys.BotDispatcher).to(BotDispacher)
}

function setupControllers(container: Container) {
    container.bind<UserAccountController>(IoCInjectionKeys.UserAccountController).to(UserAccountController)
}

function setupServices(container: Container) {
    container.bind<IHttpService<Report>>(IoCInjectionKeys.ReportsService).to(AxiosHttpService<Report>)
}
