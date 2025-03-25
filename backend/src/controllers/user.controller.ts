import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/user.model';
import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      email: req.body.email,
      fullName: req.body.fullName,
      passwordHash: hash,
    });

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '30d',
      },
    );

    const { passwordHash, ...userData } = user.toJSON();

    res.json({ token, ...userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: {
        message: 'Registration failed',
      }
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      res.status(404).json({
        error: {
          message: 'User not found',
        }
      });
    } else {
      const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash);

      if (!isValidPass) {
        res.status(400).json({
          error: {
            message: 'Invalid login or password',
          }
        });

      } else {
        const token = jwt.sign(
          {
            _id: user._id,
          },
          process.env.JWT_SECRET!,
          {
            expiresIn: '30d',
          },
        );

        const { passwordHash, ...userData } = user.toJSON();

        res.json({ token, ...userData });
      }
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: {
        message: 'Failed to authorize',
      }
    });
  }
};

