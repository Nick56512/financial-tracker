import axios, { Axios, AxiosError, HttpStatusCode } from "axios";
import { EmailVerificationRequest, VerifyCodeRequest, VerifyCodeResponse } from "./user.account.models";
import { FinanceApiUrls } from "api.routes";
export class UserAccountService {
    private readonly http: Axios

    constructor() {
        this.http = axios.create({
            baseURL: FinanceApiUrls.baseUrl
        })
        this.http.interceptors.response.use((response) => {
            return response
        },
        (err: AxiosError) => {
            if(err.response?.status === HttpStatusCode.BadRequest) {
                console.log(JSON.stringify(err.response))
            }
            return err.response
        }
        )
    }

    public async verifyEmail (model: EmailVerificationRequest): Promise<boolean> {
        const response = await this.http.post(FinanceApiUrls.sendCode, model)
        if(response.status === HttpStatusCode.BadRequest) {
            return false
        }
        return response.data.success
    }

    public async sendCode (model: VerifyCodeRequest): Promise<VerifyCodeResponse | null> {
        const response = await this.http.post(FinanceApiUrls.verifyCode, model)
        if(response.status === HttpStatusCode.BadRequest) {
            return null
        }
        return response.data as VerifyCodeResponse
    }
}