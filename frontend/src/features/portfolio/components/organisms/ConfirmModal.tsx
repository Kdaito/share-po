import Modal from '../../../../components/Modal';
import { Box } from '@mui/system';
import React from 'react';
import { Button, Typography } from '@mui/material';
import { Portfolio } from '../../types';

type Props = {
  data: Portfolio;
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
      <Box sx={{ width: '500px' }}>
        <Typography sx={{ pb: '16px' }}>
          以下の内容で入力を完了します
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          component="p"
          align="left"
        >
          名前
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
          選手情報
        </Typography>
        <Typography gutterBottom variant="h5" component="p" align="left">
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
