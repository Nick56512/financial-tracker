import { Module } from '@nestjs/common';
import { CategoryModule } from 'modules/category/category.module';
import { ConfigurationModule } from 'modules/config/config.module';
import { DatabaseModule } from 'modules/database.module';
import { WinstonLoggerModule } from 'modules/logger/winston.module';

@Module({
  imports: [
    ConfigurationModule,
    WinstonLoggerModule,
    DatabaseModule,
    CategoryModule
  ],
  providers: []
})
export class AppModule {}
