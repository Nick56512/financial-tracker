import { Module } from "@nestjs/common";
import { INJECTION_KEYS } from "core/@types/enum.keys";
import { UserAccountController } from "./user.account.controller";
import { IModelRepository, User } from "data-provider";
import { UserAccountService } from "./user.account.service";
import { Mapper } from "infrastructure/service/mapper/mapper";
import { UserDto } from "models/dtos";
import { VerificationManager } from "./verification/verification.manager";
import { IMapper } from "infrastructure";

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
        }    
    ]
})
export class UserAccountModule {}