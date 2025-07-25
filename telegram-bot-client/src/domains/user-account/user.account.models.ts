export type EmailVerificationRequest = {
    email: string
}

export type VerifyCodeRequest = {
    email: string
    verificationCode: number
}

export type VerifyCodeResponse = {
    access_token: string
}