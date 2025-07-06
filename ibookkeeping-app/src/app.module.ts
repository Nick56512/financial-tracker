import { Module } from '@nestjs/common';
import { CategoryModule } from 'modules/category/category.module';
import { WinstonLoggerModule } from 'modules/global/winston.module';
import { AuthModule } from 'modules/authorization/auth.module';
import { ConfigurationModule } from 'modules/global/config.module';
import { DatabaseModule } from 'modules/global/database/database.module';
import { CacheManagerModule } from 'modules/global/cache.manager.module';

@Module({
  imports: [
    ConfigurationModule,
    WinstonLoggerModule,
    DatabaseModule,
    CategoryModule,
    AuthModule,
    CacheManagerModule
  ],
  providers: []
})
export class AppModule {}
