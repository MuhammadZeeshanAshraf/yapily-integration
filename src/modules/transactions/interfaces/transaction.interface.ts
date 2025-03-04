import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { GetTransactionsDto } from '../dto/get-transactions.dto';
import { Transaction } from '../entities/transaction.entity';
export const ITransactionService = Symbol('ITransactionService');

export interface ITransactionService {
  createBulk(
    dto: CreateTransactionDto[],
    userId: number,
  ): Promise<Transaction[]>;
  findAll(dto: GetTransactionsDto): Promise<Transaction[]>;
}
