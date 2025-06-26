import { Module, Scope } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import { ConfigurationParameters } from "infrastructure/@types/enum.keys";
import { ConfigurationModule } from "infrastructure";
import { ConfigService } from "@nestjs/config";
import * as winston from "winston";

@Module({
    imports: [
        WinstonModule.forRootAsync({
            imports: [
                ConfigurationModule
            ],
            useFactory: (configService: ConfigService) => {
                const pathToFile = configService.getOrThrow<string>(ConfigurationParameters.LOG_DESTINATION_FILES)
                return {
                    transports: [
                        new winston.transports.File({
                            filename: pathToFile,
                            level: 'info',
                            format: winston.format.simple()
                        }),
                        new winston.transports.File({
                            filename: pathToFile,
                            level: 'error',
                            format: winston.format.errors()
                        }),
                        new winston.transports.Console({
                            format: winston.format.simple(),
                        })
                    ]
                }
            },
            inject: [ConfigService],
        })
    ],
    exports: [WinstonModule]
})
export class WinstonLoggerModule {}