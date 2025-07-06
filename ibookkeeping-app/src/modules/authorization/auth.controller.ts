import { Controller, Post, Body, UsePipes, ValidationPipe, Inject, BadRequestException } from "@nestjs/common";
import { IUserService } from "./user.service";
import { INJECTION_KEYS } from "types";
import { JwtService } from "@nestjs/jwt";
import { RegisterPayload, VerificationPayload } from "models/request.models";
import { UserDto } from "models/dtos";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

@Controller('auth')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class AuthController {

    private readonly verificationCode = '56555'
    constructor(@Inject(INJECTION_KEYS.UserService) private readonly userService: IUserService,
                @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,    // &&&
                private readonly jwtService: JwtService,
                ) {}

    @Post('verify')
    public async verify(@Body() verificationPayload: VerificationPayload) {
        this.cacheManager.set('code', this.verificationCode)
    }

    /*public async login(@Body() credentials: LoginPayload) {
        const user = await this.userService.findUserByEmail(credentials.email)
        if(!user) {
            throw new BadRequestException()
        }
        if() {
            throw new BadRequestException()
        }
        const payload = { user_name: user.name, id: user.id}
        return this.jwtService.sign(payload)
    }*/

    @Post('register')
    public async register(@Body() registerPayload: RegisterPayload) {
        const newUser: UserDto = {
            age: registerPayload.age,
            email: registerPayload.email,
            name: registerPayload.name,
        }
        const registerResult = await this.userService.registerNewUser(newUser)
        if(!registerResult) {
            throw new BadRequestException(`User with email ${newUser.email} is already exists`)
        }
        const payload = { user_name: newUser.name, id: newUser.id}
        return this.jwtService.sign(payload)
    }
}