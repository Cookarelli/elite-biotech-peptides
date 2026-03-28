import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const databaseUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";

if (!databaseUrl.startsWith("file:")) {
  throw new Error(`Unsupported DATABASE_URL for local init: ${databaseUrl}`);
}

const filePath = databaseUrl.replace(/^file:/, "");
const absolutePath = path.isAbsolute(filePath)
  ? filePath
  : path.resolve(process.cwd(), filePath);

fs.mkdirSync(path.dirname(absolutePath), { recursive: true });

const db = new Database(absolutePath);

db.exec(`
  CREATE TABLE IF NOT EXISTS "InvoiceRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'requested',
    "source" TEXT NOT NULL DEFAULT 'web',
    "productSlug" TEXT,
    "productName" TEXT NOT NULL,
    "productCategory" TEXT,
    "priceShown" TEXT,
    "strengthMg" INTEGER,
    "volumeMl" INTEGER,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerCompany" TEXT,
    "shippingLocation" TEXT,
    "notes" TEXT
  );

  CREATE INDEX IF NOT EXISTS "InvoiceRequest_createdAt_idx"
    ON "InvoiceRequest" ("createdAt");

  CREATE INDEX IF NOT EXISTS "InvoiceRequest_customerEmail_idx"
    ON "InvoiceRequest" ("customerEmail");
`);

db.close();

console.log(`Initialized SQLite database at ${absolutePath}`);
