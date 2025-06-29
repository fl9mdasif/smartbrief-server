/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/router';

const app: Application = express();

// parser middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true,               
}));

// application routes
app.use('/api/v1', router);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from SmartBrief Ai tool Server!');
});

const test = async (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/a', test);
 

export default app;
