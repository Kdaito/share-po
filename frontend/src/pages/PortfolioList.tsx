import { Box, Button, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { ApiContext } from '../context/ApiContext';
import Card from '../features/portfolio/components/organisms/Card';
import { Portfolio } from '../openapi';

const COUNT_PER_PAGE = 10;

const PortFolioList: React.FC = () => {
  const { portfolioApi } = React.useContext(ApiContext);

  const [portfolios, setPortfolios] = React.useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [isExistMore, setIsExistMore] = React.useState(true);

  const fetchPortfolio = React.useCallback(async () => {
    setIsLoadingMore(true);

    const { portfolios: res } = await portfolioApi.getPortfolioList({
      offset: portfolios.length,
      limit: COUNT_PER_PAGE
    });

    if (res && res.length > 0) {
      setPortfolios([...portfolios, ...res]);
      if (res.length < COUNT_PER_PAGE) {
        setIsExistMore(false);
      }
    } else {
      setIsExistMore(false);
    }

    setIsLoadingMore(false);
  }, [portfolios, portfolioApi]);

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

  return (
    <>
      {isLoading ? (
        <>...loading</>
      ) : (
        <>
          <Stack
            spacing={2}
            sx={{
              width: '100%',
              maxWidth: '900px',
              margin: '0 auto',
              pt: '32px'
            }}
          >
            {portfolios.map((portfolio) => (
              <Card key={portfolio.id} />
            ))}
          </Stack>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pt: 6,
              pb: 8
            }}
          >
            <Button
              variant="contained"
              sx={{ width: '200px' }}
              disabled={isLoadingMore || !isExistMore}
              onClick={() => fetchPortfolio()}
            >
              {buttonText}
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default PortFolioList;
