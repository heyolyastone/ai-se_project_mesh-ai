import type { Request, Response } from 'express';

export const uploadDocument = (req: Request, res: Response): void => {
  void req;

  res.status(201).json({
    success: true,
    data: {},
    error: null,
  });
};

export const getDocuments = (req: Request, res: Response): void => {
  void req;

  res.status(200).json({
    success: true,
    data: {},
    error: null,
  });
};

export const getDocumentById = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {
      id: req.params.id,
    },
    error: null,
  });
};

export const deleteDocument = (req: Request, res: Response): void => {
  void req;

  res.status(204).send();
};