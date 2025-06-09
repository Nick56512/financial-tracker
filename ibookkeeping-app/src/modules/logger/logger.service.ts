import { WinstonLogger } from "nest-winston";
import { Logger } from "winston";

export class LoggerService {

    private readonly winston: Logger
    constructor(logFilesPath: string) { 
        this.winston = new Logger({
            ""
        })
    }

    public error(msg: string) {
        this.winston.error(msg)
    }

    public warn(msg: string) {
        this.winston.warn(msg)
    }

    public info(msg: string) {
        this.winston.log(msg)
    }
}