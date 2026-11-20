import express, {Application, Request, Response} from "express" ; 

import anglerRoutes from './routes/angler';

import { env } from './config/env';

import { connectDB } from './config/database';

import { middleware } from './middleware/middleware';

import swaggerUi from 'swagger-ui-express';

import {swaggerSpec} from './config/swagger';

import authRoutes from './routes/users';

import cors from 'cors';



//const PORT = process.env.PORT || 3120; 

const port = env.port

const app: Application = express(); 

app.use(express.json());
app.use(cors());


app.get("/ping", async (_req : Request, res: Response) => { 

  res.json({ 

  message: "hello from David"  

  }); 

});

 app.use(
'/api-docs',
swaggerUi.serve,
swaggerUi.setup(swaggerSpec)
);

app.use(middleware);
app.use('/api/v1/anglers', middleware, anglerRoutes);
app.use('/api/v1/auth', middleware, authRoutes);

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

};

startServer();

export { app };