import { FinanceApiEndpoints } from "@core/api.routes";
import { IAuthorizationProvider } from "../auth-provider/iauth.provider";
import { IHttpService } from "./ihttp.service"
import axios, { Axios } from "axios";
// мейбі написати еррор хендлер для роботи
export class AxiosHttpService<T> implements IHttpService<T>  {

    protected http: Axios

    constructor(baseUrl: string, authProvider: IAuthorizationProvider) {
        this.http = axios.create({
            baseURL: baseUrl,
            headers: {
                Authorization: authProvider.getAuthorizationHeader()
            }
        })
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