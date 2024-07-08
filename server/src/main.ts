import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionHandler } from './shared/filters/global-exception.filter';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { parseBoolean } from './shared/utils/parser/boolean-parser';
import { 
  COOKIE_SECRET_TOKEN, 
  CORS_DEV_TOKEN, 
  CORS_ORIGIN_TOKEN 
} from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const CORS_DEV = parseBoolean(config.get(CORS_DEV_TOKEN), {default:false});
  if(CORS_DEV){
    app.enableCors({
      origin: true,
      credentials: true,
    });
  }else{
    const CORS_ORIGIN = config.get(CORS_ORIGIN_TOKEN);
    app.enableCors({
      origin: CORS_ORIGIN,
      credentials: true,
    });
  }

  const COOKIE_SECRET = config.get(COOKIE_SECRET_TOKEN);
  app.use(cookieParser(COOKIE_SECRET));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new GlobalExceptionHandler());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
