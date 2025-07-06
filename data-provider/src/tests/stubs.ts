import { DbConnectOptions } from "types";
import { Category, DbContext, User, Report, Payments } from "../index.js";

export function createDbContext(): DbContext {
    const testConnectOptions: DbConnectOptions = {
        type: "postgres",
        host: 'localhost',
        port: 5432,
        username: 'testuser',
        password: 'testpassword',
        database: 'testdb',
        synchronize: true,
        logging: false,
        entities: [ User, Category, Report, Payments ]
    } 
   const dbContext = new DbContext(testConnectOptions);
   return dbContext;
}

export function getTestUser(): User {
    const user = new User()
    user.age = 23
    user.email = 'mittsykh@ukr.net'
    user.name = 'dancer';
    user.id = '26717b93-3cd4-4e3a-96fc-ab9c5e3cdb02'
    return user
}