import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consent } from './entities/consent.entity';
import { IConsentService } from './interfaces/consent.interface';
import { IConsentRepository } from './repositories/interfaces/consent-repository.interface';
import { ConsentRepository } from './repositories/consent.repository';
import { ConsentService } from './consent.service';
import { UserModule } from '../user/user.module';
import { ConsentController } from './consents.controller';

export const consentEntities = [Consent];

export const consentRepositoryProvider = [
  {
    provide: IConsentRepository,
    useClass: ConsentRepository,
  },
];

const consentServiceProvider = [
  {
    provide: IConsentService,
    useClass: ConsentService,
  },
];
@Module({
  controllers: [ConsentController],
  imports: [TypeOrmModule.forFeature([...consentEntities]), UserModule],
  providers: [...consentRepositoryProvider, ...consentServiceProvider],
  exports: [...consentServiceProvider],
})
export class ConsentModule {}
