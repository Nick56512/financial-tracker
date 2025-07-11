import { Module } from '@nestjs/common';
import { CategoryModule } from 'domains/category/category.module';
import { WinstonLoggerModule } from 'core/global-modules/winston.module';
import { UserAccountModule } from 'domains/user-account/user.account.module';
import { ConfigurationModule } from 'core/global-modules/config.module';
import { DatabaseModule } from 'core/global-modules/database/database.module';
import { CacheManagerModule } from 'core/global-modules/cache.manager.module';
import { JwtAuthModule } from 'core/global-modules/jwt-auth-module/jwt.auth.module';
import { PaymentsModule } from 'domains/payment/payment.module';

@Module({
  imports: [
    ConfigurationModule,
    WinstonLoggerModule,
    DatabaseModule,
    JwtAuthModule,
    CategoryModule,
    UserAccountModule,
    CacheManagerModule,
    PaymentsModule
  ],
  providers: []
})
export class AppModule {}
