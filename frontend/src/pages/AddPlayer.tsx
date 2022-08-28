import {
  Button,
  Chip,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Modal from "../components/Modal";
import { Player } from "../features/player/types";

const testPositionData = [
  { value: 1, text: "QB" },
  { value: 2, text: "TE" },
  { value: 3, text: "RB" },
];

const AddPlayer: React.FC = () => {
  const [newPlayerData, setNewPlayerData] = React.useState<Player | undefined>(
    undefined
  );
  const [isOpen, setIsOpen] = React.useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<Player>({
    mode: "onChange",
    defaultValues: {
      name: "",
      memo: "",
      number: null,
      position: 0,
    },
  });

  const getPositionText = (num: number | null | undefined) => {
    return testPositionData.find((pos) => pos.value === num)?.text || "";
  };

  const closeModal = React.useCallback(() => setIsOpen(false), []);

  const onSubmit: SubmitHandler<Player> = (data) => {
    setNewPlayerData(data);
    setIsOpen(true);
  };

  const onClickAdd = React.useCallback(() => {
    if (!newPlayerData) return;
    console.log(newPlayerData);
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <Box sx={{ width: "500px" }}>
          <Typography sx={{pb: '16px'}}>以下の内容で選手を追加します</Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            component="p"
            align="left"
          >
            名前
          </Typography>
          <Typography gutterBottom variant="h5" component="p" align="left">
            {newPlayerData?.name}
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
            {newPlayerData?.memo}
          </Typography>
          <Typography
            variant="h5"
            component="p"
            align="left"
          >
            背番号 : {newPlayerData?.number} / ポジション : {getPositionText(newPlayerData?.position)}
          </Typography>
          <Button fullWidth variant="contained" sx={{mt: '24px'}} onClick={onClickAdd}>
            追加する
          </Button>
        </Box>
      </Modal>
      <Typography variant="h5" component="p" sx={{ pb: "32px" }}>
        選手情報を入力してください
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
            id="player-name"
            label="選手名"
            {...register("name", { required: true })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="player-memo"
            label="選手情報"
            multiline
            rows={6}
            {...register("memo", { required: true })}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="position"
              rules={{
                required: true,
                validate: (value) => !!(value && value > 0),
              }}
              render={({
                field: { onChange, value, ref },
                fieldState: { error },
              }) => (
                <Select
                  id="player-position"
                  value={value}
                  onChange={(value) => onChange(value)}
                  inputRef={ref}
                >
                  <MenuItem value={0}>ポジションを選択</MenuItem>
                  {testPositionData.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.text}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            type="number"
            id="outlined-basic"
            label="選手番号"
            variant="outlined"
            {...register("number", { required: true })}
          />
        </Grid>
        <Grid item xs={12}></Grid>
        <Button type="submit" fullWidth variant="contained" disabled={!isValid}>
          追加する
        </Button>
      </Grid>
    </>
  );
};

export default AddPlayer;
