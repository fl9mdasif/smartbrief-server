/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
 
import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API route Not Found !!',
    error: '',
  });
};

export default notFound;
