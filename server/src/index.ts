import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';

import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import authRoutes from './routes/auth';

dotenv.config({ path: path.resolve(`.env.${process.env.NODE_ENV}`) });
const PORT = process.env.PORT || 8080;
const DATABASE_URL = process.env.DATABASE_URL || '';

const app: Express = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('tiny'));
}

app.get('/', (req: Request, res: Response) => {
  res.send('운동 기록 API Server.');
});
app.use('/api/v1', authRoutes);

mongoose.connect(DATABASE_URL, () => {
  app.listen(PORT, () => {
    console.log(`⚡️[express server]: Server 시작 포트: ${PORT}`);
  });
});

mongoose.connection
  .on('open', () => console.log('connection open'))
  .on('close', () => console.log('connection close'))
  .on('error', (error) => console.log('connection error', error));
