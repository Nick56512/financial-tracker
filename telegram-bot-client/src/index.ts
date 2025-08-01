import 'module-alias/register'
import { IStorageManager } from "core/storage-manager/istorage.manager";
import { FinanceTrackerBot } from "./bot/telegram.bot";
import { RedisStorageManager } from "./core/storage-manager/redis.storage.manager";
import { SessionProvider } from "./bot/infrastructure/session-provider/session.provider";
import { IDispose } from "core/idispose";
import { UserAccountController } from "./domains/user-account/user.account.controller";
import { UserAccountService } from "./domains/user-account/user.account.service";
import { setupIoCContainer } from '@config/setupIoC';
import { Container } from 'inversify';

function main() {
  const container: Container = setupIoCContainer()


  /*const token = '7974462926:AAGkCV6JdCrfBIsPubzZ5NUct4_TkZyuxgA'
  const storage: IStorageManager & IDispose = new RedisStorageManager({
      host: '127.0.0.1',
      port: 6379,
  })
  const sessionProvider = new SessionProvider(storage)
  const service = new UserAccountService()
  const authController = new UserAccountController(service)
  const bot: FinanceTrackerBot & IDispose = new FinanceTrackerBot(token, sessionProvider)
  
  process.once('SIGINT', () => {
    storage.dispose()
    bot.dispose()
  })

  process.once('SIGTERM', () => {
    storage.dispose()
    bot.dispose()
  })
  bot.useMiddlewares()
  bot.registerCommands()
  
  bot.launch()*/
}

main()