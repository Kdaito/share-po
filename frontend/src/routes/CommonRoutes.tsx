import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CommonRoutes: React.FC = () => {
  const { token, initialized } = React.useContext(AuthContext);
  const navigate = useNavigate();

  // 初期化処理が終わっていない場合はローディング画面へ
  if (!initialized) return (<>loading...</>);

  // 認証トークンが発行されている場合は認証画面へ遷移させない
  if (token !== "") {
    console.log(token);
    navigate(-1);
  }

  return (
    <Outlet/>
  );
};

export default CommonRoutes;