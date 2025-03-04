export class CreateTransactionDto {
  transactionId: string;
  date: Date;
  bookingDateTime: Date;
  valueDateTime: Date;
  status: string;
  amount: number;
  currency: string;
  description: string;
  accountId: number;
  userId: number;
}
