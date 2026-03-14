import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AuthController } from '../src/modules/auth/auth.controller';
import { AuthService } from '../src/modules/auth/auth.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  const authServiceMock = {
    validateUser: jest.fn(),
    login: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should login successfully', async () => {
    const user = {
      id: 'user-123',
      email: 'demo@test.com',
      name: 'Demo',
    };

    authServiceMock.validateUser.mockResolvedValue(user);

    authServiceMock.login.mockResolvedValue({
      access_token: 'token123',
      email: user.email,
      name: user.name,
    });

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'demo@test.com',
        password: 'Password123',
      })
      .expect(201)
      .expect({
        access_token: 'token123',
        email: 'demo@test.com',
        name: 'Demo',
      });
  });

  it('should fail with invalid credentials', async () => {
    authServiceMock.validateUser.mockResolvedValue(null);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'demo@test.com',
        password: 'wrong',
      })
      .expect(401);
  });
});
