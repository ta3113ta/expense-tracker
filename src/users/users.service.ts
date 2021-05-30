import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { omit } from 'lodash';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(user: any): Promise<any> {
    const result = await this.userModel.create(user);
    await result.save();
    return omit(result, ['password']);
  }

  async findUser(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }
}
