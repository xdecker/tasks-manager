import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { NotFoundException } from '@nestjs/common';
import { TaskStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

describe('TasksService', () => {
  let service: TasksService;
  const userId = 'user-123';

  const prismaMock = {
    task: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create()', () => {
    it('should create a new task', async () => {
      const dto = {
        title: 'Test Task',
        description: 'Desc',
        status: TaskStatus.TODO,
      };
      prismaMock.task.create.mockResolvedValue({ id: '1', ...dto, userId });

      const result = await service.create(userId, dto);

      expect(result).toEqual({ id: '1', ...dto, userId });
      expect(prismaMock.task.create).toHaveBeenCalledWith({
        data: { ...dto, userId },
      });
    });
  });

  describe('findAll()', () => {
    it('should return paginated tasks', async () => {
      const tasks = [{ id: '1', title: 'T1', status: TaskStatus.TODO, userId }];
      prismaMock.$transaction.mockResolvedValue([tasks, 1]);

      const result = await service.findAll(userId, { page: 1, limit: 10 });

      expect(result).toEqual({
        data: tasks,
        meta: { total: 1, page: 1, lastPage: 1 },
      });
      expect(prismaMock.$transaction).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    it('should update an existing task', async () => {
      const dto = { status: TaskStatus.DONE };
      prismaMock.task.findFirst.mockResolvedValue({ id: '1', userId });
      prismaMock.task.update.mockResolvedValue({ id: '1', ...dto, userId });

      const result = await service.update('1', userId, dto);

      expect(result).toEqual({ id: '1', ...dto, userId });
      expect(prismaMock.task.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: dto,
      });
    });

    it('should throw NotFoundException if task does not exist', async () => {
      prismaMock.task.findFirst.mockResolvedValue(null);
      await expect(
        service.update('1', userId, { status: TaskStatus.DONE }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete()', () => {
    it('should soft delete an existing task', async () => {
      prismaMock.task.findFirst.mockResolvedValue({
        id: '1',
        userId,
        active: true,
      });
      prismaMock.task.update.mockResolvedValue({
        id: '1',
        active: false,
        userId,
      });

      const result = await service.delete('1', userId);

      expect(result).toEqual({ id: '1', active: false, userId });
      expect(prismaMock.task.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { active: false },
      });
    });

    it('should throw NotFoundException if task does not exist', async () => {
      prismaMock.task.findFirst.mockResolvedValue(null);
      await expect(service.delete('1', userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
