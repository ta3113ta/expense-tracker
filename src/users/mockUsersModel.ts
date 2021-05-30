import { getModelToken } from '@nestjs/mongoose';
import { User } from './users.schema';

const mockUsersModel = {
  provide: getModelToken(User.name),
  useValue: {
    create: jest.fn().mockReturnValue({
      name: 'ta',
      email: 'gg@gmail.com',
      password: '1234',
      save: jest.fn(),
    }),
    findOne: jest.fn().mockReturnValue({ email: 'ta@gmail.com', name: 'ta' }),
  },
};

export default mockUsersModel;
