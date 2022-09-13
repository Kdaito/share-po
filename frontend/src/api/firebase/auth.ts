import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from ".";

const googleProvider = new GoogleAuthProvider();

// google認証
export const signInWithGoogle = async (callback: (uid: string) => void) => {
  await signInWithPopup(auth, googleProvider)
    .then((result) => {
      callback(result.user.uid);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`[${errorCode}]: ${errorMessage}`);
    });
}
