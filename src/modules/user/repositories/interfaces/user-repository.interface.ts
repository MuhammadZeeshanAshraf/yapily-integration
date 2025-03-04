import { IBaseRepository } from 'src/common/database/repositories/interfaces/base.interface';
import { User } from '../../entities/user.entity';

export const IUserRepository = Symbol('IUserRepository');

type DefaultEntity = User;
export interface IUserRepository<T = DefaultEntity>
  extends IBaseRepository<T> {}
