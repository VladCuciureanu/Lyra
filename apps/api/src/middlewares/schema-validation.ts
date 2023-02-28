import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { InvalidPayloadException } from '../exceptions/invalid-payload';

export const validate =
  (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new InvalidPayloadException(error.issues));
      }
      next(error);
    }
  };
