/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/router';

const app: Application = express();

// parser middleware
app.use(cors({
  origin: 'https://master.d3mia3lbsm9fsq.amplifyapp.com',  
  credentials: true,               
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));

app.use(express.json());

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
