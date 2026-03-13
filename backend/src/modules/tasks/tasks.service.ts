import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskStatus } from '@prisma/client';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TasksQueryDto } from './dtos/tasks-query.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async findAll(userId: string, options: TasksQueryDto) {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const sort = options.sort || 'asc';

    const skip = (page - 1) * limit;

    const where = {
      userId,
      active: true,
      ...(options.status && { status: options.status }),
    };

    const [tasks, total] = await this.prisma.$transaction([
      this.prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: sort,
        },
      }),

      this.prisma.task.count({
        where,
      }),
    ]);

    const lastPage = Math.max(1, Math.ceil(total / limit));

    return {
      data: tasks,
      meta: {
        total,
        page,
        lastPage,
      },
    };
  }

  async update(id: string, userId: string, dto: UpdateTaskDto) {
    const task = await this.prisma.task.findFirst({
      where: { id, userId },
    });

    if (!task) throw new NotFoundException('Task not found');

    return this.prisma.task.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string, userId: string) {
    const task = await this.prisma.task.findFirst({
      where: { id, userId, active: true },
    });

    if (!task) throw new NotFoundException('Task not found');

    return this.prisma.task.update({
      where: { id },
      data: {
        active: false,
      },
    });
  }
}
