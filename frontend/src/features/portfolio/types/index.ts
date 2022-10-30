export type PortfolioForm = {
  name: string;
  userId: number;
  description: string;
  status: number | null;
  tags: number[];
  gitHubLink: string;
  shareLink: string;
};

export type CardType = {
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  status: number | undefined;
  tags: number[] | undefined;
  githubLink: string | undefined;
  shareLink: string | undefined;
};