import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import BlockButton from '../Buttons/BlockButton';
import CardBody from '../CardBody/CardBody';

const PopupDialog = ({ open, content, title, handleClose, handleSubmit }) => {
  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>{content}</DialogContent>
          <DialogActions>
            <BlockButton type="submit" />
          </DialogActions>
        </form>
      </CardBody>
    </Dialog>
  );
};

export default PopupDialog;
