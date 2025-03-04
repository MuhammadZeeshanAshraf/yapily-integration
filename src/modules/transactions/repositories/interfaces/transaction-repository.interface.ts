import { IBaseRepository } from 'src/common/database/repositories/interfaces/base.interface';
import { Transaction } from '../../entities/transaction.entity';

export const ITransactionRepository = Symbol('ITransactionRepository');

type DefaultEntity = Transaction;
export interface ITransactionRepository<T = DefaultEntity>
  extends IBaseRepository<T> {}
