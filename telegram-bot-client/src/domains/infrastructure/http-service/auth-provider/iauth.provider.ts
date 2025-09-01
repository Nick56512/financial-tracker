export interface IAuthorizationProvider {
   getAuthorizationHeader(token: string): string;
}
