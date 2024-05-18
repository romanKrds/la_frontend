import React, {createContext, ReactNode, useContext, useState} from "react";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface ErrorContextAPI {
  showError: (message: string) => void
}

// @ts-ignore
const ErrorContext = createContext<ErrorContextAPI>({ showError: undefined });
const snackBarDelay = 3000;
export const ErrorProvider = ({children}: { children: ReactNode }) => {
  const [error, setError] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small"/>
      </IconButton>
    </React.Fragment>
  );

  return (
    <ErrorContext.Provider
      value={{
        showError: (err: string) => {
          setError(err);
          setOpen(true);
        },
      }}
    >
      {children}

      <Snackbar
        open={open}
        autoHideDuration={snackBarDelay}
        onClose={handleClose}
        message={error}
        action={action}
      />
    </ErrorContext.Provider>
  )
}

export const useError = () => useContext<ErrorContextAPI>(ErrorContext)