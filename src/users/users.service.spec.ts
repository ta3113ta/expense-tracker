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
    it('should create user', async (done) => {
      const user = { name: 'ta', email: 'gg@gmail.com', password: '1234' };
      const result = await userService.createUser(user);
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('email');
      expect(result).not.toHaveProperty('password');
      done();
    });
  });

  describe('find user', () => {
    it('should found a user by email', async () => {
      const user = { email: 'ta@gmail.com', name: 'ta' };
      const userResult = await userService.findUser('ta@gmail.com');
      expect(userResult).toStrictEqual(user);
    });
  });
});
