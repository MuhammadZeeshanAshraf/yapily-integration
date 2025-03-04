import { PartialType } from '@nestjs/mapped-types';
import { CreateConsentDto } from './create-consent.dto';

export class UpdateConsentDto extends PartialType(CreateConsentDto) {}
