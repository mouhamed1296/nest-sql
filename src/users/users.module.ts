import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { HashService } from 'src/shared/hash.service';
import { GenerateService } from 'src/shared/generate.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, HashService, GenerateService],
  controllers: [UsersController],
})
export class UsersModule {}
