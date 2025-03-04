import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IUserService } from './interfaces/user.interface';
import { IUserRepository } from './repositories/interfaces/user-repository.interface';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { YapilyModule } from '../yapily/yapily.module';

export const userEntities = [User];

export const userRepositoryProvider = [
  {
    provide: IUserRepository,
    useClass: UserRepository,
  },
];

const userServiceProvider = [
  {
    provide: IUserService,
    useClass: UserService,
  },
];
@Module({
  imports: [TypeOrmModule.forFeature([...userEntities])],
  controllers: [UserController],
  providers: [...userRepositoryProvider, ...userServiceProvider],
  exports: [...userServiceProvider],
})
export class UserModule {}
