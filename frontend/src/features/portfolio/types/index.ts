export type PortfolioForm = {
  name: string;
  userId: number;
  description: string;
  status: number | null;
  tags: number[];
  gitHubLink: string;
  shareLink: string;
};
