import express, {Application, Request, Response} from "express" ; 

import anglerRoutes from './routes/angler';

import { env } from './config/env';

import { connectDB } from './config/database';

import {authenticateKey} from './middleware/auth.middleware';

import { middleware } from './middleware/middleware';

import swaggerUi from 'swagger-ui-express';

import {swaggerSpec} from './config/swagger';

import userRoutes from './routes/users';



//const PORT = process.env.PORT || 3120; 

const port = env.port

const app: Application = express(); 



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

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

};

startServer();
app.use(middleware);
app.use(express.json());
app.use(authenticateKey);
app.use('/api/v1/anglers', anglerRoutes)
app.use('/api/v1/users', userRoutes);

export { app };