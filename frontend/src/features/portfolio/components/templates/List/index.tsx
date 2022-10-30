import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardType } from '../../../types';
import Component from './component';

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
    <Component
      isLoading={isLoading}
      isDisabledReadButton={isDisabledReadButton}
      portfolios={portfolios}
      buttonText={buttonText}
      fetchPortfolio={fetchPortfolio}
      handleNavigate={handleNavigate}
    />
  );
};

export default List;
