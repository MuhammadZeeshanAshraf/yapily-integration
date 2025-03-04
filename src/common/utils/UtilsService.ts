import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UtilsService {
  constructor(public configService: ConfigService) {}

  getEnvironmentVariable<T>(key: string, defaultValue: T = undefined): T {
    return this.configService.get<T>(key) || defaultValue;
  }
}
