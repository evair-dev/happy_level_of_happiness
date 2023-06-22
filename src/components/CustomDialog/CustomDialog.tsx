import { SubjectManager } from '@/models';
import Dialog from '@mui/material/Dialog';
import React, { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export const dialogOpenSubject$ = new SubjectManager<boolean>();

export const CustomDialog = ({ children }: Props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openSubject$ = dialogOpenSubject$.getSubject.subscribe((value) => setOpen(value));
    return () => {
      openSubject$.unsubscribe();
    };
  }, []);

  const handleExit = () => {
    dialogOpenSubject$.setSubject = false;
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleExit()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        {children}
      </Dialog>
    </div>
  );
};

export default CustomDialog;
