import { Global, Module, Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Category, DbConnectOptions, DbContext, User, Payments, Report, IRepositoryCreator, EntityRepositoryCreator, PrimaryKeyEntity } from "data-provider";
import { ConfigurationParameters, INJECTION_KEYS } from "core/@types/enum.keys";
import { DatabaseShutdown } from "./database.shutdown";
import { DatabaseCreateConnection } from "./database.init.connection";

function createRepositoryProvider<Entity extends PrimaryKeyEntity>(
    token: string, 
    entity: new () => Entity): Provider
{
    return {
        provide: token,
        useFactory: (dbContext: DbContext) => {
            const creator: IRepositoryCreator<Entity> = new EntityRepositoryCreator(dbContext)
            return creator.createRepository(entity)
        },
        inject: [INJECTION_KEYS.DbContext]
    }
}

@Global()
@Module({
    imports: [],
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
                    entities: [ User, Category, Report, Payments ]
                }
                const context = new DbContext(options)
               
                return context
            },
            inject: [ConfigService]
        },
        createRepositoryProvider<Category>(INJECTION_KEYS.CategoryRepository, Category),
        createRepositoryProvider<Report>(INJECTION_KEYS.ReportsRepository, Report),
        createRepositoryProvider<User>(INJECTION_KEYS.UsersRepository, User),
        createRepositoryProvider<Payments>(INJECTION_KEYS.PaymentsRepository, Payments),
        DatabaseShutdown,
        DatabaseCreateConnection
    ],
    exports: [
        INJECTION_KEYS.DbContext,
        INJECTION_KEYS.CategoryRepository,
        INJECTION_KEYS.PaymentsRepository,
        INJECTION_KEYS.ReportsRepository,
        INJECTION_KEYS.UsersRepository
    ]
    
})
export class DatabaseModule {}