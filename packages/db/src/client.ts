import dotenv from 'dotenv';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PrismaPg } from '@prisma/adapter-pg';

const currentDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(currentDir, '../../..');

dotenv.config({ path: resolve(repoRoot, '.env.local') });
dotenv.config({ path: resolve(repoRoot, '.env') });

type PrismaClientModule = typeof import('../../../node_modules/.prisma/client/client');
type PrismaClientInstance = InstanceType<PrismaClientModule['PrismaClient']>;

const connectionString =
  process.env.DATABASE_URL ??
  'postgresql://postgres:postgres@localhost:5432/elite_biotech_peptides?schema=public';

let prismaInstancePromise: Promise<PrismaClientInstance> | null = null;

export async function getPrisma() {
  if (!prismaInstancePromise) {
    prismaInstancePromise = (async () => {
      const { PrismaClient } = await import('../../../node_modules/.prisma/client/client');
      const adapter = new PrismaPg({ connectionString });
      return new PrismaClient({ adapter });
    })();
  }

  return prismaInstancePromise;
}
