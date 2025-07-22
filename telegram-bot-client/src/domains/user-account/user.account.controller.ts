import { TextMessageContext } from "core/@types/telegram.bot.types";
import { UserAccountService } from "./user.account.service";
import { IStorageManager } from "core/storage-manager/istorage.manager";

export class UserAccountController {
    constructor(private readonly userAccountService: UserAccountService,
                private readonly storageManager: IStorageManager
    ) {}

    private checkState

    public authorization(context: TextMessageContext) {
        const botCommand = context.message.text
        if()
    }

}