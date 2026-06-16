import type { ErrorRequestHandler, RequestHandler } from 'express';

export const notFoundHandler: RequestHandler = (req, res): void => {
  res.status(404).json({
    success: false,
    data: null,
    error: `Route ${req.method} ${req.path} not found`,
  });
};

export const errorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
): void => {
  void req;
  void next;

  console.error(err);

  res.status(500).json({
    success: false,
    data: null,
    error: 'An error has occurred on the server',
  });
};