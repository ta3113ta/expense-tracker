import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { UserGuard } from 'users/user.guard';
import { ValidationPipe } from 'validation.pipe';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(UserGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body(new ValidationPipe()) createTransactionDto: CreateTransactionDto,
    @Request() req,
  ) {
    const { userId } = req.user;
    const transection = await this.transactionsService.create(
      createTransactionDto,
      userId,
    );
    return { success: true, data: transection };
  }

  @UseGuards(UserGuard)
  @Get()
  async findAll(@Request() req) {
    const { userId } = req.user;
    const transections = await this.transactionsService.findAll(userId);
    return { success: true, count: transections.length, data: transections };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @UseGuards(UserGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateTransactionDto: UpdateTransactionDto,
  ) {
    const transaction = await this.transactionsService.update(
      id,
      updateTransactionDto,
    );
    return { success: true, data: transaction };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
