import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ 
    origin: true,
    credentials: true,
  });

  const config = app.get(ConfigService);

  const cookie_secret = config.get("COOKIE_SECRET")
  app.use(cookieParser(cookie_secret));

  app.useGlobalPipes(new ValidationPipe({
    transform:true,
    whitelist:true,
    forbidNonWhitelisted:true
  }));

  await app.listen(3000);
}
bootstrap();
