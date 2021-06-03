import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { omit } from 'lodash';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Create user, hash password
   * and then store to the database
   */
  async createUser(user: {
    name: string;
    email: string;
    password: string;
  }): Promise<any> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;

    const result = await this.userModel.create(user);
    await result.save();
    return omit(result, ['password']);
  }

  /**
   * Find User name without password propoty
   * and return user data in database
   */
  async findUser(by: { email: string }) {
    const user = await this.userModel.findOne(by);
    return user;
  }

  /**
   * Find user and return with password propoty
   */
  async findUserPassword(by: { email: string }) {
    const select = 'name email password';
    const user = await this.userModel.findOne(by, select);
    return user;
  }
}
