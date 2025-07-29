export type VerifyCodeResponse = {
    access_token: string
}

export interface IVerificationService {
    sendVerificationCode(email: string): Promise<boolean>
    verifyCode(email: string, verificationCode: number): Promise<VerifyCodeResponse | null>
}