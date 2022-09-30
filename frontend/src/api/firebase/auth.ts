import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from ".";

const googleProvider = new GoogleAuthProvider();

// google認証
export const signInWithGoogle = async (callback: (uid: string) => void) => {
  await signInWithPopup(auth, googleProvider)
    .then((result) => {
      callback(result.user.uid);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`[${errorCode}]: ${errorMessage}`);
    });
};

// token取得
export const getToken = async (setIdToken: (idToken: string) => void) => {
  if (!auth.currentUser) throw new Error("認証できてないよ");
  await auth.currentUser
    .getIdToken(true)
    .then((idToken) => setIdToken(idToken))
    .catch(() => {
      throw new Error("token取得失敗");
    });
};
