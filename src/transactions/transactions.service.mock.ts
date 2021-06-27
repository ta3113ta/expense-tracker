import { TransactionsService } from './transactions.service';

const mockTransectionsService = {
  provide: TransactionsService,
  useValue: {
    findAll: jest.fn().mockResolvedValue({ success: true }),

    find: jest.fn().mockResolvedValue([{}]),

    create: jest.fn().mockResolvedValue({ success: true }),

    update: jest.fn().mockResolvedValue({ success: true }),
  },
};

export default mockTransectionsService;
