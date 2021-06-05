import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransectionDocument } from './schemas/transaction.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transectionModel: Model<TransectionDocument>,
  ) {}

  /**
   * Create the new transection
   */
  async create(createTransactionDto: CreateTransactionDto, userId: string) {
    const transection = await this.transectionModel.create({
      ...createTransactionDto,
      user: userId,
    });
    return transection;
  }

  /**
   * Find all transections with user id
   */
  async findAll(userId: string) {
    const transections = await this.transectionModel.find({
      user: userId,
    } as FilterQuery<TransectionDocument>);

    return transections;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  /**
   * Update the transaction
   */
  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const { amount, text, date } = updateTransactionDto;
    const transaction = await this.transectionModel.findByIdAndUpdate(
      id,
      { amount, text, date },
      { new: true },
    );

    if (!transaction) {
      throw new NotFoundException('No transaction found');
    }

    return transaction;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
