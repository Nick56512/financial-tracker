import { BotContext } from "bot/telegram.bot.models"
import { UserAccountService } from "./user.account.service"

export class UserAccountController {
    constructor(private readonly userAccountService: UserAccountService) {}

    public authorization(context: BotContext) {
       //this.userAccountService.
    }
}