import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { auth } from '.';

const googleProvider = new GoogleAuthProvider();

// google認証
export const signInWithGoogle = async (callback: (user: User) => void) => {
  await signInWithPopup(auth, googleProvider)
    .then((result) => {
      callback(result.user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`[${errorCode}]: ${errorMessage}`);
    });
};

// token取得
export const getToken = async () => {
  if (!auth.currentUser) throw new Error('認証できてないよ');
  const token = await auth.currentUser.getIdToken(true).catch(() => {
    throw new Error('token取得失敗');
  });
  return token;
};
