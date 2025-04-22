import { DbConnectOptions } from "types";
import { DbContext } from "../db/context";
import { User } from "entities";
import { Repository } from "typeorm";

describe('test database', () => {
    const connection = createDbContext()
    beforeAll(async () => {
        await connection.createConnection()
    })
    it('should create a new initialized connection', async () => {
        expect(connection.isConnected()).toBe(true);
    })
    it('should return a user repository', async () => {
        const repo: Repository<User> = connection.getRepository(User)
        expect(repo.metadata.name).toBe(User.name);
    })
    afterAll(async () => {
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

