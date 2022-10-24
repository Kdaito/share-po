import React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

type Choice = {
  id?: number | undefined;
  text?: string | undefined;
};

type Props = {
  id: string;
  label: string;
  choices: Choice[];
  value: number[];
  setValue: (newValue: number[]) => void;
};

const MultipleSelect: React.FC<Props> = ({ id, label, choices, value, setValue }) => {
  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value: targetValue }
    } = event;
    if (typeof targetValue !== 'string') {
      setValue(targetValue);
    }
  };

  const getValue = (val: number | undefined) => {
    if (!val) return;
    const text = choices.find((choice) => choice.id === val)?.text;
    return text || '';
  };

  const labelId = React.useMemo(() => `${id}-label`, [id]);
  const inputId = React.useMemo(() => `select-${id}`, [id]);

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          labelId={labelId}
          id={id}
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput id={inputId} label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((val) => (
                <Chip key={val} label={getValue(val)} />
              ))}
            </Box>
          )}
        >
          {choices.map((choice) => (
            <MenuItem key={choice.id} value={choice.id}>
              {choice.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelect;
