import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UsersModule } from './users.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      logger: console,
      transport: Transport.REDIS,
      options: {
        url: `redis://${process.env.REDIS_HOST}:6379`,
      },
    },
  );
  await app.listen();
}
bootstrap();
