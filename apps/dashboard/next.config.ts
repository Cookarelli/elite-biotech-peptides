import dotenv from 'dotenv';
import { resolve } from 'node:path';

dotenv.config({ path: resolve(process.cwd(), '../../.env.local') });
dotenv.config({ path: resolve(process.cwd(), '../../.env') });

const nextConfig = {
  typedRoutes: true,
  turbopack: {
    root: new URL('../..', import.meta.url).pathname
  },
  images: {
    remotePatterns: []
  }
};

export default nextConfig;
