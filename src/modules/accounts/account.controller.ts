import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DOMAIN_ENTITY } from 'src/common/constants';
import { IAccountService } from './interfaces/account.interface';

@ApiTags(DOMAIN_ENTITY.ACCOUNTS)
@Controller('account')
export class AccountController {
  constructor(
    @Inject(IAccountService) private readonly accountService: IAccountService,
  ) {}

  @Get('')
  getAccounts() {
    return this.accountService.findAll();
  }
}
