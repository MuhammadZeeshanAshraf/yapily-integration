import { BaseEntity } from 'src/common/entities/base.entity';
import { Account } from 'src/modules/accounts/entities/account.entity';
import { Consent } from 'src/modules/consents/entities/consent.entity';
import { Transaction } from 'src/modules/transactions/entities/transaction.entity';
import { Column, Entity, OneToMany } from 'typeorm';
@Entity('users', { schema: 'public' })
export class User extends BaseEntity {
  @Column('character varying', { nullable: false })
  name: string;
  @Column('character varying', { nullable: false, unique: true })
  email: string;
  @Column('character varying', {
    name: 'application_user_id',
    nullable: true,
    unique: true,
  })
  applicationUserId: string;
  @Column('character varying', {
    name: 'yapily_uuid',
    nullable: true,
    unique: true,
  })
  yapilyUUID: string;
  @OneToMany(() => Consent, (consent) => consent.user)
  consents: Consent;
  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];
  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
