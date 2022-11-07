import express, { Express } from 'express';

const app: Express = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`⚡️[express server]: Server 시작 포트: ${PORT}`);
});
