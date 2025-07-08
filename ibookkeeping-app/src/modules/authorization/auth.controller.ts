import { Controller, Post, Body, UsePipes, ValidationPipe, Inject, BadRequestException, Put } from "@nestjs/common";
import { IUserService } from "./user.service";
import { CacheDataKeys, ControllersRoutes, EndpointsRoutes, INJECTION_KEYS } from "types";
import { JwtService } from "@nestjs/jwt";
import { LoginPayload, SetAccountInfoPayload, VerificationPayload } from "models/request.models";
import { IVerificationManager } from "./verification/iverification.manager";
import { UserDto } from "models/dtos";

@Controller(ControllersRoutes.authorization)
@UsePipes(new ValidationPipe({ whitelist: true }))
export class AuthController {
    
    constructor(@Inject(INJECTION_KEYS.UserService) private readonly userService: IUserService,
                @Inject(INJECTION_KEYS.VerificationManager) private readonly verificationManager: IVerificationManager,
                private readonly jwtService: JwtService,
                ) {}

    @Post(EndpointsRoutes.verify)
    public async verify(@Body() verificationPayload: VerificationPayload) {
        const cacheStoreKey = `${CacheDataKeys.verificationCode}:${verificationPayload.email}`
        const verificationSuccess = await this.verificationManager.verificate(cacheStoreKey, verificationPayload.verificationCode)
        if(!verificationSuccess) {
            throw new BadRequestException('Expired or wrong verification code')
        }
        const existsUser = await this.userService.findUserByEmail(verificationPayload.email)
        if(!existsUser) {
            const userDto: UserDto = {
                email: verificationPayload.email,
            }
            await this.userService.registerNewUser(userDto)
        }
        const payload = { email: verificationPayload.email}
        return { access_token: this.jwtService.sign(payload) }
    }

    @Post(EndpointsRoutes.sendCode) 
    public async sendCode(@Body() loginPayload: LoginPayload) {
        const codeCacheKey = `${CacheDataKeys.verificationCode}:${loginPayload.email}`
        if(await this.verificationManager.isExistsCode(codeCacheKey)) {
            throw new BadRequestException()
        }
        await this.verificationManager.createCode(codeCacheKey)
        return { verificationNeed: true }
    }

    @Put(EndpointsRoutes.setAccountInfo)
    public async setAccountInfo(@Body() accountInfo: SetAccountInfoPayload) {
        const existsUser = await this.userService.findUserByEmail(accountInfo.email)
        if(!existsUser) {
            throw new BadRequestException()
        } 
    }


    /*@Post('register')
    public async register(@Body() registerPayload: RegisterPayload) {
        /*const newUser: UserDto = {
            age: registerPayload.age,
            email: registerPayload.email,
            name: registerPayload.name,
        }
        /*const registerResult = await this.userService.registerNewUser(newUser)  //TODO: remove registration
        if(!registerResult) {
            throw new BadRequestException(`User with email ${newUser.email} is already exists`)
        }

        await this.verificationManager.createCode(`${CacheDataKeys.verificationCode}:${newUser.email}`)
        return { verificationNeed: true }
    }*/
}