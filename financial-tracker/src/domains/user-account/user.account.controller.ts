import { Controller, Post, Body, UsePipes, ValidationPipe, Inject, BadRequestException, Put, UseGuards } from "@nestjs/common";
import { CacheDataKeys, ControllersRoutes, EndpointsRoutes, INJECTION_KEYS } from "core/@types/enum.keys";
import { JwtService } from "@nestjs/jwt";
import { IVerificationManager } from "./verification/iverification.manager";
import { JwtAuthGuard } from "../../core/global-modules/jwt-auth-module/guard-strategy/jwt.auth.guard";
import { IUserAccountService } from "./user.account.service";
import { User } from "core/decorators/user.decorator";
import { JwtPayload } from "core/global-modules/jwt-auth-module/guard-strategy/jwt.strategy";
import { LoginPayload, SetAccountInfoPayload, UserDto, VerificationPayload } from "./user.account.models";

@Controller(ControllersRoutes.authorization)
@UsePipes(new ValidationPipe({ whitelist: true }))
export class UserAccountController {
    
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
        let userId: string | undefined;
        const existsUser = await this.userAccountService.findUserByEmail(verificationPayload.email)
        if(!existsUser) {
            const userDto: UserDto = {
                email: verificationPayload.email,
            }
            userId = await this.userAccountService.registerNewUser(userDto)
        }
        else {
            userId = existsUser.id
        }
        const payload: JwtPayload = { email: verificationPayload.email, userId}
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
    public async setAccountInfo(@Body() accountInfo: SetAccountInfoPayload,
                                @User() user: JwtPayload) {
        const existsUser = await this.userAccountService.findUserByEmail(user.email)
        if(!existsUser) {
            throw new BadRequestException()
        } 
        if(existsUser.id !== user.userId) {
            throw new BadRequestException()
        }

        const result = await this.userAccountService.updateAccountInfo({
           ...accountInfo,
           email: existsUser.email,
           id: existsUser.id
        })
        return { success: result }
    }
}