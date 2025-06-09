import { Module, Scope } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import { LoggerService } from "./logger.service";
import { ConfigService } from "@nestjs/config";
import { ConfigurationParameters } from "infrastructure/@types/enum.keys";

@Module({
    imports: [
        WinstonModule.forRoot({
            
        })
    ],
    /*providers: [
        {
            provide: LoggerService,
            useFactory: (configService: ConfigService) => {
               const logFilesDestination = configService.getOrThrow<string>(ConfigurationParameters.LOG_DESTINATION_FILES)
               return new LoggerService()
            },
            scope: Scope.DEFAULT
        }
    ],*/
    exports: [WinstonModule]
})
export class WinstonLoggerModule {}