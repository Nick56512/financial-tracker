import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DbConnectOptions, DbContext } from "data-provider";
import { ConfigurationParameters, INJECTION_KEYS } from "infrastructure/@types/enum.keys";
import { ConfigurationModule } from "../config.module";
import { DatabaseShutdown } from "./database.shutdown";

@Module({
    imports: [ConfigurationModule],
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
                }
                const context = new DbContext(options)
                await context.createConnection()
                return context
            },
            inject: [ConfigService]
        },
        DatabaseShutdown
    ],
    exports: [INJECTION_KEYS.DbContext]
    
})
export class DatabaseModule {}