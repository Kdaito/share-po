import React from 'react';
import MUICard from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Chip, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/system';

const Card : React.FC = () => {
  const navigate = useNavigate();
  return (
    <MUICard sx={{padding: '16px'}} onClick={() => console.log('こんにちは')}>
      <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px'}}>
        <Box sx={{width: '304px', height: '200px', flexShrink: 0}}>
          <Skeleton variant='rectangular' width={'100%'} height={'100%'} />
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', pb: 0, height: '200px', textAlign: 'left'}}>
          <Typography gutterBottom variant="h5" component="p">
            シェアポ
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{height: '96px'}}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
          <Typography component='p' color="text.secondary" variant="body2">
            作成者: 小林大斗
          </Typography>
          <Typography component='p' color="text.secondary" variant="body2">
            投稿日: 2022年06月20日
          </Typography>
          {/* TODO タグ機能 いずれ作る */}
          {/* <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', overflow: 'wrap', width: '100%', gap: '8px', flexGrow: 0}}>
            <Chip label='React.js' variant="outlined" size='small' />
          </Box> */}
        </Box>
      </CardContent>
    </MUICard>
  );
}

export default Card;
