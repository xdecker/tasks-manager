import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskStatus } from '@prisma/client';
import { UpdateTaskDto } from './dtos/update-task.dto';

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

  async findAll(userId: string, status?: TaskStatus) {
    return this.prisma.task.findMany({
      where: {
        userId,
        active: true,
        ...(status && { status }),
      },
      orderBy: {
        createdAt: 'asc', //fifo
      },
    });
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
      where: { id, userId, active:true },
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
