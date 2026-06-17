import type { Request, Response, NextFunction } from 'express';

type ServerError = Error & {
  statusCode?: number;
};

export const notFoundHandler = (
  req: Request,
  res: Response,
): void => {
  res.status(404).json({
    success: false,
    data: null,
    error: `Route ${req.method} ${req.path} not found`,
  });
};

export const errorHandler = (
  err: ServerError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  void req;
  void next;

  console.error(err);

  const statusCode = err.statusCode ?? 500;
  const message =
    statusCode === 500
      ? 'An error has occurred on the server'
      : err.message;

  res.status(statusCode).json({
    success: false,
    data: null,
    error: message,
  });
};