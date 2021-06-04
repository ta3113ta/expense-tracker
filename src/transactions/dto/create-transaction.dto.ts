import { IsString, IsDateString, IsNumber, IsNotIn } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  text: string;

  @IsNumber()
  @IsNotIn([0])
  amount: number;

  @IsDateString()
  date: Date;
}
