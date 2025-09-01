export type UserSession = {
   email: string;
   access_token: string;
   userId: string;
   currentReportId?: string;
};

export interface ISessionProvider<T> {
   create(chatId: number, userSession: UserSession): Promise<T>;
   getByChatId(chatId: number): Promise<T | null>;
   update<K extends keyof T>(
      chatId: number,
      propertyName: K,
      value: T[K]
   ): Promise<T | null>;
   delete(chatId: number): Promise<boolean>;
}
