import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserGuard } from './user.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(UserGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async profile(@Request() req) {
    const { userId } = req.user;
    const user = await this.userService.findUserById(userId);
    return { success: true, user };
  }
}
