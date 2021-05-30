import { Test, TestingModule } from '@nestjs/testing';
import mockUsersModel from 'users/mockUsersModel';
import { UsersService } from 'users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import mockJwtService from './mockJwtService';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UsersService, mockUsersModel, mockJwtService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
