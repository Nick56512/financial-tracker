import { IStorageManager } from '@core/storage-manager/istorage.manager';
import { Container } from 'inversify';
import { IoCInjectionKeys } from './keys/injection.keys';
import { IDispose } from '@core/idispose';
import { FinanceTrackerBot } from '@bot/telegram.bot';

export function setupCloseResources(container: Container) {
   const storage: IStorageManager & IDispose = container.get(
      IoCInjectionKeys.StorageManager
   );
   const bot: FinanceTrackerBot = container.get(IoCInjectionKeys.BotTracker);
   process.once('SIGINT', () => {
      storage.dispose();
      bot.dispose();
   });

   process.once('SIGTERM', () => {
      storage.dispose();
      bot.dispose();
   });
}
