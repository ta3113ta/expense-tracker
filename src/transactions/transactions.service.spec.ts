import { NotFoundException } from '@nestjs/common';
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

  describe('query', () => {
    it.todo('should query this month');
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

  describe('create', () => {
    it('should create a new transection', async () => {
      // Arrage
      const transection = {
        text: 'buy a google company',
        amount: 20,
        date: new Date(),
      };
      const userId = 'some userid';
      // Act
      const transectionResult = await service.create(transection, userId);
      // Assert
      expect(transectionResult).toHaveProperty('amount');
    });
  });

  describe('patch', () => {
    it('should update the transection', async () => {
      // Arrange
      const transectionId = '1';
      const transectionUpdate = {
        amount: 20,
        text: 'sell a google',
        date: new Date(),
      };
      // Act
      const transection = await service.update(
        transectionId,
        transectionUpdate,
      );
      // Assert
      expect(transection).toHaveProperty('amount', 20);
    });
    it('should throw exception when can not found transection', async () => {
      // Arrange
      const transactionId = '2';
      const updateTransactionDto = {
        amount: 20,
        text: 'test',
        date: new Date(),
      };
      // Assert
      await expect(
        service.update(transactionId, updateTransactionDto),
      ).rejects.toThrow(new NotFoundException('No transaction found'));
    });
  });
});
