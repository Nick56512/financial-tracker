import 'module-alias/register';
import { FinanceTrackerBot } from '@bot/telegram.bot';
import { setupIoCContainer } from '@config/setupIoC';
import { IoCInjectionKeys } from '@core/config/keys/injection.keys';
import { setupCloseResources } from '@core/config/setupCloseResources';

function main() {
   global.iocContainer = setupIoCContainer();
   setupCloseResources(global.iocContainer);

   const bot = global.iocContainer.get<FinanceTrackerBot>(
      IoCInjectionKeys.BotTracker
   );
   bot.useMiddlewares();
   bot.registerCommands();
   bot.registerScenes();
   bot.launch();
}

main();
