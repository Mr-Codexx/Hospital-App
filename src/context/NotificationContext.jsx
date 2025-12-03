import React, { createContext, useContext } from 'react';
import { useToast } from '@chakra-ui/react';
import Swal from 'sweetalert2';

const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const toast = useToast();

  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const showSuccess = (title, description) => {
    showToast(title, description, 'success');
  };

  const showError = (title, description) => {
    showToast(title, description, 'error');
  };

  const showInfo = (title, description) => {
    showToast(title, description, 'info');
  };

  const showWarning = (title, description) => {
    showToast(title, description, 'warning');
  };

  const confirmDialog = async (title, text, confirmButtonText = 'Confirm') => {
    const result = await Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3182CE',
      cancelButtonColor: '#d33',
      confirmButtonText,
      cancelButtonText: 'Cancel',
    });
    return result.isConfirmed;
  };

  const successDialog = async (title, text) => {
    await Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonColor: '#3182CE',
    });
  };

  const errorDialog = async (title, text) => {
    await Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonColor: '#d33',
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        showSuccess,
        showError,
        showInfo,
        showWarning,
        confirmDialog,
        successDialog,
        errorDialog,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);