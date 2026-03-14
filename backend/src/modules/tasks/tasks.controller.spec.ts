import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { TaskStatus } from '@prisma/client';

describe('TasksController', () => {
  let controller: TasksController;

  const tasksServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockUserId = 'user-123';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: tasksServiceMock,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<TasksController>(TasksController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create()', () => {
    it('should create a task', async () => {
      const dto = { title: 'Task 1', description: 'demo' };

      tasksServiceMock.create.mockResolvedValue({
        id: 'task1',
        ...dto,
      });

      const result = await controller.create(mockUserId, dto as any);

      expect(result).toEqual({
        id: 'task1',
        title: 'Task 1',
        description: 'demo',
      });

      expect(tasksServiceMock.create).toHaveBeenCalledWith(mockUserId, dto);
    });
  });

  describe('findAll()', () => {
    it('should return tasks list', async () => {
      const query = { page: 1, limit: 10 };

      tasksServiceMock.findAll.mockResolvedValue({
        data: [],
        total: 0,
      });

      const result = await controller.findAll(mockUserId, query as any);

      expect(result).toEqual({
        data: [],
        total: 0,
      });

      expect(tasksServiceMock.findAll).toHaveBeenCalledWith(mockUserId, query);
    });
  });

  describe('update()', () => {
    it('should update a task', async () => {
      const dto = { status: TaskStatus.DONE };

      tasksServiceMock.update.mockResolvedValue({
        id: 'task1',
        status: TaskStatus.DONE,
      });

      const result = await controller.update('task1', mockUserId, dto as any);

      expect(result).toEqual({
        id: 'task1',
        status: TaskStatus.DONE,
      });

      expect(tasksServiceMock.update).toHaveBeenCalledWith(
        'task1',
        mockUserId,
        dto,
      );
    });
  });

  describe('delete()', () => {
    it('should delete a task', async () => {
      tasksServiceMock.delete.mockResolvedValue({
        id: 'task1',
      });

      const result = await controller.delete('task1', mockUserId);

      expect(result).toEqual({ id: 'task1' });

      expect(tasksServiceMock.delete).toHaveBeenCalledWith('task1', mockUserId);
    });
  });
});
