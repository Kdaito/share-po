import React from 'react';
import MUICard from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Card : React.FC = () => {
  const navigate = useNavigate();
  return (
    <MUICard sx={{ maxWidth: 400 }}>
      <CardContent sx={{display: 'flex', flexDirection: 'column', pb: 0}}>
        <Typography gutterBottom variant="h5" component="p" align='left'>
          88 マイク・ゲシツキ
        </Typography>
        <Typography variant="body2" color="text.secondary" align='left'>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
        <Chip label='TE' variant="outlined" sx={{width: '48px', mt: '8px'}} />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(`/edit-player/${1}`)}>選手編集</Button>
      </CardActions>
    </MUICard>
  );
}

export default Card;
