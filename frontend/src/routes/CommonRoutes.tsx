import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CommonRoutes: React.FC = () => {
  const { token, initialized } = React.useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (initialized && token !== "") {
      navigate(-1);
    }
  }, [initialized, token]);

  // 初期化処理が終わっていない場合はローディング画面へ
  if (!initialized) return <>loading...</>;

  return <Outlet />;
};

export default CommonRoutes;
