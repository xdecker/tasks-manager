import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { PrismaClient, TaskStatus } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

async function main() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  });

  const prisma = new PrismaClient({ adapter });

  await prisma.$connect();

  console.log('Running seed...');

  const name = 'demo';
  const email = 'demo@example.com';
  const password = 'Password123';

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hash,
      name,
    },
  });

  console.log('Demo user ready:', user.email);

  //limpiar task de este usuario demo
  await prisma.task.deleteMany({ where: { userId: user.id } });
  // Crear tasks demo
  await prisma.task.createMany({
    data: [
      {
        title: 'Finish technical challenge',
        description: 'Implement backend tasks module',
        status: TaskStatus.TODO,
        userId: user.id,
      },
      {
        title: 'Deploy project',
        description: 'Prepare docker setup',
        status: TaskStatus.DONE,
        userId: user.id,
      },
    ],
  });

  console.log('Demo tasks created');

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
