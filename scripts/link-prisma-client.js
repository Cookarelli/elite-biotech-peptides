/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const prismaDir = path.resolve(__dirname, '../node_modules/.prisma');
const linkDir = path.resolve(__dirname, '../node_modules/@prisma/client/.prisma');

if (!fs.existsSync(prismaDir)) {
  console.warn('Prisma client directory not found, skipping link.');
  process.exit(0);
}

if (fs.existsSync(linkDir)) {
  const stats = fs.lstatSync(linkDir);
  if (stats.isSymbolicLink()) {
    fs.unlinkSync(linkDir);
  } else {
    fs.rmSync(linkDir, { recursive: true, force: true });
  }
}

fs.symlinkSync(prismaDir, linkDir, 'junction');
