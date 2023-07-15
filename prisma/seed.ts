import  prisma  from './client';
import { logger } from '../utils/logging/logger';

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'norbu.erdene@gmail.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'norbu.erdene@gmail.com',
    },
  });

  logger.info({ message: 'User created: ' + JSON.stringify(user), level: 'info' });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    logger.error({ message: e, level: 'error' });
    prisma.$disconnect();
    process.exit(1);
  });
