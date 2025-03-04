import { IBaseRepository } from 'src/common/database/repositories/interfaces/base.interface';
import { Consent } from '../../entities/consent.entity';

export const IConsentRepository = Symbol('IConsentRepository');

type DefaultEntity = Consent;
export interface IConsentRepository<T = DefaultEntity>
  extends IBaseRepository<T> {}
