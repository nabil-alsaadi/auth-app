import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import {
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../user/user.schema';

// Mock user data for testing
const mockUserData = {
  _id: '1',
  email: 'test@example.com',
  name: 'Test User',
  password: 'hashedpassword',
};

// Simulate a Mongoose document
const mockUserDocument = {
  ...mockUserData,
  toObject: jest.fn().mockReturnValue({ ...mockUserData }),
} as unknown as UserDocument;

// Mock UserService class
class MockUserService {
  findOneByEmail: jest.Mock<Promise<UserDocument | null>, [string]> = jest.fn(
    (email: string) => Promise.resolve(email === mockUserData.email ? mockUserDocument : null)
  );

  create: jest.Mock<Promise<UserDocument>, [Partial<UserDocument>]> = jest.fn(
    (userData: Partial<UserDocument>) => Promise.resolve({ ...userData, _id: '1' } as UserDocument)
  );
}

// Mock JwtService class
class MockJwtService {
  sign: jest.Mock<string, [any]> = jest.fn(
    (payload: any) => `token-${payload.email}-${payload.sub}`
  );
}

describe('AuthService', () => {
  let authService: AuthService;
  let userService: MockUserService;
  let jwtService: MockJwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useClass: MockUserService },
        { provide: JwtService, useClass: MockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<MockUserService>(UserService);
    jwtService = module.get<MockJwtService>(JwtService);

    // Mock bcrypt.compare function to return a boolean Promise
    jest.spyOn(bcrypt, 'compare').mockImplementation(
      (password: string, hash: string): Promise<boolean> => {
        return Promise.resolve(password === 'password' && hash === mockUserData.password);
      }
    );
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test to ensure clean state
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user data without password when validation is successful', async () => {
      const result = await authService.validateUser(
        mockUserData.email,
        'password'
      );

      expect(result).toEqual({
        _id: mockUserData._id,
        email: mockUserData.email,
        name: mockUserData.name,
      });
    });

    it('should return null if password comparison fails', async () => {
      const result = await authService.validateUser(
        mockUserData.email,
        'wrongpassword'
      );

      expect(result).toBeNull();
    });

    it('should return null if user is not found', async () => {
      const result = await authService.validateUser(
        'unknown@example.com',
        'password'
      );

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return an access token if credentials are valid', async () => {
      jest
        .spyOn(authService, 'validateUser')
        .mockResolvedValueOnce(mockUserDocument as UserDocument);

      const loginDto: LoginDto = {
        email: mockUserData.email,
        password: 'password',
      };

      const result = await authService.login(loginDto);

      expect(result).toEqual({
        access_token: `token-${mockUserData.email}-${mockUserData._id}`,
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        email: mockUserData.email,
        sub: mockUserData._id,
      });
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      jest.spyOn(authService, 'validateUser').mockResolvedValueOnce(null);

      const loginDto: LoginDto = {
        email: mockUserData.email,
        password: 'wrongpassword',
      };

      await expect(authService.login(loginDto)).rejects.toThrow(
        UnauthorizedException
      );
    });
  });

  describe('register', () => {
    jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve('hashedpassword'));

    it('should register a new user and return an access token', async () => {
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValueOnce(null);

      const registerDto: RegisterDto = {
        email: mockUserData.email,
        name: 'Test User',
        password: 'password',
      };

      const result = await authService.register(registerDto);

      expect(result).toEqual({
        access_token: `token-${mockUserData.email}-${mockUserData._id}`,
      });
      expect(userService.create).toHaveBeenCalledWith({
        email: registerDto.email,
        name: registerDto.name,
        password: 'hashedpassword',
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        email: mockUserData.email,
        sub: mockUserData._id,
      });
    });

    it('should throw ConflictException if email already exists', async () => {
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValueOnce(mockUserDocument);

      const registerDto: RegisterDto = {
        email: mockUserData.email,
        name: 'Test User',
        password: 'password',
      };

      await expect(authService.register(registerDto)).rejects.toThrow(
        ConflictException
      );
    });

    it('should throw InternalServerErrorException if registration fails unexpectedly', async () => {
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValueOnce(null);
      jest.spyOn(userService, 'create').mockRejectedValueOnce(
        new Error('Failed to create user')
      );

      const registerDto: RegisterDto = {
        email: mockUserData.email,
        name: 'Test User',
        password: 'password',
      };

      await expect(authService.register(registerDto)).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });
});
