import { Module } from '@nestjs/common';
import { CategoryModule } from 'modules/category/category.module';
import { ConfigurationModule } from 'infrastructure';
import { DatabaseModule } from 'infrastructure';
import { WinstonLoggerModule } from 'infrastructure/modules/winston.module';

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
