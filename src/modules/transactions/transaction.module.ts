import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { ITransactionService } from './interfaces/transaction.interface';
import { ITransactionRepository } from './repositories/interfaces/transaction-repository.interface';
import { TransactionRepository } from './repositories/transaction.repository';
import { TransactionService } from './transaction.service';
import { UserModule } from '../user/user.module';
import { TransactionController } from './transaction.controller';

export const transactionEntities = [Transaction];

export const transactionRepositoryProvider = [
  {
    provide: ITransactionRepository,
    useClass: TransactionRepository,
  },
];

const transactionServiceProvider = [
  {
    provide: ITransactionService,
    useClass: TransactionService,
  },
];
@Module({
  controllers: [TransactionController],
  imports: [TypeOrmModule.forFeature([...transactionEntities]), UserModule],
  providers: [...transactionRepositoryProvider, ...transactionServiceProvider],
  exports: [...transactionServiceProvider],
})
export class TransactionModule {}
