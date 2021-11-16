import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import BlockButton from '../Buttons/BlockButton';
import CardBody from '../CardBody/CardBody';

const PopupDialog = ({ open, content, title, handleClose, handleSubmit }) => {
  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <DialogTitle
            style={{ textAlign: 'center', textTransform: 'capitalize' }}
          >
            {title}
          </DialogTitle>
          <DialogContent>
            {content}
            <BlockButton type="submit" fullWidth>
              Submit
            </BlockButton>
          </DialogContent>
        </form>
      </CardBody>
    </Dialog>
  );
};

export default PopupDialog;
