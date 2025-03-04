import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/database/repositories/base/base.repository';
import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { IAccountRepository } from './interfaces/account-repository.interface';

@Injectable()
export class AccountRepository
  extends BaseRepository<Account>
  implements IAccountRepository
{
  constructor(
    @InjectRepository(Account)
    public readonly repository: Repository<Account>,
  ) {
    super(repository);
  }
}
