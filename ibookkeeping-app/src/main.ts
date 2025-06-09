import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from 'http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useMiddlewares(app)
  await app.listen(process.env.PORT ?? 3000);
}
async function useMiddlewares(app: INestApplication<any>) {
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER)
  app.useLogger(logger)
  app.useGlobalFilters(new HttpExceptionFilter(logger))
}
bootstrap();
