import { Box, Button } from '@mui/material';
import React, { useCallback } from 'react'

const AddPlayer: React.FC = () => {
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit')
  }, []);
  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Button type='submit'>追加する</Button>
    </Box>
  );
}

export default AddPlayer;