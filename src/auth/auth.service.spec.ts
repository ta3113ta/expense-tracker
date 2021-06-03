import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import mockUsersModel from 'users/mockUsersModel';
import { UsersService } from 'users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import mockJwtService from './mockJwtService';
import * as bcrypt from 'bcrypt';

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
    it('should register a user', async () => {
      jest
        .spyOn(userService, 'createUser')
        .mockResolvedValue({ foo: 'bar' } as never);
      jest.spyOn(userService, 'findUser').mockResolvedValue(undefined);

      const user = { name: 'ta3', email: 'tt@gmail.com', password: '1234' };
      const authData = await authService.register(user);

      expect(authData).not.toHaveProperty('password');
      expect(authData).toHaveProperty('foo', 'bar');
      expect(authData).toHaveProperty('token');
    });

    it('should thorw when email exist', async () => {
      jest
        .spyOn(userService, 'findUser')
        .mockResolvedValue({ id: 1, username: 'exist_user' } as never);

      const registerDto = {
        email: 'foo@bar.com',
        name: 'exist_user',
        password: '123456',
      };

      await expect(authService.register(registerDto)).rejects.toThrow(
        new BadRequestException('This email has already been used.'),
      );
    });
  });

  describe('login', () => {
    it('should return user profile when login successful', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue('something' as never);

      const loginDto: LoginDto = { email: 'test@gmail.com', password: '1234' };
      const authData = await authService.login(loginDto);

      expect(authData).not.toHaveProperty('password');
      expect(authData).toHaveProperty('token', 'token');
    });
  });

  describe('validate user', () => {
    it('should validate user password', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue('something' as never);

      const email = 'test@gmail.com';
      const user = await authService.validateUser(email, '12345678');

      expect(user).not.toHaveProperty('password');
      expect(user).toHaveProperty('email');
    });
  });

  describe('generateToken', () => {
    it('should generateToken', () => {
      const token = authService.generateToken(1, 'foo@bar.com');
      expect(token).toBe('token');
    });
  });
});
