import { useState } from 'react';

export default function useDialog(resetCallback) {
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    resetCallback();
    toggleOpen(false);
  };

  return { handleClose, open, toggleOpen };
}
