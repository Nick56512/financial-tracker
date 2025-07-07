import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, Max, Min, MinLength } from "class-validator"

export class VerificationPayload {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNumber()
    verificationCode: number
}

export class RegisterPayload {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNumber()
    @Min(18)
    age: number

    @IsString()
    @IsNotEmpty()
    name: string

}