import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";
import { ConfigurationParameters } from "types";

@Module({
    imports: [
        CacheModule.registerAsync({
            isGlobal: true,
            useFactory: async (configService: ConfigService) => {
                const redis = await redisStore({
                    socket: {
                        host: configService.getOrThrow<string>(ConfigurationParameters.REDIS_HOST),
                        port: configService.getOrThrow<number>(ConfigurationParameters.REDIS_PORT),
                    }
                })
                return {
                    store: () => redis
                }
            },
            inject: [ConfigService]
        })
    ]
})
export class CacheManagerModule {}