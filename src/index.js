import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import theme from './theme';
import { AuthProvider } from './context/AuthContext';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      {/* <BrowserRouter> */}
        <AuthProvider>
          <App />
        </AuthProvider>
      {/* </BrowserRouter> */}
    </ChakraProvider>
  </React.StrictMode>
);