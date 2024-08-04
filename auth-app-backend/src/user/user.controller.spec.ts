// import { Test, TestingModule } from '@nestjs/testing';
// import { UserController } from './user.controller';

// describe('UserController', () => {
//   let controller: UserController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UserController],
//     }).compile();

//     controller = module.get<UserController>(UserController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDocument } from './user.schema';

const mockUser: UserDocument = {
  _id: '1',
  email: 'test@example.com',
  name: 'Test User',
  password: 'hashedpassword',
} as UserDocument;

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    findOneByEmail: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProfile', () => {
    it('should return the profile of the authenticated user', async () => {
      const req = { user: mockUser };
      const result = await controller.getProfile(req as any);

      expect(result).toEqual({ email: 'test@example.com', name: 'Test User' });
    });
  });
});
