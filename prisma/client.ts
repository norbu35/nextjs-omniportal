import { PrismaClient } from '@prisma/client';

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

const globalPrisma = global as unknown as NodeJS.Global & { prisma?: PrismaClient };

const prisma = globalPrisma.prisma || new PrismaClient({
  log: ['query'],
});

if (process.env.NODE_ENV !== 'production') globalPrisma.prisma = prisma;

export default prisma;
