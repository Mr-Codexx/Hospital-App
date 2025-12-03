import React from 'react';
import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import AppRoutes from './router/AppRoutes';
import ErrorBoundary from './components/ErrorBoundary';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#E6F6FF',
      100: '#BAE3FF',
      200: '#7CC4FA',
      300: '#47A3F3',
      400: '#2186EB',
      500: '#0967D2',
      600: '#0552B5',
      700: '#03449E',
      800: '#01337D',
      900: '#002159',
    },
    medical: {
      red: '#E53E3E',
      green: '#38A169',
      blue: '#3182CE',
      purple: '#805AD5',
      orange: '#DD6B20',
    }
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      'html, body': {
        fontSize: '14px',
      },
      '*': {
        boxSizing: 'border-box',
      }
    }
  }
});

function App() {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <ErrorBoundary>
          <NotificationProvider>
            <AuthProvider>
              <Router>
                <AppRoutes />
              </Router>
            </AuthProvider>
          </NotificationProvider>
        </ErrorBoundary>
      </ChakraProvider>
    </>
  );
}

export default App;