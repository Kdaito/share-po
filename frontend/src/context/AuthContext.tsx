import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import React from "react";
import { auth } from "../api/firebase";

export const AuthContext = React.createContext<{
  initialized: boolean;
  token: string;
  firebaseUser: FirebaseUser | null;
}>({
  initialized: false,
  token: "",
  firebaseUser: null,
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [initializedFirebaseUser, setInitializedFirebaseUser] =
    React.useState(false);
  const [initialized, setInitialized] = React.useState(false);
  const [token, setToken] = React.useState("");
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
        console.log(`Bearer ${newToken}`);
      }
    };

    f()
      .catch(() => console.error("tokenの取得に失敗したわ"))
      .finally(() => {
        console.log("認証処理終わり");
        setInitialized(true);
      });
  }, [firebaseUser, initializedFirebaseUser]);

  return (
    <AuthContext.Provider value={{ initialized, firebaseUser, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
