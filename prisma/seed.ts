import bcryptjs from 'bcryptjs';
import { logger } from '../utils/logging/logger';
import prisma from './client';

async function main() {
  const PASSWORD = 'secret';

  try {
    const hash = await bcryptjs.hash(PASSWORD, 10);
    const user = await prisma.user.upsert({
      where: { email: 'norbu.erdene@gmail.com' },
      update: {},
      create: {
        name: 'Admin',
        email: 'norbu.erdene@gmail.com',
        password: hash,
      },
    });

    logger.info({
      message: 'User created: ' + JSON.stringify(user),
      level: 'info',
    });
  } catch (err) {
    logger.error({ message: 'Error creating user: ' + err, level: 'error' });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    logger.error({ message: e, level: 'error' });
    prisma.$disconnect();
    process.exit(1);
  });
