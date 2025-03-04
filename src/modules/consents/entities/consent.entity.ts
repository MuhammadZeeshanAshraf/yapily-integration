import { BaseEntity } from 'src/common/entities/base.entity';
import { Account } from 'src/modules/accounts/entities/account.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
@Entity('consents', { schema: 'public' })
export class Consent extends BaseEntity {
  @Column('integer', { name: 'user_id', nullable: false })
  userId: number;
  @Column('character varying', { name: 'consent_token', nullable: true })
  consentToken: string;
  @Column('character varying', { name: 'consent_id', nullable: true })
  consentId: string;
  @Column('character varying', {
    name: 'institution_id',
    nullable: false,
  })
  institutionId: string;

  @ManyToOne(() => User, (user) => user.consents)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
  @OneToMany(() => Account, (account) => account.consent)
  accounts: Account[];
}
