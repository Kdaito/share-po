import React from "react";
import Form from "../features/portfolio/components/templates/form";
import { Portfolio } from "../features/portfolio/types";

const AddPortfolio: React.FC = () => {
  const [data, setData] = React.useState<Portfolio>();

  const onClickConfirm = React.useCallback(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      <Form onClickConfirm={onClickConfirm} data={data} setData={setData} />
    </>
  );
};

export default AddPortfolio;
