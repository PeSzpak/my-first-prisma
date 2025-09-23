import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConflictInterceptor } from './common/filters/http-exception/errors/interceptors/conflict.interceptor';
import { DatabaseInterceptor } from './common/filters/http-exception/errors/interceptors/database.interceptor';
import { NotFoundInterceptor } from './common/filters/http-exception/errors/interceptors/notfound.interceptor';
import { UnauthorizedInterceptor } from './common/filters/http-exception/errors/interceptors/unauthorized.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Simple blog')
    .setDescription('The Simple Blog API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(
    new ConflictInterceptor(),
    new DatabaseInterceptor(),
    new UnauthorizedInterceptor(),
    new NotFoundInterceptor(),
  );

  await app.listen(process.env.PORT || 3000);
}
void bootstrap();
