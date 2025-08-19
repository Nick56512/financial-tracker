import { SendCodeResponse } from "@domains/user-account/user.account.models"

export type VerifyCodeResponse = {
    access_token: string
}

export interface IVerificationService {
    sendVerificationCode(email: string): Promise<SendCodeResponse>
    verifyCode(email: string, verificationCode: number): Promise<VerifyCodeResponse | null>
}