import { Box, Grid, Pagination } from "@mui/material";
import React from "react";
import Card from "../features/player/components/Card";

const ITEM_COUNT = 81;
const COUNT_PER_PAGE = 10;

const PlayerList: React.FC = () => {
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
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={6}>
          <Card />
        </Grid>
        <Grid item xs={6}>
          <Card />
        </Grid>
        <Grid item xs={6}>
          <Card />
        </Grid>
        <Grid item xs={6}>
          <Card />
        </Grid>
        <Grid item xs={6}>
          <Card />
        </Grid>
      </Grid>
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

export default PlayerList;
