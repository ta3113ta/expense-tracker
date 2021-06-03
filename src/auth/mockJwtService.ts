import { JwtService } from '@nestjs/jwt';

const mockJwtService = {
  provide: JwtService,
  useValue: {
    sign: jest.fn().mockReturnValue('token'),
    verify: jest.fn().mockReturnValue('eiei'),
  },
};

export default mockJwtService;
