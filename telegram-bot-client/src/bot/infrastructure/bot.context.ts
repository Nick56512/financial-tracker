import { Scenes, Context } from "telegraf";
import { Update } from "telegraf/types"

type UserData = {
    email : string
}

export interface BotSession extends Scenes.WizardSessionData {
    data: UserData
}

export interface BotContext extends Context<Update> {
  session: Scenes.WizardSession & BotSession
  scene: Scenes.SceneContextScene<BotContext, Scenes.WizardSessionData>; 
  wizard: Scenes. WizardContextWizard<BotContext>;
}
