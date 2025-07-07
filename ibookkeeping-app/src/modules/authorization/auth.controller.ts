import { Controller, Post, Body, UsePipes, ValidationPipe, Inject, BadRequestException } from "@nestjs/common";
import { IUserService } from "./user.service";
import { CacheDataKeys, INJECTION_KEYS } from "types";
import { JwtService } from "@nestjs/jwt";
import { RegisterPayload, VerificationPayload } from "models/request.models";
import { UserDto } from "models/dtos";
import { IVerificationManager } from "./verification/iverification.manager";

@Controller('auth')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class AuthController {
    
    constructor(@Inject(INJECTION_KEYS.UserService) private readonly userService: IUserService,
                @Inject(INJECTION_KEYS.VerificationManager) private readonly verificationManager: IVerificationManager,
                private readonly jwtService: JwtService,
                ) {}

    @Post('verify')
    public async verify(@Body() verificationPayload: VerificationPayload) {
        const cacheStoreKey = `${CacheDataKeys.verificationCode}:${verificationPayload.email}`
        const verificationSuccess = await this.verificationManager.verificate(cacheStoreKey, verificationPayload.verificationCode)
        if(!verificationSuccess) {
            throw new BadRequestException('Expired or wrong verification code')
        }
        const payload = { email: verificationPayload.email}
        return { access_token: this.jwtService.sign(payload) }
    }

    @Post('register')
    public async register(@Body() registerPayload: RegisterPayload) {
        const newUser: UserDto = {
            age: registerPayload.age,
            email: registerPayload.email,
            name: registerPayload.name,
        }
        /*const registerResult = await this.userService.registerNewUser(newUser)  //TODO: remove registration
        if(!registerResult) {
            throw new BadRequestException(`User with email ${newUser.email} is already exists`)
        }*/
        await this.verificationManager.createCode(`${CacheDataKeys.verificationCode}:${newUser.email}`)
        return { verificationNeed: true }
    }
}