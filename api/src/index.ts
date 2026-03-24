// src/index.ts
import express, { type Request, type Response } from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
  origin: '*', // Allow all origins (wildcards)
  methods: ['GET', 'POST'], // Only allow GET and POST
  credentials: true
}));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! This is a TypeScript backend.');
});

app.post('/functions/v1/:example', (req: Request, res: Response) => {
  const  { example } = req.params as { example: string };
  const arrayString = example.split('');
  const sortedArray = arrayString.sort();
  res.status(200).json({ word: sortedArray})
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

