import Redis from "ioredis";
import { IStorageManager } from "./istorage.manager";

export type RedisStorageManagerOptions = {
    port: number,
    host: string,
    db?: number,
    retryStrategy?: ((time: number) => number | void | null)
}

export class RedisStorageManager implements IStorageManager {

    private readonly redis: Redis;

    constructor(options: RedisStorageManagerOptions) {
        this.redis = new Redis({
            host: options.host,
            port: options.port,
            db: options.db,
            retryStrategy: options.retryStrategy
        })
    }

    async get<T>(key: string): Promise<T | null> {
        const json = await this.redis.get(key)
        if(json === null) {
            return json
        }
        try {
            const value: T = JSON.parse(json) 
            return value
        }
        catch(ex) {
            console.log(ex)
            return null
        }
    }

    async set<T>(key: string, value: T): Promise<boolean> {
        var json
        try {
            json = JSON.stringify(value)
        }
        catch(ex) {
            console.log(ex)
            return false
        }
        return (await this.redis.set(key, json)) === 'OK'
    }
}