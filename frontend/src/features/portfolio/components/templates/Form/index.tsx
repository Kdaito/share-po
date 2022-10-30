import React from 'react';
import { PortfolioForm } from '../../../types';
import Component from './component';

type Props = {
  data: PortfolioForm | undefined;
  setData: (data: PortfolioForm | undefined) => void;
  onClickConfirm: () => void;
};

const Form: React.FC<Props> = ({ data, setData, onClickConfirm }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleConfirm = React.useCallback(() => {
    setIsOpen(false);
    onClickConfirm();
  }, [setIsOpen, onClickConfirm]);

  const onClickSubmit = React.useCallback(
    (submittedData: PortfolioForm) => {
      setData(submittedData);
      setIsOpen(true);
    },
    [setData, setIsOpen]
  );

  const closeModal = React.useCallback(() => setIsOpen(false), []);

  return (
    <Component
      data={data}
      isOpen={isOpen}
      handleConfirm={handleConfirm}
      onClickSubmit={onClickSubmit}
      closeModal={closeModal}
    />
  );
};

export default Form;
