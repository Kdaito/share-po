import { Box } from "@mui/material";
import React from "react";
import Form from "../features/portfolio/components/templates/Form";
import { Portfolio } from "../features/portfolio/types";

const AddPortfolio: React.FC = () => {
  const [data, setData] = React.useState<Portfolio>();

  const onClickConfirm = React.useCallback(() => {
    console.log(data);
  }, [data]);
  return (
    <Box sx={{ width: "900px", pt: '32px', margin: "0 auto" }}>
      <Form onClickConfirm={onClickConfirm} data={data} setData={setData} />
    </Box>
  );
};

export default AddPortfolio;
