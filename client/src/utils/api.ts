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

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getDocuments = async (): Promise<ApiResponse<KnowledgeDoc[]>> => {
  await delay(700);

  return {
    success: true,
    data: [
      {
        _id: "1",
        title: "Code Review Guidelines",
        fileName: "code-review-guidelines.pdf",
        userId: "u1",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "2",
        title: "API Reference",
        fileName: "api-reference.pdf",
        userId: "u1",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "3",
        title: "Onboarding Guide",
        fileName: "onboarding-guide.pdf",
        userId: "u1",
        createdAt: new Date().toISOString(),
      },
    ],
    error: null,
  };
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
