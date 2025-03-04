import { Inject, Injectable } from '@nestjs/common';

import { IAccountService } from './interfaces/account.interface';

import { IAccountRepository } from './repositories/interfaces/account-repository.interface';
import { Account } from './entities/account.entity';
import { UpdateAccountDto } from './dto/update-account.dto';
import { CreateAccountDto } from './dto/create-account.dto';
import { RESPONSE_MESSAGES } from 'src/common/constants';
import { UpdateResult } from 'typeorm';
import { IUserService } from '../user/interfaces/user.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccountService implements IAccountService {
  constructor(
    @Inject(IAccountRepository)
    private readonly accountRepository: IAccountRepository,
    @Inject(IUserService)
    private readonly userService: IUserService,
    private readonly configService: ConfigService,
  ) {}
  findOneByAccountId(accountId: string): Promise<Account> {
    return this.accountRepository.findOne({ accountId });
  }
  async create(dto: CreateAccountDto): Promise<Account> {
    const account = new Account();
    account.userId = dto.userId;
    account.institutionId = dto.institutionId;
    return await this.accountRepository.create(account);
  }
  async createBulk(dto: CreateAccountDto[]): Promise<Account[]> {
    const accounts = dto.map((data) => {
      const acc = new Account();
      acc.userId = data.userId;
      acc.institutionId = data.institutionId;
      acc.consentId = data.consentId;
      acc.balance = data.balance;
      acc.type = data.type;
      acc.accountId = data.accountId;

      return acc;
    });
    return await this.accountRepository.bulkCreate(accounts);
  }
  async findAll(): Promise<Account[]> {
    const email = this.configService.get('TEST_EMAIL');

    const user = await this.userService.findOne(email);
    if (!user) {
      throw new Error('User not found');
    }
    return this.accountRepository.find({ userId: user.id });
  }
}
