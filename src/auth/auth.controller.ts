import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userProfile: any = await this.authService.register(registerDto);
    res
      .header('x-auth-token', userProfile.token)
      .header('access-control-expose-headers', 'x-auth-token')
      .json({
        success: true,
        token: userProfile.token,
        user: {
          id: userProfile.id,
          name: userProfile.name,
          email: userProfile.email,
        },
      });
  }
}
