import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DOMAIN_ENTITY } from 'src/common/constants';
import { ITransactionService } from './interfaces/transaction.interface';
import { GetTransactionsDto } from './dto/get-transactions.dto';

@ApiTags(DOMAIN_ENTITY.TRANSACTIONS)
@Controller('transaction')
export class TransactionController {
  constructor(
    @Inject(ITransactionService)
    private readonly transactionService: ITransactionService,
  ) {}

  @Get('')
  getUserTransactions(@Query() getTransactionDto: GetTransactionsDto) {
    return this.transactionService.findAll(getTransactionDto);
  }
}
