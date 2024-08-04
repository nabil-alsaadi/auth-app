import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

// Defining the user data outside of the class to be used statically.
const mockUserData = {
  _id: '1',
  email: 'test@example.com',
  name: 'Test User',
  password: 'hashedpassword',
};

class MockUserModel {
  data: typeof mockUserData;

  constructor(data: typeof mockUserData) {
    this.data = { ...data, _id: '1' }; // Make sure _id is always included
  }

  // Ensures save returns this instance to mimic Mongoose behavior
  save = jest.fn().mockResolvedValue(this);

  // Ensures toObject returns the data including _id
  toObject = jest.fn(() => ({ ...this.data }));

  // Correctly implemented static method to find user by email
  static findOne = jest.fn().mockImplementation(({ email }) => ({
    exec: jest.fn().mockResolvedValue(email === mockUserData.email ? new MockUserModel(mockUserData) : null),
  }));
}

describe('UserService', () => {
  let service: UserService;
  let model: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken(User.name), useValue: MockUserModel },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const newUser = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashedpassword',
      };

      const userInstance = new model(newUser as any);
      const result = await userInstance.save();

      expect(result.toObject()).toEqual(expect.objectContaining({
        _id: '1',
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashedpassword',
      }));
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user if found', async () => {
      const result = await service.findOneByEmail('test@example.com');

      expect(result.toObject()).toEqual(expect.objectContaining({
        _id: '1',
        email: 'test@example.com',
        name: 'Test User',
      }));
    });

    it('should return null if user not found', async () => {
      const result = await service.findOneByEmail('unknown@example.com');

      expect(result).toBeNull();
    });
  });
});
