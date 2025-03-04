import { Module } from '@nestjs/common';
import { IYapilyService } from './interface/yapily-service.interface';
import { YapilyService } from './yapily.service';
import { YapilyController } from './yapily.controller';
import { UserModule } from '../user/user.module';
import { ConsentModule } from '../consents/consent.module';
import { TransactionModule } from '../transactions/transaction.module';
import { AccountModule } from '../accounts/account.module';
const yapilyServiceProvider = [
  {
    provide: IYapilyService,
    useClass: YapilyService,
  },
];
@Module({
  imports: [UserModule, ConsentModule, TransactionModule, AccountModule],
  controllers: [YapilyController],
  providers: [...yapilyServiceProvider],
  exports: [...yapilyServiceProvider],
})
export class YapilyModule {}
