import React from 'react';
import {
  Configuration,
  UserApi,
  PortfolioStatusApi,
  PortfolioTagApi
} from '../openapi';
import { AuthContext } from './AuthContext';

export const ApiContext = React.createContext<{
  userApi: UserApi;
  portfolioStatusApi: PortfolioStatusApi;
  portfolioTagApi: PortfolioTagApi;
}>({
  userApi: new UserApi(),
  portfolioStatusApi: new PortfolioStatusApi(),
  portfolioTagApi: new PortfolioTagApi()
});

const BASE_PATH = import.meta.env.VITE_API_HOST;

const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = React.useContext(AuthContext);

  // 認証が必要なapi用
  const authConfig = React.useMemo(() => {
    if (token !== '') {
      return new Configuration({
        basePath: BASE_PATH,
        apiKey: `Bearer ${token}`
      });
    }
    return new Configuration({
      basePath: BASE_PATH
    });
  }, [token]);

  // 認証が必要でないapi用
  const commonConfig = React.useMemo(() => {
    return new Configuration({
      basePath: BASE_PATH
    });
  }, []);

  // apiの初期化
  const { userApi, portfolioStatusApi, portfolioTagApi } = React.useMemo(() => {
    return {
      userApi: new UserApi(authConfig),
      portfolioStatusApi: new PortfolioStatusApi(commonConfig),
      portfolioTagApi: new PortfolioTagApi(commonConfig)
    };
  }, [authConfig, commonConfig]);

  return (
    <ApiContext.Provider
      value={{ userApi, portfolioStatusApi, portfolioTagApi }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
