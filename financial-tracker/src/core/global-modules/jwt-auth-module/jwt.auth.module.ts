import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigurationParameters, INJECTION_KEYS } from "core/@types/enum.keys";
import { JwtGuardStrategy } from "./guard-strategy/jwt.strategy";
import { IModelRepository, User } from "data-provider";
import { AbstractService, IMapper, Mapper } from "infrastructure";
import { UserDto } from "models/dtos";

@Global()
@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow<string>(ConfigurationParameters.JWT_SECRET),
                signOptions: {
                    expiresIn: configService.getOrThrow<string>(ConfigurationParameters.JWT_EXPIRES)
                }
            }),
            inject: [ConfigService]
        }),
    ],
    providers: [
        {
            provide: INJECTION_KEYS.UserCrudService,
            useFactory: (userRepository: IModelRepository<User>) => {
                const mapper: IMapper<User, UserDto> = new Mapper(User, UserDto)
                return new AbstractService<User, UserDto>(userRepository, mapper)
            },
            inject: [ INJECTION_KEYS.UsersRepository ]

        },
        JwtGuardStrategy
    ],
    exports: [ JwtModule ]
})
export class JwtAuthModule {}