import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';


export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token || '';

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string };

      req.userId = decoded._id;
      next();
    } catch (e) {
      res.status(403).json({
        error: {
          message: 'No access',
        }
      });
    }
  } else {
    res.status(403).json({
      error: {
        message: 'No access',
      }
    });
  }
};