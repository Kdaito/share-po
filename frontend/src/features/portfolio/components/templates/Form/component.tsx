import React from 'react';
import { PortfolioForm } from '../../../types';
import FormOrganism from '../../organisms/Form';
import ConfirmModal from '../../organisms/ConfirmModal';
import { Box } from '@mui/material';

type Props = {
  data: PortfolioForm | undefined;
  isOpen: boolean;
  handleConfirm: () => void;
  closeModal: () => void;
  onClickSubmit: (value: PortfolioForm) => void
};

const Component: React.FC<Props> = ({ data, isOpen, handleConfirm, closeModal, onClickSubmit }) => (
  <Box sx={{ width: '900px', pt: '32px', margin: '0 auto' }}>
    {data && (
      <ConfirmModal
        data={data}
        isOpen={isOpen}
        handleConfirm={handleConfirm}
        closeModal={closeModal}
      />
    )}
    <FormOrganism onClickSubmit={onClickSubmit} />
  </Box>
);

export default Component;
