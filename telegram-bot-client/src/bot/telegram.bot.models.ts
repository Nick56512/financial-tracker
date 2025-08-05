



export interface BotRequest {
    chatId: number,
    messageText?: string
    session: UserSession | null,
    ok: () => void,
    denied: () => void
}

export type UserSession = {
    email: string,
    access_token: string,
}

