import React from 'react';
import { PortfolioForm } from '../../types';
import FormOrganism from '../organisms/Form';
import ConfirmModal from '../organisms/ConfirmModal';

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

  return (
    <>
      {data && (
        <ConfirmModal
          data={data}
          isOpen={isOpen}
          handleConfirm={handleConfirm}
          closeModal={() => setIsOpen(false)}
        />
      )}
      <FormOrganism onClickSubmit={onClickSubmit} />
    </>
  );
};

export default Form;
