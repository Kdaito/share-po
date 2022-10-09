import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import MultipleSelect from '../../../../components/MultipleSelect';
import { ChoiceContext } from '../../../../context/ChoiceContext';
import { Portfolio } from '../../types';

export type Props = {
  onClickSubmit: (value: Portfolio) => void;
  defaultValue?: Portfolio;
};

const PortfolioForm: React.FC<Props> = ({ onClickSubmit, defaultValue }) => {
  const { portfolioStatus, portfolioTag } = React.useContext(ChoiceContext);

  const [tag, setTag] = React.useState<number[]>([]);

  const {
    register,
    handleSubmit,
    formState: { isValid }
  } = useForm<Portfolio>({
    mode: 'onChange',
    defaultValues: defaultValue || {
      name: '',
      description: '',
      createdAt: null
    }
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
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="portfolio-status">ステータス</InputLabel>
            <Select
              labelId="portfolio-status"
              id="portfolio-status-select"
              // value={age}
              label="ステータス"
              // onChange={handleChange}
            >
              {portfolioStatus.map((status) => (
                <MenuItem key={status.id} value={status.id}>
                  {status.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <MultipleSelect
            id="portfolio-tag"
            choices={portfolioTag}
            value={tag}
            setValue={setTag}
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

export default PortfolioForm;
