import { getModelToken } from '@nestjs/mongoose';
import { Transaction } from './transaction.schema';

const mockTransectionsModel = {
  provide: getModelToken(Transaction.name),
  useValue: {
    find: jest.fn().mockResolvedValue([{}]),

    create: jest.fn().mockResolvedValue({
      amount: 20,
    }),

    findByIdAndUpdate: jest.fn((...args: any[]) => {
      if (args[0] === '1') {
        return { amount: 20 };
      }
    }),
  },
};

export default mockTransectionsModel;
