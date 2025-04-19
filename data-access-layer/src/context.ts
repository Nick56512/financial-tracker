import { Category, User, Payments, Report } from "entities";
import { DataSource } from "typeorm";
import { DbConnectOptions } from "types";

export class DbContext {
    private connection: DataSource;
    constructor(private readonly connectOptions: DbConnectOptions) {
        this.connection = new DataSource({
            type: this.connectOptions.type,
            host: this.connectOptions.host,
            port: this.connectOptions.port,
            username: this.connectOptions.username,
            password: this.connectOptions.password,
            database: this.connectOptions.database,
            synchronize: this.connectOptions.synchronize,
            logging: this.connectOptions.logging,
            entities: [User, Category, Payments, Report],
        })
    }
   
    public async createConnection(): Promise<DataSource> {
        if(this.connection.isInitialized) {
            return this.connection;
        }
       return await this.connection.initialize();
    }
}