import { IBaseRepository } from 'src/common/database/repositories/interfaces/base.interface';
import { Account } from '../../entities/account.entity';

export const IAccountRepository = Symbol('IAccountRepository');

type DefaultEntity = Account;
export interface IAccountRepository<T = DefaultEntity>
  extends IBaseRepository<T> {}
