import { JwtService } from '@nestjs/jwt';

const mockJwtService = {
  provide: JwtService,
  useValue: {
    sign: jest.fn().mockReturnValue('token'),
  },
};

export default mockJwtService;
