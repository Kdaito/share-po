import React from "react";
import { Configuration, UserApi } from "../openapi";
import { AuthContext } from "./AuthContext";

export const ApiContext = React.createContext<{
  userApi: UserApi;
}>({
  userApi: new UserApi(),
});

const BASE_PATH = import.meta.env.VITE_API_HOST;

const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = React.useContext(AuthContext);

  const config = React.useMemo(() => {
    if (token !== "") {
      return new Configuration({
        basePath: BASE_PATH,
        apiKey: `Bearer ${token}`,
      });
    }
    return new Configuration({
      basePath: BASE_PATH,
    });
  }, []);

  const userApi = React.useMemo(() => {
    return new UserApi(config);
  }, []);

  return (
    <ApiContext.Provider value={{ userApi }}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
