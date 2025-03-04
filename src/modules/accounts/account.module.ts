import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { IAccountService } from './interfaces/account.interface';
import { IAccountRepository } from './repositories/interfaces/account-repository.interface';
import { AccountRepository } from './repositories/account.repository';
import { AccountService } from './account.service';
import { UserModule } from '../user/user.module';
import { AccountController } from './account.controller';

export const accountEntities = [Account];

export const accountRepositoryProvider = [
  {
    provide: IAccountRepository,
    useClass: AccountRepository,
  },
];

const accountServiceProvider = [
  {
    provide: IAccountService,
    useClass: AccountService,
  },
];
@Module({
  controllers: [AccountController],
  imports: [TypeOrmModule.forFeature([...accountEntities]), UserModule],
  providers: [...accountRepositoryProvider, ...accountServiceProvider],
  exports: [...accountServiceProvider],
})
export class AccountModule {}
