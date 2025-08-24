import axios, { Axios, AxiosError } from "axios";
import { IVerificationService, VerifyCodeResponse, SendCodeResponse } from "@domains/infrastructure/iverification.service";
import { FinanceApiBaseUrls, FinanceApiEndpoints } from "@core/api.routes";

export class UserAccountService implements IVerificationService {
    private readonly http: Axios

    constructor() {
        this.http = axios.create({
            baseURL: FinanceApiBaseUrls.baseAuthUrl
        })
    }

    public async sendVerificationCode (email: string): Promise<SendCodeResponse> {
        try {
            const response = await this.http.post(FinanceApiEndpoints.sendCode, { email })
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
            const response = await this.http.post(FinanceApiEndpoints.verifyCode, { email, verificationCode})
            return response.data
        }
        catch(error) {
            console.log(error)
            return null
        }
    }
}