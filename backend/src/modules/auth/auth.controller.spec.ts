import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;

  const authServiceMock = {
    validateUser: jest.fn(),
    login: jest.fn(),
    signup: jest.fn(),
  };

  const mockUser = {
    id: 'user-123',
    email: 'demo@test.com',
    name: 'Demo',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login()', () => {
    it('should return token when credentials are valid', async () => {
      const dto = {
        email: 'demo@test.com',
        password: 'Password123',
      };

      authServiceMock.validateUser.mockResolvedValue(mockUser);

      authServiceMock.login.mockResolvedValue({
        access_token: 'token123',
        email: mockUser.email,
        name: mockUser.name,
      });

      const result = await controller.login(dto as any);

      expect(result).toEqual({
        access_token: 'token123',
        email: mockUser.email,
        name: mockUser.name,
      });

      expect(authServiceMock.validateUser).toHaveBeenCalledWith(
        dto.email,
        dto.password,
      );

      expect(authServiceMock.login).toHaveBeenCalledWith(mockUser);
    });

    it('should throw UnauthorizedException when credentials are invalid', async () => {
      const dto = {
        email: 'demo@test.com',
        password: 'wrong',
      };

      authServiceMock.validateUser.mockResolvedValue(null);

      await expect(controller.login(dto as any)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('signup()', () => {
    it('should create user', async () => {
      const dto = {
        email: 'demo@test.com',
        password: 'Password123',
        confirmPassword: 'Password123',
        name: 'Demo',
      };

      authServiceMock.signup.mockResolvedValue({
        access_token: 'token123',
        email: dto.email,
        name: dto.name,
      });

      const result = await controller.signup(dto as any);

      expect(result).toEqual({
        access_token: 'token123',
        email: dto.email,
        name: dto.name,
      });

      expect(authServiceMock.signup).toHaveBeenCalledWith(dto);
    });
  });
});
