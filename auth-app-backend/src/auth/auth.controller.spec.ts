import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  // Mock AuthService
  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return access token on successful login', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password',
      };

      mockAuthService.login.mockResolvedValueOnce({ access_token: 'mockToken' });

      const result = await controller.login(loginDto);

      expect(result).toEqual({ access_token: 'mockToken' });
      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('register', () => {
    it('should return user data on successful registration', async () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password',
      };

      const mockUser = {
        _id: '1',
        email: 'test@example.com',
        name: 'Test User',
      };

      mockAuthService.register.mockResolvedValueOnce(mockUser);

      const result = await controller.register(registerDto);

      expect(result).toEqual(mockUser);
      expect(mockAuthService.register).toHaveBeenCalledWith(registerDto);
    });
  });
});
