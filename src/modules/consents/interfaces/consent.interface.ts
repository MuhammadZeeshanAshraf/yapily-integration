import { CreateConsentDto } from '../dto/create-consent.dto';
import { UpdateConsentDto } from '../dto/update-consent.dto';
import { Consent } from '../entities/consent.entity';

export const IConsentService = Symbol('IConsentService');

export interface IConsentService {
  create(dto: CreateConsentDto): Promise<Consent>;
  updateOne(id: number, dto: UpdateConsentDto);
  findOneByInstitutionId(id: string, userId: number): Promise<Consent>;
  getInstitutions(): Promise<string[]>;
  findOne(id: number): Promise<Consent>;
}
