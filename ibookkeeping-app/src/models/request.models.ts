import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, Max, Min, MinLength } from "class-validator"

export class VerificationPayload {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNumber()
    verificationCode: number
}

export class LoginPayload {
    @IsEmail()
    @IsNotEmpty()
    email: string
}

export class SetAccountInfoPayload {
    @IsNumber()
    @Min(8)
    age: number

    @IsString()
    @IsNotEmpty()
    name: string
}