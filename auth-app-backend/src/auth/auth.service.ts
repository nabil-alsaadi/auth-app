import { Injectable, ConflictException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../user/user.schema';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Validate user credentials
  async validateUser(email: string, password: string): Promise<Omit<UserDocument, 'password'> | null> {
    const user = await this.userService.findOneByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toObject(); 
      return result;
    }
    return null;
  }

  // Login user and issue JWT token
  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Register a new user with unique email check
  async register(registerDto: RegisterDto): Promise<{ access_token: string }> {
    try {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const newUser = await this.userService.create({ ...registerDto, password: hashedPassword });
        const payload = { email: newUser.email, sub: newUser._id };

        // Sign the JWT token with the payload
        const access_token = this.jwtService.sign(payload);

        return { access_token }; // Return the JWT token
    }
    catch(error) {
        console.log('error =======',error)
        if (error.code === 11000) { // Handle MongoDB duplicate key error
            throw new ConflictException('Email already exists');
        }
        throw new InternalServerErrorException('Registration failed');
    }
  }
}
