import { Category, User, Payments, Report, PrimaryKeyEntity } from "./entities";
import { BaseEntity, DataSource, EntityTarget, Repository } from "typeorm";
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
   
    public async createConnection() {
        if(this.connection.isInitialized) {
            return this.connection
        }
        return this.connection.initialize();
    }

    public async closeConnection() {
        if(this.connection.isInitialized) {
            await this.connection.destroy()
        }
    }

    public isConnected(): boolean {
        return this.connection.isInitialized
    }

    public getConnection() {
        return this.connection
    }
}