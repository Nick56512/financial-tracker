import * as dotenv from 'dotenv'
dotenv.config()

const appConfiguration = () => ({
    DATABASE_TYPE: process.env.DATABASE_TYPE,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_SYNCHRONIZE: process.env.DATABASE_SYNCHRONIZE,    
    DATABASE_LOGGING: process.env.DATABASE_LOGGING,
    LOG_DESTINATION_FILES: process.env.LOG_DESTINATION_FILES,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES: process.env.JWT_EXPIRES,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT
})
export default appConfiguration
