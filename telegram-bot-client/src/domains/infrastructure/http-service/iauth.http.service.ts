import { IHttpService } from "./ihttp.service";

export interface IAuthHttpService<T> extends IHttpService<T> {
    setAuthenticationToken(token: string): void
}