import React from 'react';
import { Box } from '@mui/material';
import Form from '../features/portfolio/components/templates/Form';
import { PortfolioForm } from '../features/portfolio/types';
import { ApiContext } from '../context/ApiContext';
import { useNavigate } from 'react-router-dom';

const AddPortfolio: React.FC = () => {
  const [data, setData] = React.useState<PortfolioForm>();

  const navigate = useNavigate();

  const { portfolioApi } = React.useContext(ApiContext);

  const onClickConfirm = React.useCallback(async () => {
    await portfolioApi
      .createPortfolio({
        body: {
          ...data,
          status: data?.status || undefined
        }
      })
      .then(() => {
        navigate('/');
      })
      .catch((e) => {
        // TODO エラーモーダルを表示するなどの処理を追加する
        console.error(e);
      });
    console.log(data);
  }, [data]);

  return (
    <Box sx={{ width: '900px', pt: '32px', margin: '0 auto' }}>
      <Form onClickConfirm={onClickConfirm} data={data} setData={setData} />
    </Box>
  );
};

export default AddPortfolio;
