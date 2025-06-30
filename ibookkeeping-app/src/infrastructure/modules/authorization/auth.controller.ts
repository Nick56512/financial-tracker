import { Controller, Post, Body, UsePipes, ValidationPipe, Inject, BadRequestException } from "@nestjs/common";
import { IUserService } from "./user.service";
import { INJECTION_KEYS } from "infrastructure/@types/enum.keys";
import { JwtService } from "@nestjs/jwt";
import { LoginPayload, RegisterPayload } from "models/request.models";
import { UserDto } from "models/dtos";

@Controller('auth')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class AuthController {

    constructor(@Inject(INJECTION_KEYS.UserService)private readonly userService: IUserService,
                private readonly jwtService: JwtService) {}

    @Post('login')
    public async login(@Body() credentials: LoginPayload) {
        const user = await this.userService.findUserByEmail(credentials.email)
        if(!user) {
            throw new BadRequestException()
        }
        if(user.password !== credentials.password) {
            throw new BadRequestException()
        }
        const payload = { user_name: user.name, id: user.id}
        return this.jwtService.sign(payload)
    }

    @Post('register')
    public async register(@Body() registerPayload: RegisterPayload) {
        const newUser: UserDto = {
            age: registerPayload.age,
            email: registerPayload.email,
            name: registerPayload.name,
            password: registerPayload.password
        }
        const registerResult = await this.userService.registerNewUser(newUser)
        if(!registerResult) {
            throw new BadRequestException(`User with email ${newUser.email} is already exists`)
        }
        const payload = { user_name: newUser.name, id: newUser.id}
        return this.jwtService.sign(payload)
    }
}