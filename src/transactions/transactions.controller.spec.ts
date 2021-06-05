import { Test, TestingModule } from '@nestjs/testing';
import mockJwtService from 'auth/mockJwtService';
import mocktransactionsModel from './schemas/transaction.schema.mock';
import { TransactionsController } from './transactions.controller';
import mocktransactionsService from './transactions.service.mock';

describe('TransactionsController', () => {
  let controller: TransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        mocktransactionsService,
        mocktransactionsModel,
        mockJwtService,
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get transaction', () => {
    it('should get all transactions', async () => {
      // Arrange
      const user = { user: { userId: 'some id' } };
      // Act
      const transactions = await controller.findAll(user);
      // Assert
      expect(transactions).toHaveProperty('success', true);
    });
  });

  describe('post transactions', () => {
    it('should add the transaction', async () => {
      // Arrange
      const transaction = { text: 'test', amount: 20, date: new Date() };
      const userId = { user: { userId: '1234' } };
      // Act
      const transactionResult = await controller.create(transaction, userId);
      // Assert
      expect(transactionResult).toHaveProperty('success', true);
    });
  });

  describe('update transaction', () => {
    it('should update the transaction', async () => {
      // Arrange
      const transactionId = 'anyId';
      const transacToUpdate = {
        amount: 20,
        text: 'buy a google',
        date: new Date(),
      };
      // Act
      const transactionResult = await controller.update(
        transactionId,
        transacToUpdate,
      );
      // Assert
      expect(transactionResult).toHaveProperty('success', true);
    });
  });
});
