import type { Request, Response } from 'express';

export const askQuestion = (req: Request, res: Response): void => {
  void req;

  res.status(200).json({
    success: true,
    data: {},
    error: null,
  });
};