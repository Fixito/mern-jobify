import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

//public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import { validateTest } from './middleware/valdationMiddleware.js';

// routers
import jobRouter from './routes/jobRoutes.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

// middlewares
import notFoundMiddleware from './middleware/notFoundMiddleware.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.set('trust proxy', 1);
app.use(express.static(path.resolve(__dirname, './client/dist')));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());

// test express validator
app.post('/api/v1/test', validateTest, (req, res) => {
  const { name } = req.body;
  res.status(200).json({ message: `Hello ${name}` });
});

app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

app.get('*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

app.use('*', notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server is listenning on port ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
