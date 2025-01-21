import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const ALLOW_ORIGIN_HEADER = 'http://localhost:3000';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: ALLOW_ORIGIN_HEADER, credentials: true },
  });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
