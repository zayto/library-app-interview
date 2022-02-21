import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          { name: 'USERS_SERVICE', transport: Transport.REDIS },
        ]),
        ClientsModule.register([
          { name: 'BOOKS_SERVICE', transport: Transport.REDIS },
        ]),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should call the default route handler (alive)"', async () => {
      expect(await appController.alive()).toBe('Gateway is working!');
    });
  });
});
