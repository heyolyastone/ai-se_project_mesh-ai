import type { Request, Response } from 'express';
import fs from 'fs/promises';
import { PDFParse } from 'pdf-parse';

import Document from '../models/document.js';
import Chunk from '../models/chunk.js';
import { chunkText } from '../utils/chunk.js';
import { createEmbedding } from '../utils/embeddings.js';

export const uploadDocument = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.user!.userId;

  if (!req.file) {
    res.status(400).json({
      success: false,
      data: null,
      error: { message: 'file is required' },
    });
    return;
  }

  const document = await Document.create({
    title: req.file.originalname,
    fileName: req.file.filename,
    userId,
  });

  const buffer = await fs.readFile(req.file.path);
  const parser = new PDFParse({ data: buffer });
  const pdfData = await parser.getText();
  await parser.destroy();

  const chunks = chunkText(pdfData.text);

  await Promise.all(
    chunks.map(async (text) => {
      const embedding = await createEmbedding(text);

      return Chunk.create({
        documentId: document._id,
        text,
        embedding,
      });
    }),
  );

  res.status(201).json({
    success: true,
    data: document,
    error: null,
  });
};

export const getDocuments = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.user!.userId;

  const documents = await Document.find({ userId });

  res.status(200).json({
    success: true,
    data: documents,
    error: null,
  });
};

export const getDocumentById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.user!.userId;

  const document = await Document.findOne({
    _id: req.params.id,
    userId,
  });

  if (!document) {
    res.status(404).json({
      success: false,
      data: null,
      error: { message: 'Document not found' },
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: document,
    error: null,
  });
};

export const deleteDocument = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.user!.userId;

  const document = await Document.findOneAndDelete({
    _id: req.params.id,
    userId,
  });

  if (!document) {
    res.status(404).json({
      success: false,
      data: null,
      error: { message: 'Document not found' },
    });
    return;
  }

  await Chunk.deleteMany({ documentId: document._id });

  res.status(200).json({
    success: true,
    data: { message: 'Document deleted' },
    error: null,
  });
};