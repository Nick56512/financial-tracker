import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { availableDatabaseTypes } from "data-provider";
import appConfiguration from "app.config";
import Joi from "joi";
import { ConfigurationParameters } from "core/@types/enum.keys";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfiguration],
            validationSchema: Joi.object({
                [ConfigurationParameters.DATABASE_TYPE]: Joi.valid(...availableDatabaseTypes).required(),
                [ConfigurationParameters.DATABASE_HOST]: Joi.string().default('localhost').required(),
                [ConfigurationParameters.DATABASE_PORT]: Joi.number().default(5432).required(),
                [ConfigurationParameters.DATABASE_USER]: Joi.string().required(),
                [ConfigurationParameters.DATABASE_PASSWORD]: Joi.string().required(),
                [ConfigurationParameters.DATABASE_NAME]: Joi.string().required(),
                [ConfigurationParameters.DATABASE_SYNCHRONIZE]: Joi.bool().required().default(true),       
                [ConfigurationParameters.DATABASE_LOGGING]: Joi.bool().required().default(true),
                [ConfigurationParameters.LOG_DESTINATION_FILES]: Joi.string().default('logs/info.log'),
                [ConfigurationParameters.JWT_SECRET]: Joi.string().required(),
                [ConfigurationParameters.JWT_EXPIRES]: Joi.string().default('30d').required(),
                [ConfigurationParameters.REDIS_HOST]: Joi.string().default('localhost').required(),
                [ConfigurationParameters.REDIS_PORT]: Joi.number().default(6379).required()
            }),
          validationOptions: {
            abortEarly: true
          }
        })
    ],
    exports: [ConfigModule]
})
export class ConfigurationModule {}