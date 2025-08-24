export type VerifyCodeResponse = {
    access_token: string
    userId: string
}

export type SendCodeResponse = {
    success: boolean;
    isCodeExists: boolean;
}


export interface IVerificationService {
    sendVerificationCode(email: string): Promise<SendCodeResponse>
    verifyCode(email: string, verificationCode: number): Promise<VerifyCodeResponse | null>
}