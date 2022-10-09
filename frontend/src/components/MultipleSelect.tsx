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
  choices: Choice[];
  value: number[];
  setValue: (newValue: number[]) => void;
};

const MultipleSelect: React.FC<Props> = ({ id, choices, value, setValue }) => {
  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value }
    } = event;
    if (typeof value !== 'string') {
      setValue(value);
    }
  };

  const getValue = (id: number | undefined) => {
    if (!id) return;
    const text = choices.find((choice) => choice.id === id)?.text;
    return text || '';
  };

  const labelId = React.useMemo(() => `${id}-label`, []);
  const inputId = React.useMemo(() => `select-${id}`, []);

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id={labelId}>Chip</InputLabel>
        <Select
          labelId={labelId}
          id={id}
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput id={inputId} label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {choices.map((choice) => (
            <MenuItem key={choice.id} value={getValue(choice.id)}>
              {choice.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelect;
