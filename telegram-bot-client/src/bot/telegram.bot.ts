import { Telegraf, Scenes, Markup } from 'telegraf';
import { IDispose } from 'core/idispose';
import {
   addPaymentScene,
   BotCommands,
   BotCommandsDescriptions,
   BotKeyboardButtons,
   BotReplies,
} from './telegram.bot.keys';
import { session } from 'telegraf/session';
import { BotContext } from './telegram.bot.context';
import { IBuilder } from '../stage-builder/ibuilder';
import { message } from 'telegraf/filters';

export class FinanceTrackerBot implements IDispose {
   private readonly bot: Telegraf<BotContext>;

   constructor(
      private readonly stageBuilder: IBuilder<Scenes.Stage<BotContext>>,
      botToken: string
   ) {
      this.bot = new Telegraf<BotContext>(botToken);
   }

   public useMiddlewares() {
      this.bot.use(session());
      this.bot.use(this.stageBuilder.build().middleware());
      this.bot.catch((err) => {
         console.log(err);
      });
   }

   public registerCommands() {
      const commands = Object.keys(
         BotCommands
      ) as (keyof typeof BotCommandsDescriptions)[];
      this.bot.telegram.setMyCommands(
         commands.map((name) => ({
            command: name,
            description: BotCommandsDescriptions[name],
         }))
      );

      this.bot.start((ctx: BotContext) =>
         ctx.reply(BotReplies.greetings, Markup.removeKeyboard())
      );
      commands.forEach((command) => {
         this.bot.command(command, (ctx: BotContext) => {
            ctx.scene.enter(command);
         });
      });
   }

   public registerScenes() {
      this.bot.on(message('text'), (ctx) => {
         const positiveNumbersRegex = /^\d+(\.\d+)?$/;
         if (positiveNumbersRegex.test(ctx.message.text)) {
            ctx.scene.enter(addPaymentScene);
         } else {
            ctx.scene.enter(ctx.message.text);
         }
      });
   }

   public launch() {
      this.bot.launch(() => {
         console.log('Bot is starting');
      });
   }

   public dispose() {
      this.bot.stop('dispose');
   }
}
