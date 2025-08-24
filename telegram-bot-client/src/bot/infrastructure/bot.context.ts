import { Scenes, Context } from "telegraf";
import { Update } from "telegraf/types"

type UserData = {
    email : string
}

type ReportData = {
    reportName: string
    plannedBudget: number
    currentBudget: number
}

export interface BotSession extends Scenes.WizardSessionData {
    user: UserData
    report: ReportData
}

export interface BotContext extends Context<Update> {
  session: Scenes.WizardSession & BotSession
  scene: Scenes.SceneContextScene<BotContext, Scenes.WizardSessionData>; 
  wizard: Scenes. WizardContextWizard<BotContext>;
}
