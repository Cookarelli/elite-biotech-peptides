import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyticsRoutes from './routes/analytics';

dotenv.config({ path: '../../.env.local' });
dotenv.config({ path: '../../.env' });

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.get('/v1/metrics', (_req, res) => {
  res.json({
    timestamp: new Date().toISOString(),
    metrics: []
  });
});

app.post('/v1/prompt-runs', (req, res) => {
  const payload = req.body;
  res.status(202).json({ status: 'queued', payload });
});

app.use('/v1', analyticsRoutes);

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  console.log(`Elite Growth API listening on http://localhost:${port}`);
});
