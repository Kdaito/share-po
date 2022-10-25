import Modal from '../../../../components/Modal';
import { Box } from '@mui/system';
import React from 'react';
import { Button, Chip, Typography } from '@mui/material';
import { PortfolioForm } from '../../types';
import { ChoiceContext } from '../../../../context/ChoiceContext';

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
  const { getTextOfChoice, getTextsOfChoice, portfolioTag, portfolioStatus } =
    React.useContext(ChoiceContext);

  const status = React.useMemo(() => {
    const text = getTextOfChoice(portfolioStatus, data.status);
    return text;
  }, [data.status, getTextOfChoice, portfolioStatus]);

  const tags = React.useMemo(() => {
    const texts = getTextsOfChoice(portfolioTag, data.tags);
    return texts;
  }, [data.tags, portfolioTag, getTextsOfChoice]);

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
          sx={{ pt: '8px' }}
        >
          作品情報
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          sx={{ overflowWrap: 'break-word' }}
        >
          {data.description}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          component="p"
          align="left"
          sx={{ pt: '8px' }}
        >
          共有リンク
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          sx={{ overflowWrap: 'break-word' }}
        >
          {data.shareLink}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          component="p"
          align="left"
          sx={{ pt: '8px' }}
        >
          Githubリンク
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          sx={{ overflowWrap: 'break-word' }}
        >
          {data.gitHubLink}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          component="p"
          align="left"
          sx={{ pt: '8px' }}
        >
          ステータス: {status}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          component="p"
          align="left"
          sx={{ pt: '8px' }}
        >
          タグ:
        </Typography>
        <Box sx={{ width: '100%', display: 'flex', border: 'solid 1px #DCDCDC', gap: '10px', p: 1, borderRadius: '4px' }}>
          {tags.map((tag, i) => (
            <Chip key={i} label={tag} />
          ))}
        </Box>
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
