import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';

import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { PORT, API_URL, DATABASE_URL } from './config';

import routes from './routes';

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

app.use(`${API_URL}`, routes);

mongoose.connect(DATABASE_URL, () => {
  app.listen(PORT, () => {
    console.log(`⚡️[express server]: Server 시작 포트: ${PORT}`);
  });
});

mongoose.connection
  .on('open', () => console.log('connection open'))
  .on('close', () => console.log('connection close'))
  .on('error', (error) => console.log('connection error', error));
