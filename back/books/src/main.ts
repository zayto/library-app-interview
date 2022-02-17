import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BooksModule } from './books.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BooksModule,
    {
      logger: console,
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    },
  );
  await app.listen();
}
bootstrap();
