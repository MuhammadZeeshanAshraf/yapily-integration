import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetTransactionsDto {
  @ApiProperty({ required: false })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  accountId: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  accountIdYapily: string;
}
