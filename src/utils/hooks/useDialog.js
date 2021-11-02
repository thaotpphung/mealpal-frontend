import { useState } from 'react';

const useDialog = (resetCallback) => {
  const [open, toggleOpen] = useState(false);

  const handleClose = (params) => {
    resetCallback(params);
    toggleOpen(false);
  };

  return { handleClose, open, toggleOpen };
};

export default useDialog;
