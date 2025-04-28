import { DbConnectOptions } from "types";
import { DbContext } from "../db/context";

describe('test database', () => {
    it('should create a new initialized connection', async () => {
        const connection = createDbContext()
        await connection.createConnection()
        expect(connection.isConnected()).toBe(true);
        await connection.closeConnection()
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

