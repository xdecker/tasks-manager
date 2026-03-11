import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { TasksController } from './modules/tasks/tasks.controller';
import { TasksService } from './modules/tasks/tasks.service';

@Module({
  imports: [PrismaModule, AuthModule, TasksModule],
  controllers: [AppController, TasksController],
  providers: [AppService, TasksService],
})
export class AppModule {}
