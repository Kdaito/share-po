import React from 'react';
import { Portfolio } from '../../types';
import FormOrganism from '../organisms/Form';
import ConfirmModal from '../organisms/ConfirmModal';

type Props = {
  data: Portfolio | undefined;
  setData: (data: Portfolio | undefined) => void;
  onClickConfirm: () => void;
};

const Form: React.FC<Props> = ({ data, setData, onClickConfirm }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleConfirm = React.useCallback(() => {
    setIsOpen(false);
    onClickConfirm();
  }, [setIsOpen, onClickConfirm]);

  const onClickSubmit = React.useCallback((submittedData: Portfolio) => {
    setData(submittedData);
    setIsOpen(true);
  }, [setData, setIsOpen]);

  return (
    <>
      {data && (
        <ConfirmModal
          data={data}
          isOpen={isOpen}
          handleConfirm={handleConfirm}
          closeModal={() => setIsOpen(false)}
        />
      )}
      <FormOrganism onClickSubmit={onClickSubmit} />
    </>
  );
};

export default Form;
