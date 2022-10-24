import React, { useEffect } from 'react';
import { User } from '../openapi';
import { ApiContext } from './ApiContext';
import { AuthContext } from './AuthContext';

export const UserContext = React.createContext<{
  user: User;
}>({
  user: {}
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = React.useState<User>({});

  const { firebaseUser, token } = React.useContext(AuthContext);
  const { userApi } = React.useContext(ApiContext);

  // firebaseUserがある場合はデータベースのユーザを取得する
  useEffect(() => {
    if (!firebaseUser || token === '') return;
    const f = async () => {
      const fetchUser = await userApi.getUser();
      setUser(fetchUser);
    };
    f().catch((e: Error) => console.error(e));
  }, [firebaseUser, token, userApi]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
