jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;

  const prismaMock = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  const jwtMock = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: JwtService,
          useValue: jwtMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const user = {
    id: '1',
    email: 'demo@test.com',
    name: 'Demo',
    password: 'hashed',
  };

  describe('validateUser()', () => {
    it('should return user when credentials are valid', async () => {
      prismaMock.user.findUnique.mockResolvedValue(user);

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser(user.email, 'Password123');

      expect(result).toEqual(user);
    });

    it('should return null if user does not exist', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      const result = await service.validateUser('test@test.com', '123');

      expect(result).toBeNull();
    });

    it('should return null if password is invalid', async () => {
      prismaMock.user.findUnique.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      const result = await service.validateUser(user.email, 'wrong');

      expect(result).toBeNull();
    });
  });

  describe('login()', () => {
    it('should return access token', async () => {
      jwtMock.sign.mockReturnValue('token123');

      const result = await service.login(user);

      expect(result).toEqual({
        access_token: 'token123',
        email: user.email,
        name: user.name,
      });

      expect(jwtMock.sign).toHaveBeenCalled();
    });
  });

  describe('signup()', () => {
    const dto = {
      email: 'demo@test.com',
      password: 'Password123',
      confirmPassword: 'Password123',
      name: 'Demo',
    };

    it('should create user and return token', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');

      prismaMock.user.create.mockResolvedValue({
        id: '1',
        email: dto.email,
        name: dto.name,
      });

      jwtMock.sign.mockReturnValue('token123');

      const result = await service.signup(dto);

      expect(result).toEqual({
        access_token: 'token123',
        email: dto.email,
        name: dto.name,
      });
    });

    it('should throw if passwords do not match', async () => {
      const badDto = { ...dto, confirmPassword: 'wrong' };

      await expect(service.signup(badDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw if email already exists', async () => {
      prismaMock.user.findUnique.mockResolvedValue(user);

      await expect(service.signup(dto)).rejects.toThrow(
        'Email already registered',
      );
    });
  });
});
