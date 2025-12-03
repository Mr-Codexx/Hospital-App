import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

const AuthLayout = () => {
  return (
    <Box minH="100vh" bg="gray.50">
      <Outlet />
    </Box>
  );
};

export default AuthLayout;