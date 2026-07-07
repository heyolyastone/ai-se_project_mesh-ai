export type Document = {
  id: string;
  name: string;
  uploadedAt: string;
};

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Product strategy.pdf",
    uploadedAt: "2026-01-10",
  },
  {
    id: "2",
    name: "Engineering handbook.pdf",
    uploadedAt: "2026-01-12",
  },
];

export function getDocuments(): Promise<Document[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDocuments);
    }, 500);
  });
}
