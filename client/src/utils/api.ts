import type { CurrentUser } from "../types";

export type KnowledgeDoc = {
  _id: string;
  title: string;
  fileName: string;
  userId: string;
  createdAt: string;
};

export type Chat = {
  _id: string;
  title: string;
  userId: string;
  createdAt: string;
};

export type Message = {
  _id: string;
  chatId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export type ChatDetails = Chat & {
  messages: Message[];
};

export type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  error: { message: string } | null;
};

const BASE_URL = "/api";

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem("auth-token") ?? "";

  const res = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (res.status === 401) {
    const body = await res.json().catch(() => null);
    const message = body?.error?.message || "Invalid credentials";

    if (localStorage.getItem("auth-token")) {
      localStorage.removeItem("auth-token");
      window.location.href = "/login";
    }

    throw new Error(message);
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message || "Request failed");
  }

  return res.json();
}

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export function getCurrentUser() {
  return request<CurrentUser>(`${BASE_URL}/users/me`);
}

export function registerUser(name: string, email: string, password: string) {
  return request<CurrentUser>(`${BASE_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export function loginUser(email: string, password: string) {
  return request<{ token: string; user: CurrentUser }>(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export const getDocuments = (): Promise<ApiResponse<KnowledgeDoc[]>> => {
  return request<KnowledgeDoc[]>(`${BASE_URL}/documents`);
};

export const uploadDocument = async (
  file: File,
): Promise<ApiResponse<KnowledgeDoc>> => {
  const token = localStorage.getItem("auth-token") ?? "";
  const formData = new FormData();

  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/documents`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (res.status === 401) {
    const body = await res.json().catch(() => null);
    const message = body?.error?.message || "Invalid credentials";

    if (localStorage.getItem("auth-token")) {
      localStorage.removeItem("auth-token");
      window.location.href = "/login";
    }

    throw new Error(message);
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message || "Upload failed");
  }

  return res.json();
};

export const getChats = async (): Promise<ApiResponse<Chat[]>> => {
  await delay(700);

  return {
    success: true,
    data: [
      {
        _id: "1",
        title: "What is posthog",
        userId: "u1",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "2",
        title: "Who are our users",
        userId: "u1",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "3",
        title: "Marketing Hypothesis",
        userId: "u1",
        createdAt: new Date().toISOString(),
      },
    ],
    error: null,
  };
};

export const createChat = async (title: string): Promise<ApiResponse<Chat>> => {
  await delay(400);

  return {
    success: true,
    data: {
      _id: Date.now().toString(),
      title,
      userId: "u1",
      createdAt: new Date().toISOString(),
    },
    error: null,
  };
};

export const getChat = async (
  chatId: string,
): Promise<ApiResponse<ChatDetails>> => {
  await delay(700);

  const messages: Message[] =
    chatId.length > 10
      ? []
      : [
          {
            _id: `${chatId}-1`,
            chatId,
            role: "user",
            content: "What is PostHog?",
            createdAt: new Date().toISOString(),
          },
          {
            _id: `${chatId}-2`,
            chatId,
            role: "assistant",
            content:
              "## PostHog overview\n\nPostHog is a product analytics platform. It helps teams understand how users interact with their product.",
            createdAt: new Date().toISOString(),
          },
          {
            _id: `${chatId}-3`,
            chatId,
            role: "user",
            content: "What can we use it for?",
            createdAt: new Date().toISOString(),
          },
          {
            _id: `${chatId}-4`,
            chatId,
            role: "assistant",
            content:
              "You can use it for:\n\n- tracking product events\n- analyzing user behavior\n- building funnels\n- testing hypotheses",
            createdAt: new Date().toISOString(),
          },
        ];

  return {
    success: true,
    data: {
      _id: chatId,
      title: "Chat",
      userId: "u1",
      createdAt: new Date().toISOString(),
      messages,
    },
    error: null,
  };
};

export const sendMessage = async (
  chatId: string,
  content: string,
): Promise<ApiResponse<Message>> => {
  await delay(1500);

  return {
    success: true,
    data: {
      _id: Date.now().toString(),
      chatId,
      role: "assistant",
      content: `You asked: "${content}"\n\nThis is a mock assistant response. In a later sprint, this will come from the real API.`,
      createdAt: new Date().toISOString(),
    },
    error: null,
  };
};
