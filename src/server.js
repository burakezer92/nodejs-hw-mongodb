import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
//import dotenv from 'dotenv';
import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

export function setupServer() {
  const app = express();
  app.use(cors());
  //dotenv.config();
  const PORT = Number(env('PORT', 5000));
  app.use(express.json());
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use(cookieParser());

  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  app.use(router);

  app.use(errorHandler);

  app.use(notFoundHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
