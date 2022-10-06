import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import React from 'react';
import { auth } from '../api/firebase';
import { signInWithGoogle } from '../api/firebase/auth';

export const AuthContext = React.createContext<{
  initialized: boolean;
  token: string;
  firebaseUser: FirebaseUser | null;
  handleSignInWithGoogle: () => Promise<void>;
}>({
  initialized: false,
  token: '',
  firebaseUser: null,
  handleSignInWithGoogle: () => {
    throw new Error('failed sign in with google');
  }
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [initializedFirebaseUser, setInitializedFirebaseUser] =
    React.useState(false);
  const [initialized, setInitialized] = React.useState(false);
  const [token, setToken] = React.useState('');
  const [firebaseUser, setFirebaseUser] = React.useState<FirebaseUser | null>(
    null
  );

  // 認証第一段階
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setInitializedFirebaseUser(true);
    });
  }, []);

  // 認証第二段階
  React.useEffect(() => {
    // 第一段階が終わっていなかったらスキップする
    if (!initializedFirebaseUser) return;
    const f = async () => {
      // tokenを取得する
      if (firebaseUser) {
        const newToken = await firebaseUser.getIdToken();
        setToken(newToken);
      }
    };

    f()
      .catch(() => console.error('tokenの取得に失敗したわ'))
      .finally(() => {
        setInitialized(true);
      });
  }, [firebaseUser, initializedFirebaseUser]);

  // 認証情報作成処理
  const handleSignInWithGoogle = React.useCallback(async () => {
    setInitialized(false);
    setInitializedFirebaseUser(false);
    await signInWithGoogle((user) => {
      setFirebaseUser(user);
      setInitializedFirebaseUser(true);
      // 認証第二段階へ
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ initialized, firebaseUser, token, handleSignInWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
