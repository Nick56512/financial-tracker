import { StorageLabels } from "core/storage-manager/storage.keys"
import { injectable } from "inversify"

export interface IKeyBuilder {
    build(chatId: number): string
}

@injectable()
export class SessionKeyBuilder implements IKeyBuilder {
    constructor() {}

    build(chatId: number): string {
        return `${StorageLabels.chatIdLabel}${chatId}`
    }
}