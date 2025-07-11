import { Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import { ConfigService } from "@nestjs/config";
import * as winston from "winston";
import { ConfigurationParameters } from "core/@types/enum.keys";

@Module({
    imports: [
        WinstonModule.forRootAsync({
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