import React from 'react';
import { PortfolioForm } from '../../types';
import FormOrganism from '../organisms/Form';
import ConfirmModal from '../organisms/ConfirmModal';
import { Box } from '@mui/material';

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
    <Box sx={{ width: '900px', pt: '32px', margin: '0 auto' }}>
      {data && (
        <ConfirmModal
          data={data}
          isOpen={isOpen}
          handleConfirm={handleConfirm}
          closeModal={() => setIsOpen(false)}
        />
      )}
      <FormOrganism onClickSubmit={onClickSubmit} />
    </Box>
  );
};

export default Form;
