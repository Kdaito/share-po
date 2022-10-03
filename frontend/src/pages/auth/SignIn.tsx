import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { signInWithGoogle } from '../../api/firebase/auth';
import SignInImage from '../../assets/signIn.png';

const SignIn: React.FC = () => {
  const handleSignInWithGoogle = React.useCallback(async () => {
    await signInWithGoogle((uid) => {
      console.log(uid);
    });
  }, []);
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '700px',
          width: '900px'
        }}
      >
        <Box
          sx={{
            height: '500px',
            width: '500px',
            objectFit: 'contain',
            overflow: 'hidden',
            flexShrink: 0
          }}
        >
          <img
            style={{
              width: '100%',
              height: '100%',
              transform: 'scale(1.6, 1.6)'
            }}
            src={SignInImage}
            alt="signIn page image"
          />
        </Box>
        <Box>
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: '600', pb: '8px' }}
          >
            Let's start share-po !
          </Typography>
          <Typography variant="body1" sx={{ pb: '24px' }}>
            シェアポはポートフォリオを簡単に投稿、評価できるアプリです。
          </Typography>
          <Button variant="contained" onClick={handleSignInWithGoogle}>
            googleでログイン
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
