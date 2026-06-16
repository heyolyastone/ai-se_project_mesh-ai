import type { Request, Response } from 'express';

export const getChats = (req: Request, res: Response): void => {
  void req;

  res.status(200).json({
    success: true,
    data: {},
    error: null,
  });
};

export const createChat = (req: Request, res: Response): void => {
  void req;

  res.status(201).json({
    success: true,
    data: {},
    error: null,
  });
};

export const getChatById = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {
      id: req.params.id,
    },
    error: null,
  });
};

export const deleteChat = (req: Request, res: Response): void => {
  void req;

  res.status(204).send();
};

export const sendMessage = (req: Request, res: Response): void => {
  res.status(201).json({
    success: true,
    data: {
      chatId: req.params.id,
    },
    error: null,
  });
};