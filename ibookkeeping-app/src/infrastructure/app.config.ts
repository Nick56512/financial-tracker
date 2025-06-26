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
})
export default appConfiguration
