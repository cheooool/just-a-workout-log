import path from 'path';
import dotenv from 'dotenv';

interface Config {
  PORT: number;
  API_URL: string;
  DATABASE_URL: string;
  SECRET: string;
}

dotenv.config({ path: path.resolve(`.env.${process.env.NODE_ENV}`) });

const {
  PORT = 8080,
  API_URL = '/api/v1',
  DATABASE_URL = '',
  SECRET = 'SCRET',
} = process.env as NodeJS.ProcessEnv & Config;

export { PORT, API_URL, DATABASE_URL, SECRET };
