import { Inject, Injectable } from '@nestjs/common';

import { IConsentService } from './interfaces/consent.interface';

import { IConsentRepository } from './repositories/interfaces/consent-repository.interface';
import { Consent } from './entities/consent.entity';
import { UpdateConsentDto } from './dto/update-consent.dto';
import { CreateConsentDto } from './dto/create-consent.dto';
import { RESPONSE_MESSAGES } from 'src/common/constants';
import { ConfigService } from '@nestjs/config';
import { IUserService } from '../user/interfaces/user.interface';

@Injectable()
export class ConsentService implements IConsentService {
  constructor(
    @Inject(IConsentRepository)
    private readonly consentRepository: IConsentRepository,
    @Inject(IUserService)
    private readonly userService: IUserService,
    private readonly configService: ConfigService,
  ) {}

  findOne(id: number): Promise<Consent> {
    return this.consentRepository.findOne({ id });
  }
  findOneByInstitutionId(id: string, userId: number): Promise<Consent> {
    return this.consentRepository.findOne({ institutionId: id, userId });
  }
  async updateOne(id: number, dto: UpdateConsentDto) {
    await this.consentRepository.update({ id }, dto);
    return RESPONSE_MESSAGES.UPDATED;
  }
  async create(dto: CreateConsentDto): Promise<Consent> {
    const consent = new Consent();
    consent.userId = dto.userId;
    consent.institutionId = dto.institutionId;
    consent.consentToken = dto.consentToken;
    consent.consentId = dto.consentId;
    return await this.consentRepository.create(consent);
  }
  async getInstitutions(): Promise<string[]> {
    const email = this.configService.get('TEST_EMAIL');

    const user = await this.userService.findOne(email);
    if (!user) {
      throw new Error('User not found');
    }
    const consents = await this.consentRepository.find({ userId: user.id });
    return consents.map((c) => c.institutionId);
  }
}
