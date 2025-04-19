import { DbConnectOptions } from "types";
import { DbContext } from "../context";

describe('test database context', () => {
    it('should create a new initialized connection', async () => {
        const connection =  await createDbContext().createConnection()
        expect(connection.isInitialized).toBe(true);
        
        await connection.destroy();
    })
})

function createDbContext(): DbContext {
    const testConnectOptions: DbConnectOptions = {
        type: "postgres",
        host: 'localhost',
        port: 5432,
        username: 'testuser',
        password: 'testpassword',
        database: 'testdb',
        synchronize: false,
        logging: false,
    } 
   const dbContext = new DbContext(testConnectOptions);
   return dbContext;
}

