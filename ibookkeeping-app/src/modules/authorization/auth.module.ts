import { Module } from "@nestjs/common";
import { INJECTION_KEYS } from "types";
import { AuthController } from "./auth.controller";
import { DbContext, User, UserRepositoryCreator } from "data-provider";
import { UserAccountService } from "./user.account.service";
import { Mapper } from "infrastructure/service/mapper/mapper";
import { UserDto } from "models/dtos";
import { VerificationManager } from "./verification/verification.manager";

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [
        {
            provide: INJECTION_KEYS.UserAccountService,
            useFactory: (dbContext: DbContext) => {
                const repositoryCreator = new UserRepositoryCreator(dbContext)
                const repository = repositoryCreator.createRepository(User)
                return new UserAccountService(repository, new Mapper(User, UserDto))
            },
            inject: [INJECTION_KEYS.DbContext]
        },
        {
            provide: INJECTION_KEYS.VerificationManager,
            useClass: VerificationManager,
        }    
    ]
})
export class AuthModule {}