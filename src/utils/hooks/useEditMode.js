import useToggle from './useToggle';

const useEditMode = (resetCallback) => {
  const [openEditMode, toggleOpenEditMode] = useToggle(false);

  const handleCloseEditMode = (params) => {
    resetCallback(params);
    toggleOpenEditMode(false);
  };

  return { handleCloseEditMode, openEditMode, toggleOpenEditMode };
};

export default useEditMode;
