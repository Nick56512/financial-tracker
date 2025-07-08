import { Controller, Post, Body, UsePipes, ValidationPipe, Inject, BadRequestException, Put, UseGuards } from "@nestjs/common";
import { CacheDataKeys, ControllersRoutes, EndpointsRoutes, INJECTION_KEYS } from "types";
import { JwtService } from "@nestjs/jwt";
import { LoginPayload, SetAccountInfoPayload, VerificationPayload } from "models/request.models";
import { IVerificationManager } from "./verification/iverification.manager";
import { UserDto } from "models/dtos";
import { JwtAuthGuard } from "../global/jwt-auth-module/guard-strategy/jwt.auth.guard";
import { IUserAccountService } from "./user.account.service";

@Controller(ControllersRoutes.authorization)
@UsePipes(new ValidationPipe({ whitelist: true }))
export class AuthController {
    
    constructor(@Inject(INJECTION_KEYS.UserAccountService) private readonly userAccountService: IUserAccountService,
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
        let userId: string | null;
        const existsUser = await this.userAccountService.findUserByEmail(verificationPayload.email)
        if(!existsUser) {
            const userDto: UserDto = {
                id: null,
                email: verificationPayload.email,
            }
            userId = await this.userAccountService.registerNewUser(userDto)
        }
        else {
            userId = existsUser.id
        }
        const payload = { email: verificationPayload.email, sub: userId}
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
    @UseGuards(JwtAuthGuard)
    public async setAccountInfo(@Body() accountInfo: SetAccountInfoPayload) {
        const existsUser = await this.userAccountService.findUserByEmail(accountInfo.email)
        if(!existsUser) {
            throw new BadRequestException()
        } 
        // TO DO: set account info
    }
}