import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'auth/auth.service';
import mockJwtService from 'auth/mockJwtService';
import mockUsersModel from './mockUsersModel';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [AuthService, UsersService, mockJwtService, mockUsersModel],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('profile', () => {
    it('should get user info', async () => {
      const userProfile = await controller.profile({
        user: { userId: '1234' },
      });
      expect(userProfile).toHaveProperty('success', true);
    });
  });
});
