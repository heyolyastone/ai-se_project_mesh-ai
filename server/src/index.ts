import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';
import { requestLogger } from './middleware/logger.js';
import { notFoundHandler, errorHandler } from './middleware/error.js';
import { logger } from './utils/logger.js';

const app = express();
const port = process.env.PORT || 3000;

app.set('trust proxy', 1);

app.use(express.json());
app.use(requestLogger);

app.get('/health', (req, res): void => {
  res.status(200).json({
    success: true,
    data: {
      status: 'ok',
    },
    error: null,
  });
});
app.use(router);

app.use(notFoundHandler);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    logger.info('MongoDB connected');
    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  })
  .catch((err: Error) => {
    logger.error('Connection error', { stack: err.stack });
  });
