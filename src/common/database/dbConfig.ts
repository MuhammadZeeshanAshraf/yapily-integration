import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import * as path from 'path';
import { Account } from 'src/modules/accounts/entities/account.entity';
import { Consent } from 'src/modules/consents/entities/consent.entity';
import { Transaction } from 'src/modules/transactions/entities/transaction.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();
const dataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [User, Account, Transaction, Consent],
  synchronize: false,
  logging: false,
  migrations: [path.join(__dirname, './migrations/*{.ts,.js}')],
  migrationsTableName: 'migrations',
});

export default dataSource;
