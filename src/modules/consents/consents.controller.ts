import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DOMAIN_ENTITY } from 'src/common/constants';
import { IConsentService } from './interfaces/consent.interface';

@ApiTags(DOMAIN_ENTITY.CONSENTS)
@Controller('consent')
export class ConsentController {
  constructor(
    @Inject(IConsentService) private readonly consentService: IConsentService,
  ) {}

  @Get('institutions')
  getInstitution() {
    return this.consentService.getInstitutions();
  }
}
