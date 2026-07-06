import { Request, Response, NextFunction } from 'express';

export function requireGrowthApiKey(req: Request, res: Response, next: NextFunction) {
  const expected = process.env.GROWTH_API_KEY;
  const provided = req.header('x-growth-api-key') ?? req.header('Authorization');
  if (!expected || !provided || provided !== expected) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}
