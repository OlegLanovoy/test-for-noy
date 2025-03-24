import { body, param } from 'express-validator';

export const postCreateValidation = [
  body('title', 'Title must be at least 3 characters long').isString().isLength({ min: 3 }),
  body('text', 'Content must be at least 3 characters long').isString().isLength({ min: 3 }),
];

export const postIdValidation = [
  param('id', 'Invalid ID format').isMongoId(),
]
