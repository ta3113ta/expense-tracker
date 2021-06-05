import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsNotIn, IsNumber, IsString } from 'class-validator';
import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @IsNumber()
  @IsNotIn([0])
  amount: number;

  @IsString()
  text: string;

  @IsDateString()
  date: Date;
}
