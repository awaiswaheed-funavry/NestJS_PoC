import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './users/users.controller';
import { UserService } from './users/users.service';
import { DB, DBFactory } from './DB';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    UserService,
    {
      provide: DB,
      useFactory: DBFactory,
    },
  ],
})
export class AppModule {}
