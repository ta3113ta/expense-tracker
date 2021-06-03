import { Test, TestingModule } from '@nestjs/testing';
import mockUsersModel from './mockUsersModel';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, mockUsersModel],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('register new user', () => {
    it('should create user', async () => {
      const user = { name: 'ta', email: 'gg@gmail.com', password: '1234' };
      const result = await userService.createUser(user);

      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('email');
      expect(result).not.toHaveProperty('password');
    });
  });

  describe('find user', () => {
    it('should found a user with out password propoty', async () => {
      const user = { email: 'ta@gmail.com', name: 'ta' };
      const userResult = await userService.findUser({ email: user.email });

      expect(userResult).toStrictEqual(user);
      expect(userResult).not.toHaveProperty('password');
    });
    it('should be return user and password', async () => {
      const user = { email: 'ta@gmil.com', name: 'ta' };
      const userResult = await userService.findUserPassword({
        email: user.email,
      });

      expect(userResult).toHaveProperty('password');
    });
  });
});
