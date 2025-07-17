import { Module } from "@nestjs/common";
import { ConfigurationParameters, INJECTION_KEYS } from "core/@types/enum.keys";
import { UserAccountController } from "./user.account.controller";
import { IModelRepository, User } from "data-provider";
import { UserAccountService } from "./user.account.service";
import { Mapper } from "infrastructure/service/mapper/mapper";
import { VerificationManager } from "./verification/verification.manager";
import { IMapper } from "infrastructure";
import { UserDto } from "./user.account.models";
import { ConfigService } from "@nestjs/config";
import { EmailProvider } from "./email-provider/email.provider";

@Module({
    imports: [],
    controllers: [ UserAccountController ],
    providers: [
        {
            provide: INJECTION_KEYS.UserAccountService,
            useFactory: (repository: IModelRepository<User>) => {
                const mapper: IMapper<User, UserDto> = new Mapper<User, UserDto>(User, UserDto)
                return new UserAccountService(repository, mapper)
            },
            inject: [INJECTION_KEYS.UsersRepository]
        },
        {
            provide: INJECTION_KEYS.VerificationManager,
            useClass: VerificationManager,
        },
        {
            provide: INJECTION_KEYS.EmailProvider,
            useFactory: (configService: ConfigService) => {
                return new EmailProvider({
                    emailApiToken: configService.getOrThrow<string>(ConfigurationParameters.EMAIL_API_KEY),
                    emailFrom: configService.getOrThrow<string>(ConfigurationParameters.EMAIL_FROM),
                })
            },
            inject: [ConfigService]
        }
    ]
})
export class UserAccountModule {}