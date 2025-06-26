import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { availableDatabaseTypes } from "data-provider";
import { ConfigurationParameters } from "infrastructure/@types/enum.keys";
import Joi from "joi";
import appConfiguration from "../app.config";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [appConfiguration],
            validationSchema: Joi.object({
                [ConfigurationParameters.DATABASE_TYPE]: Joi.valid(...availableDatabaseTypes).required(),
                [ConfigurationParameters.DATABASE_HOST]: Joi.string().default('localhost').required(),
                [ConfigurationParameters.DATABASE_PORT]: Joi.number().default(5432).required(),
                [ConfigurationParameters.DATABASE_USER]: Joi.string().required(),
                [ConfigurationParameters.DATABASE_PASSWORD]: Joi.string().required(),
                [ConfigurationParameters.DATABASE_NAME]: Joi.string().required(),
                [ConfigurationParameters.DATABASE_SYNCHRONIZE]: Joi.bool().required().default(true),       
                [ConfigurationParameters.DATABASE_LOGGING]: Joi.bool().required().default(true)     
            }),
          validationOptions: {
            abortEarly: true
          }
        })
    ],
    exports: [ConfigModule]
})
export class ConfigurationModule {}