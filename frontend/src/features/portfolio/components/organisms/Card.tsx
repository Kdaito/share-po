import React from 'react';
import MUICard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Chip } from '@mui/material';
import { CardType } from '../../types';
import { ChoiceContext } from '../../../../context/ChoiceContext';

type Props = {
  handleNavigate: (id: number | undefined) => void;
  data: CardType;
};

const Card: React.FC<Props> = ({ handleNavigate, data }) => {
  const { portfolioStatus, portfolioTag, getTextsOfChoice, getTextOfChoice } =
    React.useContext(ChoiceContext);

  const statusText = React.useMemo(
    () => getTextOfChoice(portfolioStatus, data.status),
    [data.status, portfolioStatus, getTextOfChoice]
  );

  const tagsText = React.useMemo(
    () => getTextsOfChoice(portfolioTag, data.tags || []),
    [data.tags, portfolioTag, getTextsOfChoice]
  );

  return (
    <MUICard sx={{ padding: '16px' }} onClick={() => handleNavigate(data.id)}>
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px'
        }}
      >
        <Box
          sx={{
            pb: 0,
            minHeight: '200px',
            width: '100%',
            textAlign: 'left'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'left',
              gap: '16px'
            }}
          >
            <Typography gutterBottom variant="h5" component="p">
              {data.name}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="p"
              color="primary"
              sx={{
                border: 'solid 1px',
                px: '4px',
                py: '2px',
                borderRadius: '4px'
              }}
            >
              {statusText}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              overflow: 'wrap',
              width: '100%',
              gap: '8px',
              flexGrow: 0,
              my: '8px'
            }}
          >
            {tagsText.map((tag, i) => (
              <Chip key={i} label={tag} variant="outlined" size="small" />
            ))}
          </Box>
          <Typography component="p" color="text.secondary" variant="body2">
            作成者: 小林大斗
          </Typography>
          <Typography component="p" color="text.secondary" variant="body2">
            投稿日: 2022年06月20日
          </Typography>
        </Box>
      </CardContent>
    </MUICard>
  );
};

export default Card;
