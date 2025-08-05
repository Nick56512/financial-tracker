import Redis from "ioredis";
import { IStorageManager } from "./istorage.manager";
import { IDispose } from "core/idispose";
import { injectable } from "inversify";

export type RedisStorageManagerOptions = {
    port: number,
    host: string,
    db?: number,
    retryStrategy?: ((time: number) => number | void | null)
}

@injectable()
export class RedisStorageManager implements IStorageManager, IDispose {

    private readonly redis: Redis;

    constructor(options: RedisStorageManagerOptions) {
        this.redis = new Redis({
            host: options.host,
            port: options.port,
            db: options.db,
            retryStrategy: options.retryStrategy
        })
    }

    get(key: string): Promise<string | null> {
        return this.redis.get(key)
    }

    async set(key: string, value: string, ttlSeconds?: number): Promise<boolean> {
        const result = ttlSeconds ? 
            await this.redis.set(key, value, 'EX', ttlSeconds) :
            await this.redis.set(key, value)
        return result === 'OK'
    }

    async delete(key: string): Promise<boolean> {
        return (await this.redis.del(key)) > 0
    }

    dispose(): void {
        this.redis.quit()
    }
}