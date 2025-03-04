import { BaseEntity } from 'src/common/entities/base.entity';
import { Account } from 'src/modules/accounts/entities/account.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
@Entity('transactions', { schema: 'public' })
export class Transaction extends BaseEntity {
  @Column('character varying', { name: 'account_id', nullable: false })
  accountId: number;
  @Column('character varying', { nullable: false })
  description: string;
  @Column('character varying', { nullable: false })
  currency: string;
  @Column('float', { nullable: false })
  amount: number;
  @Column('character varying', { nullable: false })
  status: string;
  @Column('timestamp with time zone', {
    name: 'value_date_time',
    nullable: false,
  })
  valueDateTime: Date;
  @Column('timestamp with time zone', {
    name: 'booking_date_time',
    nullable: false,
  })
  bookingDateTime: Date;
  @Column('timestamp with time zone', { nullable: false })
  date: Date;
  @Column('character varying', { name: 'transaction_id', nullable: false })
  transactionId: string;
  @Column('integer', {
    name: 'user_id',
    nullable: false,
  })
  userId: number;
  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
  @ManyToOne(() => Account, (account) => account.transactions)
  @JoinColumn({ name: 'account_id', referencedColumnName: 'id' })
  account: Account;
}
