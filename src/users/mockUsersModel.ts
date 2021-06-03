import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';

const user = { email: 'ta@gmail.com', name: 'ta', password: '1234' };

// Omit password propoty
const userWithoutPassword = Object.assign({}, user);
delete userWithoutPassword.password;

const mockUsersModel = {
  provide: getModelToken(User.name),
  useValue: {
    create: jest.fn().mockReturnValue({
      ...user,
      save: jest.fn(),
    }),
    findOne: jest.fn((by: any, select: string) => {
      if (select) {
        return user;
      }
      return userWithoutPassword;
    }),
    findById: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({ success: true }),
    }),
  },
};

export default mockUsersModel;
