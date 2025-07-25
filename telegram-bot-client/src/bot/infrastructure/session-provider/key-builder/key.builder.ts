import { StorageLabels } from "core/storage-manager/storage.keys"

export interface IKeyBuilder {
    build(chatId: string): string
}

export class SessionKeyBuilder implements IKeyBuilder {
    constructor() {}

    build(chatId: string): string {
        return `${StorageLabels.chatIdLabel}${chatId}`
    }
}