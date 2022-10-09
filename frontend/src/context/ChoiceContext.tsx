import React, { useEffect } from 'react';
import { PortfolioStatus, PortfolioTag } from '../openapi';
import { ApiContext } from './ApiContext';

export const ChoiceContext = React.createContext<{
  portfolioStatus: PortfolioStatus[];
  portfolioTag: PortfolioTag[];
}>({
  portfolioStatus: [],
  portfolioTag: []
});

const ChoiceProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [portfolioStatus, setPortfolioStatus] = React.useState<
    PortfolioStatus[]
  >([]);
  const [portfolioTag, setPortfolioTag] = React.useState<PortfolioTag[]>([]);

  const { portfolioTagApi, portfolioStatusApi } = React.useContext(ApiContext);

  React.useEffect(() => {
    const f = async () => {
      const status = await portfolioStatusApi.getPortfolioStatusList();
      const tag = await portfolioTagApi.getPortfolioTagList();
      setPortfolioStatus(status);
      setPortfolioTag(tag);
    };
    f().catch((e) => console.error(e));
  }, []);

  return (
    <ChoiceContext.Provider value={{ portfolioStatus, portfolioTag }}>
      {children}
    </ChoiceContext.Provider>
  );
};

export default ChoiceProvider;
