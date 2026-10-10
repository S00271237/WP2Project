import { Request, Response, NextFunction } from 'express';

export const middleware = async (req : Request, res : Response, next : NextFunction): Promise<void> => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
};
