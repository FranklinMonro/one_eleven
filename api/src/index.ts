// src/index.ts
import express, { type Request, type Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! This is a TypeScript backend.');
});

app.post('/convert/:example', (req: Request, res: Response) => {
  const  { example } = req.params as { example: string };
  const arrayString = example.split('');
  const sortedArray = arrayString.sort();
  res.status(200).json({ word: sortedArray})
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

