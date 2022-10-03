import React, { useEffect } from 'react';
import { User, CreateUserRequest } from '../openapi';
// import { User, UserApi, GetUserRequest, CreateUserRequest } from '../openapi';
// import { ApiContext } from './ApiContext';
import { AuthContext } from './AuthContext';

export const UserContext = React.createContext<{
  user: User;
  createUser: () => Promise<void>;
}>({
  user: {},
  createUser: () => {
    throw new Error('get user failed');
  }
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  // const [user, setUser] = React.useState<User>({});
  const [user] = React.useState<User>({});

  const { firebaseUser } = React.useContext(AuthContext);
  // const { userApi } = React.useContext(ApiContext);

  // firebaseUserがある場合はデータベースのユーザを取得する
  useEffect(() => {
    if (!firebaseUser) return;
    // const f = async () => {
    //   const request: GetUserRequest = { firebaseUid: firebaseUser.uid };
    //   const user = await userApi.getUser(request);
    //   setUser(user);
    // };
    // f().catch((e: Error) => console.error(e));
    console.log('user取得処理が走る');
  }, [firebaseUser]);

  const createUser = React.useCallback(async () => {
    if (!firebaseUser) {
      console.error('firebaseUserが設定されていません');
      return;
    }
    const request: CreateUserRequest = {
      body: {
        firebaseUid: firebaseUser.uid,
        name: firebaseUser.displayName || '',
        email: firebaseUser.email || ''
      }
    };

    // await userApi
    //   .createUser(request)
    //   .then((createdUser) => {
    //     setUser(createdUser);
    //   })
    //   .catch((e: Error) => {
    //     console.error(e);
    //   });
    console.log(request);
  }, [firebaseUser]);

  return (
    <UserContext.Provider value={{ user, createUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
