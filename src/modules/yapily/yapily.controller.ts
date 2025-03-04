import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { DOMAIN_ENTITY } from 'src/common/constants';
import { IYapilyService } from './interface/yapily-service.interface';
import { Request } from 'express';
@ApiTags(DOMAIN_ENTITY.YAPILY)
@Controller('yapily')
export class YapilyController {
  constructor(
    @Inject(IYapilyService) private readonly yapilyService: IYapilyService,
  ) {}

  @Get('institutions')
  getInstitutions() {
    return this.yapilyService.getInstitutions();
  }
  @Get('callback')
  authCallback(
    @Query('authState') authState: string,
    @Query('authCode') authCode: string,
  ) {
    return this.yapilyService.authCallBack(authState, authCode);
  }
  @Get('test/callback')
  testAuthCallback(
    @Query('consent') consent: string,
    @Query('user-uuid') userUUID: string,
    @Query('institution') institutionId: string,
  ) {
    return this.yapilyService.authTestCallBack(
      consent,
      userUUID,
      institutionId,
    );
  }
  @ApiParam({
    type: 'string',
    description: 'Institution Id',
    name: 'id',
  })
  @Get(':id/auth')
  getAuth(@Param('id') institutionId: string) {
    return this.yapilyService.authRequest(institutionId);
  }
 
  @ApiParam({
    type: 'string',
    description: 'Institution Id',
    name: 'id',
  })
  @Get(':id/accounts')
  getAccounts(@Param('id') institutionId: string) {
    return this.yapilyService.getAccounts(institutionId);
  }
  @ApiParam({
    type: 'string',
    description: 'Account Id',
    name: 'id',
  })
  @Get(':id/transactions')
  getTransactions(@Param('id') accountId: string) {
    return this.yapilyService.getTransactions(accountId);
  }
  // @ApiParam({
  //   type: 'string',
  //   description: 'Institution Id',
  //   name: 'id',
  // })
  // @Post(':id')
  // reAuthorize(@Param('id') institutionId: string) {
  //   return this.yapilyService.reAuthorize(institutionId);
  // }
}
