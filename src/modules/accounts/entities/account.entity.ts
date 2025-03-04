import { BaseEntity } from 'src/common/entities/base.entity';
import { Consent } from 'src/modules/consents/entities/consent.entity';
import { Transaction } from 'src/modules/transactions/entities/transaction.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
@Entity('accounts', { schema: 'public' })
export class Account extends BaseEntity {
  @Column('character varying', { name: 'account_id', nullable: false })
  accountId: string;
  @Column('character varying', { nullable: false })
  type: string;
  @Column('character varying', {
    name: 'institution_id',
    nullable: false,
  })
  institutionId: string;
  @Column('integer', {
    name: 'consent_id',
    nullable: false,
  })
  consentId: number;
  @Column('integer', {
    name: 'user_id',
    nullable: false,
  })
  userId: number;
  @Column('float', {
    nullable: false,
  })
  balance: number;
  @ManyToOne(() => User, (user) => user.accounts)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
  @ManyToOne(() => Consent, (consent) => consent.accounts)
  @JoinColumn({ name: 'consent_id', referencedColumnName: 'id' })
  consent: Consent;
  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];
}
