import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DbConnectOptions, DbContext } from "data-provider";
import { ConfigurationParameters, INJECTION_KEYS } from "infrastructure/@types/enum.keys";
import { ConfigurationModule } from "./config/config.module";

@Module({
    imports: [ConfigurationModule],
    providers: [
        {
            provide: INJECTION_KEYS.DbContext,
            useFactory: (configService: ConfigService) => {
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
                return new DbContext(options)
            },
            inject: [ConfigService]
        }
    ],
    exports: [INJECTION_KEYS.DbContext]
    
})
export class DatabaseModule {}