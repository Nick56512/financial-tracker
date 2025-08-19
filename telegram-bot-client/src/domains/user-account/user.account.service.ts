import { FinanceApiAuthUrls } from "@core/api.routes";
import axios, { Axios, AxiosError } from "axios";
import { IVerificationService, VerifyCodeResponse } from "domains/infrastructure/iverification.service";
import { SendCodeResponse } from "./user.account.models";

export class UserAccountService implements IVerificationService {
    private readonly http: Axios

    constructor() {
        this.http = axios.create({
            baseURL: FinanceApiAuthUrls.baseUrl
        })
    }

    public async sendVerificationCode (email: string): Promise<SendCodeResponse> {
        try {
            const response = await this.http.post(FinanceApiAuthUrls.sendCode, { email })
            return {
                success: response.data.success,
                isCodeExists: false
            }
        }
        catch(error: unknown) {
            if(!(error instanceof AxiosError)) {
                return {
                    success: false,
                    isCodeExists: false
                }
            }
            const axiosError = error as AxiosError<SendCodeResponse>
            if(!axiosError.response || !axiosError.response.data) {
                return {
                    success: false,
                    isCodeExists: false
                }
            }
            if(axiosError.response.data.isCodeExists) {
                return {
                    success: false,
                    isCodeExists: true
                }
            }
            return {
                success: false,
                isCodeExists: false
            }
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