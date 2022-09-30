import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { auth } from "../api/firebase";
import { getToken } from "../api/firebase/auth";

export const AuthContext = React.createContext<{
  initialized: boolean;
  token: string;
  generateToken: () => Promise<void>;
}>({
  initialized: false,
  token: "",
  generateToken: () => {
    throw new Error("generate token failed");
  },
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [initialized, setInitialized] = React.useState(false);
  const [token, setToken] = React.useState("");

  React.useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        console.log(token);
        setToken(token);
      }
      setInitialized(true);
    });
  }, []);

  const generateToken = React.useCallback(async () => {
    await getToken((token: string) => {
      setToken(token);
    }).catch((e: Error) => {
      console.error(e);
      // ログアウトして認証ページに遷移する処理
    });
  }, []);

  return (
    <AuthContext.Provider value={{ initialized, token, generateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
