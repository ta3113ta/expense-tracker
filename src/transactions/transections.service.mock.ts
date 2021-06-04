import { TransactionsService } from './transactions.service';

const mockTransectionsService = {
  provide: TransactionsService,
  useValue: {
    findAll: jest.fn().mockResolvedValue({ success: true }),

    create: jest.fn().mockResolvedValue({ success: true }),
  },
};

export default mockTransectionsService;
