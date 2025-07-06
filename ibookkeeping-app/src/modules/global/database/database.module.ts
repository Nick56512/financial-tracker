import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Category, DbConnectOptions, DbContext, User, Payments, Report } from "data-provider";
import { ConfigurationParameters, INJECTION_KEYS } from "types";
import { DatabaseShutdown } from "./database.shutdown";
import { DatabaseCreateConnection } from "./database.init.connection";

@Global()
@Module({
    imports: [],
    providers: [
        {
            provide: INJECTION_KEYS.DbContext,
            useFactory: async (configService: ConfigService) => {
                const options: DbConnectOptions = {
                    type: configService.getOrThrow(ConfigurationParameters.DATABASE_TYPE),
                    host: configService.getOrThrow(ConfigurationParameters.DATABASE_HOST),
                    port: configService.getOrThrow(ConfigurationParameters.DATABASE_PORT),
                    username: configService.getOrThrow(ConfigurationParameters.DATABASE_USER),
                    password: configService.getOrThrow(ConfigurationParameters.DATABASE_PASSWORD),
                    database: configService.getOrThrow(ConfigurationParameters.DATABASE_NAME),
                    synchronize: configService.getOrThrow(ConfigurationParameters.DATABASE_SYNCHRONIZE),
                    logging: configService.getOrThrow(ConfigurationParameters.DATABASE_LOGGING),
                    entities: [ User, Category, Report, Payments ]
                }
                const context = new DbContext(options)
               
                return context
            },
            inject: [ConfigService]
        },
        DatabaseShutdown,
        DatabaseCreateConnection
    ],
    exports: [INJECTION_KEYS.DbContext]
    
})
export class DatabaseModule {}