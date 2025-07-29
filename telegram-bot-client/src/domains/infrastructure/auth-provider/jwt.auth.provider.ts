import { IAuthorizationProvider } from "./iauth.provider";

export class JwtAuthorizationProvider implements IAuthorizationProvider {

    constructor(private readonly token: string) {}

    public getAuthorizationHeader(): string {
       return `Bearer ${this.token}`
    }
}