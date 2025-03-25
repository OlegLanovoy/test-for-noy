import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      error: errors.array().map(err => ({ message: err.msg }))
    });
  } else {
    next();
  }
};