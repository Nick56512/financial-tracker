import { IAuthorizationProvider } from './iauth.provider';

export class JwtAuthorizationProvider implements IAuthorizationProvider {
   constructor() {}

   public getAuthorizationHeader(token: string): string {
      return `Bearer ${token}`;
   }
}
