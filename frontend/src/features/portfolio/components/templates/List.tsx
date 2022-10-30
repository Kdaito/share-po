import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack } from '@mui/material';
import Card from '../organisms/Card';
import { CardType } from '../../types';

type Props = {
  isLoading: boolean;
  isDisabledReadButton: boolean;
  portfolios: CardType[];
  buttonText: string;
  fetchPortfolio: () => Promise<void>;
};

const List: React.FC<Props> = ({
  isLoading,
  isDisabledReadButton,
  portfolios,
  buttonText,
  fetchPortfolio
}) => {
  const navigate = useNavigate();
  const handleNavigate = React.useCallback(
    (id: number | undefined) => {
      if (id) {
        navigate(`/portfolios/${id}`);
      }
    },
    [navigate]
  );

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
              <Card
                key={portfolio.id}
                data={portfolio}
                handleNavigate={handleNavigate}
              />
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
              disabled={isDisabledReadButton}
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

export default List;
