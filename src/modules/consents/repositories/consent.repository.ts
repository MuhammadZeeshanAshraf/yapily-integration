import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/database/repositories/base/base.repository';
import { Repository } from 'typeorm';
import { Consent } from '../entities/consent.entity';
import { IConsentRepository } from './interfaces/consent-repository.interface';

@Injectable()
export class ConsentRepository
  extends BaseRepository<Consent>
  implements IConsentRepository
{
  constructor(
    @InjectRepository(Consent)
    public readonly repository: Repository<Consent>,
  ) {
    super(repository);
  }
}
