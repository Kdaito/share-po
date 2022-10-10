import Modal from '../../../../components/Modal';
import { Box } from '@mui/system';
import React from 'react';
import { Button, Typography } from '@mui/material';
import { PortfolioForm } from '../../types';

type Props = {
  data: PortfolioForm;
  isOpen: boolean;
  closeModal: () => void;
  handleConfirm: () => void;
};

const ConfirmModal: React.FC<Props> = ({
  data,
  isOpen,
  closeModal,
  handleConfirm
}) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Box sx={{ width: '650px', overflow: '' }}>
        <Typography sx={{ pb: '16px' }}>
          以下の内容で入力を完了します
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          component="p"
          align="left"
        >
          作品名
        </Typography>
        <Typography gutterBottom variant="h5" component="p" align="left">
          {data.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          component="p"
          align="left"
        >
          作品情報
        </Typography>
        <Typography gutterBottom variant="body2" sx={{ overflowWrap: 'break-word' }}>
          {data.description}
        </Typography>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: '24px' }}
          onClick={handleConfirm}
        >
          完了する
        </Button>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
