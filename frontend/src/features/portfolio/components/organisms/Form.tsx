import {
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Portfolio } from '../../types';

export type Props = {
  onClickSubmit: (value: Portfolio) => void;
  defaultValue?: Portfolio;
};

const AddPortfolio: React.FC<Props> = ({ onClickSubmit, defaultValue }) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Portfolio>({
    mode: 'onChange',
    defaultValues: defaultValue || {
      name: '',
      description: '',
      createdAt: null,
    },
  });

  const onSubmit: SubmitHandler<Portfolio> = (data) => {
    onClickSubmit(data);
  };

  return (
    <>
      <Typography variant="h5" component="p" sx={{ pb: '32px' }}>
        作品の情報を入力してください
      </Typography>
      <Grid
        container
        component="form"
        gap={2}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="Portfolio-name"
            label="作品名"
            {...register('name', { required: true })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="Portfolio-memo"
            label="作品情報"
            multiline
            rows={6}
            {...register('description', { required: true })}
          />
        </Grid>
        <Grid item xs={12}></Grid>
        <Button type="submit" fullWidth variant="contained" disabled={!isValid}>
          確認する
        </Button>
      </Grid>
    </>
  );
};

export default AddPortfolio;
