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
  Query,
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

  @UseGuards(UserGuard)
  @Get('search')
  async search(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Request() req,
  ) {
    const { userId } = req.user;
    const transactions = await this.transactionsService.find({
      user: userId,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate).setHours(23, 59, 59, 999),
      },
    });

    return { success: true, count: transactions.length, data: transactions };
  }

  @UseGuards(UserGuard)
  @Get(':id')
  async findOne() {
    return { success: true };
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

  @UseGuards(UserGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.transactionsService.remove(id);
    return { success: true, data: {} };
  }
}
