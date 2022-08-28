import React from "react";
import Form from "../features/player/components/Form";
import { Player } from "../features/player/types";

const AddPlayer: React.FC = () => {
  const onClickConfirm = React.useCallback((data: Player) => {
    console.log(data)
  }, []);
  return (
    <>
      <Form onClickConfirm={onClickConfirm}/>
    </>
  );
};

export default AddPlayer;
