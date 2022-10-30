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
import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import MultipleSelect from '../../../../../components/MultipleSelect';
import { ChoiceContext } from '../../../../../context/ChoiceContext';
import { PortfolioForm as PortfolioFormType } from '../../../types';
import { portfolioSchema } from '../../../validation';
import { UserContext } from '../../../../../context/UserContext';

export type Props = {
  onClickSubmit: (value: PortfolioFormType) => void;
  defaultValue?: PortfolioFormType;
};

const PortfolioForm: React.FC<Props> = ({ onClickSubmit, defaultValue }) => {
  const { portfolioStatus, portfolioTag } = React.useContext(ChoiceContext);
  const { user } = React.useContext(UserContext);

  const defaultFormValue: PortfolioFormType = React.useMemo(() => {
    if (!defaultValue)
      return {
        name: '',
        description: '',
        status: 1,
        userId: user.id as number,
        tags: [],
        gitHubLink: '',
        shareLink: ''
      };
    return defaultValue;
  }, [defaultValue, user]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<PortfolioFormType>({
    mode: 'onChange',
    resolver: yupResolver(portfolioSchema),
    defaultValues: defaultFormValue
  });

  useEffect(() => {
    reset(defaultFormValue);
  }, [reset, defaultFormValue]);

  const onSubmit: SubmitHandler<PortfolioFormType> = (data) => {
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
        gap={3}
        sx={{ pb: 8 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="portfolio-name"
            label="作品名"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="portfolio-description"
            label="作品情報"
            multiline
            rows={6}
            error={!!errors.description}
            helperText={errors.description?.message}
            {...register('description')}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="portfolio-link"
                label="共有リンク"
                {...register('shareLink')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="portfolio-git-link"
                label="GitHubリンク"
                {...register('gitHubLink')}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="tags"
            render={({ field: { onChange, value } }) => (
              <MultipleSelect
                id="portfolio-tag"
                label="タグ"
                choices={portfolioTag}
                value={value}
                setValue={onChange}
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="portfolio-status">ステータス</InputLabel>
            <Controller
              control={control}
              name="status"
              render={({ field: { onChange, value } }) => (
                <Select
                  labelId="portfolio-status"
                  id="portfolio-status-select"
                  value={value}
                  label="ステータス"
                  onChange={onChange}
                >
                  {portfolioStatus.map((status) => (
                    <MenuItem key={status.id} value={status.id}>
                      {status.text}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Button type="submit" sx={{ mt: 2 }} fullWidth variant="contained">
          確認する
        </Button>
      </Grid>
    </>
  );
};

export default PortfolioForm;
