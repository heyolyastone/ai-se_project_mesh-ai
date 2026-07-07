import type { Request, Response } from 'express';

import Document from '../models/document.js';
import Chunk from '../models/chunk.js';
import { createEmbedding } from '../utils/embeddings.js';
import { rankBySimilarity } from '../utils/vector-search.js';
import {
  buildContext,
  getClient,
  LLM_MODEL,
} from '../utils/openai-client.js';

export const askQuestion = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { question } = req.body;

  if (!question) {
    res.status(400).json({
      success: false,
      data: null,
      error: { message: 'question is required' },
    });
    return;
  }

  const userId = req.user!.userId;

  const userDocs = await Document.find({ userId }, '_id');
  const docIds = userDocs.map((document) => document._id);

  const chunkRecords = await Chunk.find({
    documentId: { $in: docIds },
  });

  const chunks = chunkRecords.map((chunk) => ({
    id: String(chunk._id),
    documentId: String(chunk.documentId),
    text: chunk.text,
    embedding: chunk.embedding,
  }));

  const queryEmbedding = await createEmbedding(question);
  const ranked = rankBySimilarity(queryEmbedding, chunks, 5);
  const context = buildContext(ranked);

  const response = await getClient().chat.completions.create({
    model: LLM_MODEL,
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful assistant. Answer the user question using only the provided context.',
      },
      {
        role: 'user',
        content: `Context:\n${context}\n\nQuestion:\n${question}`,
      },
    ],
  });

  const answer =
    response.choices[0]?.message?.content ?? 'No answer generated.';

  res.status(200).json({
    success: true,
    data: {
      answer,
      sources: ranked,
    },
    error: null,
  });
};