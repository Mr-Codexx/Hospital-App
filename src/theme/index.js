import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#f8fafd',
      100: '#eef2f7',
      200: '#d4dce6',
      300: '#aab8cb',
      400: '#7b8da3',
      500: '#5c6b80',
      600: '#45505e',
      700: '#2d3748',
      800: '#1a202c',
      900: '#171923',
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  breakpoints: {
    sm: '30em',  // 480px
    md: '48em',  // 768px
    lg: '62em',  // 992px
    xl: '80em',  // 1280px
    '2xl': '96em', // 1536px
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        },
      },
    },
    Container: {
      baseStyle: {
        maxW: 'container.xl',
        px: { base: 4, md: 6 },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'semibold',
        letterSpacing: '-0.025em',
      },
      sizes: {
        xl: {
          fontSize: ['4xl', null, '5xl'],
        },
      },
    },
  },
  styles: {
    global: (props) => ({
      'html, body': {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.50', // Change background color for light/dark mode
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
        lineHeight: 'base',
        margin: 0, // Remove default margin
        padding: 0, // Remove default padding
      },
      '*::placeholder': {
        color: props.colorMode === 'dark' ? 'whiteAlpha.600' : 'gray.500',
      },
    }),
  },
});
export default theme;
