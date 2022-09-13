import { Box, Grid, Pagination, Stack } from "@mui/material";
import React from "react";
import Card from "../features/portfolio/components/organisms/Card";

const ITEM_COUNT = 81;
const COUNT_PER_PAGE = 10;

const PortFolioList: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleChangePage = React.useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => setCurrentPage(page),
    []
  );
  const totalPage = React.useMemo(
    () => Math.ceil(ITEM_COUNT / COUNT_PER_PAGE),
    []
  );
  return (
    <>
      <Stack spacing={2} sx={{ width: "100%", maxWidth: "900px", margin: '0 auto', pt: '32px' }}>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </Stack>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: 8,
        }}
      >
        <Pagination
          count={totalPage}
          page={currentPage}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </>
  );
};

export default PortFolioList;
