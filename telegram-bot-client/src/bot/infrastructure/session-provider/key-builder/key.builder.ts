import { StorageLabels } from "core/storage-manager/storage.keys"
import { injectable } from "inversify"

export interface IKeyBuilder {
    build(chatId: string): string
}

@injectable()
export class SessionKeyBuilder implements IKeyBuilder {
    constructor() {}

    build(chatId: string): string {
        return `${StorageLabels.chatIdLabel}${chatId}`
    }
}