import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigurationParameters, INJECTION_KEYS } from "types";
import { JwtGuardStrategy } from "./guard-strategy/jwt.strategy";
import { DbContext, EntityRepositoryCreator, IRepositoryCreator, User } from "data-provider";
import { AbstractService, Mapper } from "infrastructure";
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
            useFactory: (dbContext: DbContext) => {
                const creator: IRepositoryCreator<User> = new EntityRepositoryCreator(dbContext)
                const repository = creator.createRepository(User)
                return new AbstractService(repository, new Mapper(User, UserDto))
            },
            inject: [ INJECTION_KEYS.DbContext ]

        },
        JwtGuardStrategy
    ],
    exports: [ JwtModule ]
})
export class JwtAuthModule {}