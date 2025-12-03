import React from 'react';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          minH="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="gray.50"
          p={4}
        >
          <VStack spacing={6} maxW="md" textAlign="center">
            <Heading size="xl" color="red.500">
              Something went wrong
            </Heading>
            
            <Text color="gray.600">
              The application encountered an unexpected error. Our team has been notified.
            </Text>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Box
                p={4}
                bg="red.50"
                borderRadius="md"
                textAlign="left"
                fontFamily="monospace"
                fontSize="sm"
                maxH="200px"
                overflow="auto"
              >
                <Text fontWeight="bold" color="red.600">
                  {this.state.error.toString()}
                </Text>
                <Text mt={2} color="gray.600">
                  {this.state.errorInfo?.componentStack}
                </Text>
              </Box>
            )}

            <VStack spacing={3}>
              <Button
                colorScheme="brand"
                onClick={this.handleReset}
                size="lg"
              >
                Reload Application
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
              >
                Go to Home Page
              </Button>
            </VStack>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;