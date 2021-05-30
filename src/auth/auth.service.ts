import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: any) {
    const user = await this.usersService.findUser(registerDto.email);
    if (user) {
      throw new BadRequestException('This email has already been used.');
    }

    const profile: any = await this.usersService.createUser(registerDto);
    const token = this.generateToken(profile.id, profile.email);
    return { ...profile, token };
  }

  generateToken(userId: number, email: string) {
    return this.jwtService.sign({ userId, email });
  }
}
