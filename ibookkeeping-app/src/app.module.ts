import { Module } from '@nestjs/common';
import { CategoryModule } from 'modules/category/category.module';
import { ConfigurationModule } from 'infrastructure';
import { DatabaseModule } from 'infrastructure';
import { WinstonLoggerModule } from 'infrastructure/modules/winston.module';
import { AuthModule } from 'infrastructure/modules/authorization/auth.module';

@Module({
  imports: [
    ConfigurationModule,
    WinstonLoggerModule,
    DatabaseModule,
    CategoryModule,
    AuthModule
  ],
  providers: []
})
export class AppModule {}
