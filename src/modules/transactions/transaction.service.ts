import { Inject, Injectable } from '@nestjs/common';

import { ITransactionService } from './interfaces/transaction.interface';

import { ITransactionRepository } from './repositories/interfaces/transaction-repository.interface';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FindOptionsWhere, UpdateResult } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { IUserService } from '../user/interfaces/user.interface';
import { GetTransactionsDto } from './dto/get-transactions.dto';
import { FindOptionsBuilder } from 'src/common/database/builder-pattern/find-options.builder';

@Injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @Inject(ITransactionRepository)
    private readonly transactionRepository: ITransactionRepository,
    private readonly configService: ConfigService,
    @Inject(IUserService)
    private readonly userService: IUserService,
  ) {}

  async createBulk(
    dto: CreateTransactionDto[],
    userId: number,
  ): Promise<Transaction[]> {
    const existingTransactions = await this.transactionRepository.find(
      { userId },
      { transactionId: true },
    );
    const existingIds = existingTransactions.map((t) => t.transactionId);
    const updates: Promise<UpdateResult>[] = [];
    const newTransactions: Transaction[] = [];
    dto.forEach((data) => {
      if (existingIds.includes(data.transactionId)) {
        updates.push(
          this.transactionRepository.update(
            { transactionId: data.transactionId },
            data,
          ),
        );
      } else {
        const transaction = new Transaction();
        transaction.userId = data.userId;
        transaction.accountId = data.accountId;
        transaction.description = data.description;
        transaction.amount = data.amount;
        transaction.status = data.status;
        transaction.valueDateTime = data.valueDateTime;
        transaction.transactionId = data.transactionId;
        transaction.bookingDateTime = data.bookingDateTime;
        transaction.currency = data.currency;
        transaction.date = data.date;
        newTransactions.push(transaction);
      }
    });
    await Promise.all(updates);
    return await this.transactionRepository.bulkCreate(newTransactions);
  }
  async findAll(dto: GetTransactionsDto): Promise<Transaction[]> {
    const { accountId, accountIdYapily } = dto;
    if (!accountId &&!accountIdYapily) {
      throw new Error('At least one of accountId or accountIdYapily must be provided');
    }
    const email = this.configService.get('TEST_EMAIL');

    const user = await this.userService.findOne(email);
    if (!user) {
      throw new Error('User not found');
    }
    const where: FindOptionsWhere<Transaction> = {};
    accountId && (where.accountId = accountId);
    accountIdYapily && (where.account = { accountId: accountIdYapily });
    const findOptions = new FindOptionsBuilder<Transaction>()
      .where(where)
      .relations({
        account: true,
      })
      .order({ id: 'DESC' })
      .build();
    return this.transactionRepository.findManyWithBuilderOption(findOptions);
  }
}
