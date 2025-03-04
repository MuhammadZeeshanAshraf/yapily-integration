import { CreateAccountDto } from '../dto/create-account.dto';
import { Account } from '../entities/account.entity';
export const IAccountService = Symbol('IAccountService');

export interface IAccountService {
  // findOneByUserId(userId: number): Promise<Account>;
  create(dto: CreateAccountDto): Promise<Account>;
  createBulk(dto: CreateAccountDto[]): Promise<Account[]>;
  // updateOne(id: number, dto: UpdateAccountDto);
  findOneByAccountId(id: string): Promise<Account>;
  findAll(): Promise<Account[]>;
}
