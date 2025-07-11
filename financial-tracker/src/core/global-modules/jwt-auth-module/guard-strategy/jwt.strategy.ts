import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Inject, UnauthorizedException } from "@nestjs/common";
import { ConfigurationParameters, INJECTION_KEYS } from "core/@types/enum.keys";
import { ConfigService } from "@nestjs/config";
import { IService } from "infrastructure";
import { UserDto } from "models/dtos";

export type JwtPayload = {
    email: string,
    userId: string | undefined         
}

export class JwtGuardStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(INJECTION_KEYS.UserCrudService) private readonly userCrudService: IService<UserDto>,
                private readonly configService: ConfigService){
        super({
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.getOrThrow<string>(ConfigurationParameters.JWT_SECRET)
        })
    }
    

    async validate(payload: JwtPayload): Promise<JwtPayload> {
        if(!payload.userId) {
            throw new UnauthorizedException()
        }
        const existsUser = await this.userCrudService.findById(payload.userId)
        if(!existsUser) {
            throw new UnauthorizedException()
        }
        return { email: existsUser.email, userId: existsUser.id  } 
    }
}