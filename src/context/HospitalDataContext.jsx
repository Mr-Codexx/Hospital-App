import React, { createContext, useContext } from 'react';
import { useHospitalData } from '../hooks/useHospitalData';

const HospitalDataContext = createContext(null);

export const HospitalDataProvider = ({ children }) => {
  const hospitalData = useHospitalData();

  return (
    <HospitalDataContext.Provider value={hospitalData}>
      {children}
    </HospitalDataContext.Provider>
  );
};

export const useHospitalDataContext = () => {
  const context = useContext(HospitalDataContext);
  if (!context) {
    throw new Error('useHospitalDataContext must be used within HospitalDataProvider');
  }
  return context;
};