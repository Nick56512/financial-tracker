import { FinanceApiEndpoints } from "@core/api.routes";
import { IAuthorizationProvider } from "./auth-provider/iauth.provider";
import { IHttpService } from "./ihttp.service"
import axios, { Axios } from "axios";
import { injectable } from "inversify";
import { IAuthHttpService } from "./iauth.http.service";


// мейбі написати еррор хендлер для роботи
@injectable()
export class AxiosHttpService<T> implements IAuthHttpService<T>  {

    protected http: Axios;
    private authProvider: IAuthorizationProvider

    constructor(baseUrl: string, authProvider: IAuthorizationProvider) {
        this.http = axios.create({
            baseURL: baseUrl
        })
        this.authProvider = authProvider
    }

    public setAuthenticationToken(token: string): void {
        this.http.defaults.headers.common["Authorization"] = this.authProvider.getAuthorizationHeader(token)
    }
   
    async get(): Promise<T[]> {
        try {
            const response = await this.http.get("/")
            return response.data
        }
        catch(error: unknown) {
            console.log(error)
            return []
        }
    }
    async getById(id: string): Promise<T | null> {
        try {
            const response = await this.http.get(`${FinanceApiEndpoints.getById}`, {
                params: {
                    id
                }
            })
            return response.data
        }
        catch(error: unknown) {
            console.log(error)
            return null
        }
    }
    create(): Promise<T> {
        throw new Error("Method not implemented.");
    }
    update(): Promise<T> {
        throw new Error("Method not implemented.");
    }
}