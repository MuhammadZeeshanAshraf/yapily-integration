import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/database/repositories/base/base.repository';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { ITransactionRepository } from './interfaces/transaction-repository.interface';

@Injectable()
export class TransactionRepository
  extends BaseRepository<Transaction>
  implements ITransactionRepository
{
  constructor(
    @InjectRepository(Transaction)
    public readonly repository: Repository<Transaction>,
  ) {
    super(repository);
  }
}
