import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { auth } from "../api/firebase";

export const AuthContext = React.createContext<{
  initialized: boolean;
  token: string;
}>({
  initialized: false,
  token: "",
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

  return (
    <AuthContext.Provider value={{ initialized, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
