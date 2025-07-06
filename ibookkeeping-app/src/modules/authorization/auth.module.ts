import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ConfigurationParameters, INJECTION_KEYS } from "types";
import { AuthController } from "./auth.controller";
import { DbContext, User, UserRepositoryCreator } from "data-provider";
import { UserService } from "./user.service";
import { Mapper } from "infrastructure/service/mapper/mapper";
import { UserDto } from "models/dtos";

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                global: true,
                secret: configService.getOrThrow<string>(ConfigurationParameters.JWT_SECRET),
                signOptions: {
                    expiresIn: configService.getOrThrow<string>(ConfigurationParameters.JWT_EXPIRES)
                }
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: INJECTION_KEYS.UserService,
            useFactory: (dbContext: DbContext) => {
                const repositoryCreator = new UserRepositoryCreator(dbContext)
                const repository = repositoryCreator.createRepository(User)
                return new UserService(repository, new Mapper(User, UserDto))
            },
            inject: [INJECTION_KEYS.DbContext]
        }
    ]
})
export class AuthModule {}