import { useState } from 'react';

const useEditMode = (resetCallback) => {
  const [openEditMode, toggleOpenEditMode] = useState(false);

  const handleCloseEditMode = (params) => {
    resetCallback(params);
    toggleOpenEditMode(false);
  };

  return { handleCloseEditMode, openEditMode, toggleOpenEditMode };
};

export default useEditMode;
