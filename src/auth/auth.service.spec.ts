import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import mockUsersModel from 'users/mockUsersModel';
import { UsersService } from 'users/users.service';
import { AuthService } from './auth.service';
import mockJwtService from './mockJwtService';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, AuthService, mockJwtService, mockUsersModel],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should register a user', async (done) => {
      jest
        .spyOn(userService, 'createUser')
        .mockResolvedValue({ foo: 'bar' } as never);
      jest.spyOn(userService, 'findUser').mockResolvedValue(undefined);
      const user = { name: 'ta3', email: 'tt@gmail.com', password: '1234' };
      const authData = await authService.register(user);

      expect(authData).not.toHaveProperty('password');
      expect(authData).toHaveProperty('foo', 'bar');
      expect(authData).toHaveProperty('token');
      done();
    });

    it('should thorw when email exist', async (done) => {
      jest
        .spyOn(userService, 'findUser')
        .mockResolvedValue({ id: 1, username: 'exist_user' } as never);
      const registerDto = {
        email: 'foo@bar.com',
        username: 'exist_user',
        password: '123456',
      };

      await expect(authService.register(registerDto)).rejects.toThrow(
        new BadRequestException('This email has already been used.'),
      );
      done();
    });
  });

  describe('generateToken', () => {
    it('should generateToken', () => {
      const token = authService.generateToken(1, 'foo@bar.com');
      expect(token).toBe('token');
    });
  });
});
