import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Register the new user
   */
  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findUser({ email: registerDto.email });
    if (user) {
      throw new BadRequestException('This email has already been used.');
    }

    const profile: any = await this.usersService.createUser(registerDto);
    const token = this.generateToken(profile.id, profile.email);

    return { ...profile, token };
  }

  /**
   * Login with email and password
   * return a user profile and token
   */
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    const token = this.generateToken(user.id, user.email);

    return { ...user, token };
  }

  /**
   * Validate with email and password
   * return user profile without password
   */
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findUserPassword({ email });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new BadRequestException('Invalid password');
    }

    return omit(user, 'password');
  }

  /**
   * Generate Token with userid and email
   */
  generateToken(userId: number, email: string) {
    return this.jwtService.sign({ userId, email });
  }
}
