import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      /* type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',*/
      url: 'postgres://sarr.mamadou1296:DtJWxm1U9bKh@ep-silent-sun-612487.eu-central-1.aws.neon.tech/shop',
      /*database: 'users',*/
      entities: [User],
      synchronize: true,
      ssl: true,
    }),
    UsersModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
