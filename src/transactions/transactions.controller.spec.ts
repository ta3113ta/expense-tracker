import { Test, TestingModule } from '@nestjs/testing';
import mockJwtService from 'auth/mockJwtService';
import mockTransectionsModel from './schemas/transaction.schema.mock';
import { TransactionsController } from './transactions.controller';
import mockTransectionsService from './transections.service.mock';

describe('TransactionsController', () => {
  let controller: TransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        mockTransectionsService,
        mockTransectionsModel,
        mockJwtService,
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get transection', () => {
    it('should get all transections', async () => {
      // Arrange
      const user = { user: { userId: 'some id' } };
      // Act
      const transections = await controller.findAll(user);
      // Assert
      expect(transections).toHaveProperty('success', true);
    });
  });

  describe('post transections', () => {
    it('should add the transection', async () => {
      // Arrange
      const transection = { text: 'test', amount: 20, date: new Date() };
      const userId = { user: { userId: '1234' } };
      // Act
      const transectionResult = await controller.create(transection, userId);
      // Assert
      expect(transectionResult).toHaveProperty('success', true);
    });
  });
});
