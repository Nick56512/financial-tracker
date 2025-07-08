import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Inject, UnauthorizedException } from "@nestjs/common";
import { ConfigurationParameters, INJECTION_KEYS } from "types";
import { ConfigService } from "@nestjs/config";
import { IService } from "infrastructure";
import { UserDto } from "models/dtos";

export type JwtPayload = {
    email: string,
    sub: string         //this is user id
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
    

    validate(payload: JwtPayload) {
        const existsUser = this.userCrudService.findById(payload.sub)
        if(!existsUser) {
            throw new UnauthorizedException()
        }
        return existsUser
    }
}