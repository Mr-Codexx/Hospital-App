import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiLock, FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Flex minH="100vh" align="center" justify="center" bg={bgColor}>
      <Box textAlign="center" py={10} px={6} maxW="md">
        <Box
          display="inline-flex"
          p={4}
          bg="red.100"
          borderRadius="full"
          color="red.500"
          mb={6}
        >
          <Icon as={FiLock} w={12} h={12} />
        </Box>
        
        <Heading as="h1" size="xl" mb={4}>
          Access Denied
        </Heading>
        
        <Text fontSize="lg" color="gray.600" mb={6}>
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </Text>

        <VStack spacing={4}>
          <Button
            colorScheme="brand"
            size="lg"
            leftIcon={<FiHome />}
            onClick={() => navigate('/')}
          >
            Return to Home
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/login')}
          >
            Login with Different Account
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Unauthorized;