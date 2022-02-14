import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UsersModule } from './users.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  /*const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3002,
      }
    },
    {
      logger: console,
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    },
  );
  */
  const microservice = app.connectMicroservice({
    transport: Transport.TCP,
  });

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
