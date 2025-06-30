import { IsEmail, IsNotEmpty, IsNumber, IsString, Max, Min, MinLength } from "class-validator"

export class LoginPayload {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string
}

export class RegisterPayload {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string

    @IsNumber()
    @Min(18)
    age: number

    @IsString()
    @IsNotEmpty()
    name: string

}