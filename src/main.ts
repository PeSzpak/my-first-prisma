import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConflictInterceptor } from './common/filters/http-exception/errors/interceptors/conflict.interceptor';
import { DatabaseInterceptor } from './common/filters/http-exception/errors/interceptors/database.interceptor';
import { NotFoundInterceptor } from './common/filters/http-exception/errors/interceptors/notfound.interceptor';
import { UnauthorizedInterceptor } from './common/filters/http-exception/errors/interceptors/unauthorized.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(
    // app.useGlobalFilters(new HttpExceptionFilter());
    new ConflictInterceptor(),
    new DatabaseInterceptor(),
    new UnauthorizedInterceptor(),
    new NotFoundInterceptor(),
  );

  await app.listen(process.env.PORT || 3000);
}
void bootstrap();
