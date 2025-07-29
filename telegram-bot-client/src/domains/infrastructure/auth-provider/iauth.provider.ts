export interface IAuthorizationProvider {
    getAuthorizationHeader(): string
}