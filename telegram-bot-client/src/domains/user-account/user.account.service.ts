import { FinanceApiAuthUrls } from "@core/api.routes";
import axios, { Axios } from "axios";
import { IVerificationService, VerifyCodeResponse } from "domains/infrastructure/iverification.service";

export class UserAccountService implements IVerificationService {
    private readonly http: Axios

    constructor() {
        this.http = axios.create({
            baseURL: FinanceApiAuthUrls.baseUrl
        })
    }

    public async sendVerificationCode (email: string): Promise<boolean> {
        try {
            const response = await this.http.post(FinanceApiAuthUrls.sendCode, { email })
            return response.data.success
        }
        catch(error) {
            console.log(error)
            return false
        }
    }

    public async verifyCode(email: string, verificationCode: number): Promise<VerifyCodeResponse | null> {
        try {
            const response = await this.http.post(FinanceApiAuthUrls.verifyCode, { email, verificationCode})
            return response.data
        }
        catch(error) {
            console.log(error)
            return null
        }
    }
}