import { Test, TestingModule } from '@nestjs/testing';
import mockTransectionsModel from './schemas/transaction.schema.mock';
import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsService, mockTransectionsModel],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('shoud found transections', async () => {
      // Arrange
      const userId = 'some user id';
      // Act
      const transections = await service.findAll(userId);
      // Assert
      expect(transections.length).toBeGreaterThan(0);
    });
  });
});
