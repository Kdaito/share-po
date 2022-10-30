import React, { useEffect } from 'react';
import { ApiContext } from '../../context/ApiContext';
import List from '../../features/portfolio/components/templates/List';
import { CardType } from '../../features/portfolio/types';
import { Portfolio } from '../../openapi';

const COUNT_PER_PAGE = 10;

const PortFolioList: React.FC = () => {
  const { portfolioApi } = React.useContext(ApiContext);

  const [portfolios, setPortfolios] = React.useState<CardType[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [isExistMore, setIsExistMore] = React.useState(true);

  // ポートフォリオを整形する
  const formatPortfolio = React.useCallback((data: Portfolio[]) => {
    const formattedData: CardType[] = data.map((portfolio) => ({
      id: portfolio.id,
      name: portfolio.name,
      description: portfolio.description,
      tags: portfolio.tags,
      status: portfolio.status,
      githubLink: portfolio.githubLink,
      shareLink: portfolio.shareLink
    }));
    setPortfolios([...portfolios, ...formattedData]);
  }, [portfolios]);

  const fetchPortfolio = React.useCallback(async () => {
    setIsLoadingMore(true);

    const { portfolios: res } = await portfolioApi.getPortfolioList({
      offset: portfolios.length,
      limit: COUNT_PER_PAGE
    });

    if (res && res.length > 0) {
      formatPortfolio(res);
      if (res.length < COUNT_PER_PAGE) {
        setIsExistMore(false);
      }
    } else {
      setIsExistMore(false);
    }

    setIsLoadingMore(false);
  }, [portfolios, portfolioApi, formatPortfolio]);

  useEffect(() => {
    setIsLoading(true);
    fetchPortfolio()
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, [fetchPortfolio]);

  const buttonText = React.useMemo(() => {
    if (isLoadingMore) {
      return '読み込み中';
    } else {
      return isExistMore ? 'さらに読み込む' : '全て表示済み';
    }
  }, [isLoadingMore, isExistMore]);

  const isDisabledReadButton = React.useMemo(
    () => isLoadingMore || !isExistMore,
    [isLoadingMore, isExistMore]
  );

  return (
    <List
      isLoading={isLoading}
      isDisabledReadButton={isDisabledReadButton}
      portfolios={portfolios}
      buttonText={buttonText}
      fetchPortfolio={fetchPortfolio}
    />
  );
};

export default PortFolioList;
