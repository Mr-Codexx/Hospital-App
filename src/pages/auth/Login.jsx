import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Text,
  useColorModeValue,
  Image,
  VStack,
  Alert,
  AlertIcon,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FiUser,
  FiUserCheck,
  FiUsers,
  FiUserPlus,
} from 'react-icons/fi';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { sendOTP } = useAuth();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Test users for each role with pre-filled phone numbers
  const testUsers = [
    {
      role: 'patient',
      name: 'Pavan Ponnella',
      phone: '+911234567890',
      description: 'Book appointments, view reports, manage health records',
      icon: FiUser,
      color: 'purple',
    },
    {
      role: 'doctor',
      name: 'Dr. Suman Dixit',
      phone: '+911234567891',
      description: 'Manage patients, view appointments, access EMR',
      icon: FiUserCheck,
      color: 'blue',
    },
    {
      role: 'admin',
      name: 'Admin User',
      phone: '+911234567892',
      description: 'Manage users, departments, analytics, and billing',
      icon: FiUsers,
      color: 'red',
    },
    {
      role: 'staff',
      name: 'Reception Staff',
      phone: '+911234567893',
      description: 'Register patients, book appointments, upload reports',
      icon: FiUserPlus,
      color: 'green',
    },
  ];

 const { requireLogin } = useAuth();

  useEffect(() => {
    requireLogin();
  }, []);
  const handleRoleSelect = (role, phoneNumber) => {
    setSelectedRole(role);
    setPhone(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone) {
      alert('Please select a role or enter phone number');
      return;
    }
    
    setLoading(true);
    
    try {
      await sendOTP(phone);
      navigate('/verify-otp', { state: { phone, role: selectedRole } });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg={bgColor} p={4}>
      <Box
        w="full"
        maxW="6xl"
        bg={bgColor}
        borderRadius="lg"
        shadow="xl"
        p={8}
        border="1px"
        borderColor={borderColor}
      >
        <VStack spacing={8}>
          <HStack spacing={4}>
            <Image
              src="https://cdn-icons-png.flaticon.com/512/3063/3063812.png"
              alt="Hospital Logo"
              boxSize="60px"
            />
            <Box>
              <Heading size="lg" color="brand.500">
                MediCare Pro
              </Heading>
              <Text color="gray.600">Hospital Management System</Text>
            </Box>
          </HStack>
          
          <Heading size="md" textAlign="center" color="gray.700">
            Test All Features - Select Your Role
          </Heading>

          <Alert status="info" borderRadius="md" fontSize="sm">
            <AlertIcon />
            <Box>
              <Text fontWeight="bold">Demo Instructions:</Text>
              <Text fontSize="sm">
                1. Select a role below to auto-fill phone number<br />
                2. Click "Send OTP" button<br />
                3. Enter OTP: <Badge colorScheme="green">123456</Badge> (for all users)<br />
                4. You'll be redirected to the respective dashboard
              </Text>
            </Box>
          </Alert>

          {/* Role Selection Cards */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w="full">
            {testUsers.map((user) => (
              <Card
                key={user.role}
                cursor="pointer"
                border="2px"
                borderColor={selectedRole === user.role ? `${user.color}.500` : 'gray.200'}
                _hover={{
                  transform: 'translateY(-4px)',
                  shadow: 'lg',
                  borderColor: `${user.color}.300`,
                }}
                transition="all 0.2s"
                onClick={() => handleRoleSelect(user.role, user.phone)}
              >
                <CardBody>
                  <VStack spacing={4} align="center">
                    <Box
                      p={4}
                      borderRadius="full"
                      bg={`${user.color}.100`}
                      color={`${user.color}.600`}
                    >
                      <Icon as={user.icon} w={8} h={8} />
                    </Box>
                    <Box textAlign="center">
                      <Badge
                        colorScheme={user.color}
                        fontSize="0.8em"
                        mb={2}
                      >
                        {user.role.toUpperCase()}
                      </Badge>
                      <Text fontWeight="bold" fontSize="lg">
                        {user.name}
                      </Text>
                      <Text fontSize="sm" color="gray.600" mt={2}>
                        {user.description}
                      </Text>
                    </Box>
                    <Badge
                      colorScheme="gray"
                      variant="outline"
                      fontSize="xs"
                    >
                      Phone: {user.phone}
                    </Badge>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          <Box w="full" maxW="md">
            <Box as="form" w="full" onSubmit={handleSubmit}>
              <FormControl isRequired mb={6}>
                <FormLabel>
                  Selected Role: {' '}
                  <Badge colorScheme={selectedRole ? 'brand' : 'gray'}>
                    {selectedRole ? selectedRole.toUpperCase() : 'Not selected'}
                  </Badge>
                </FormLabel>
                <PhoneInput
                  defaultCountry="in"
                  value={phone}
                  onChange={(value) => {
                    setPhone(value);
                    setSelectedRole(null); // Clear role selection if manually edited
                  }}
                  style={{
                    '--react-international-phone-border-radius': '8px',
                    '--react-international-phone-height': '40px',
                  }}
                />
                <Text fontSize="sm" color="gray.500" mt={2}>
                  Phone number will auto-fill when you select a role above
                </Text>
              </FormControl>

              <Button
                type="submit"
                colorScheme="brand"
                size="lg"
                w="full"
                isLoading={loading}
                loadingText="Sending OTP"
              >
                Send OTP to Test
              </Button>
            </Box>
          </Box>

          <Box textAlign="center" maxW="2xl">
            <Heading size="sm" mb={3} color="gray.700">
              Features Available for Each Role:
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} fontSize="sm">
              <Box>
                <Badge colorScheme="purple" mb={2}>PATIENT</Badge>
                <Text color="gray.600">
                  • Book Appointments<br />
                  • View Medical Reports<br />
                  • Access Prescriptions<br />
                  • Update Profile
                </Text>
              </Box>
              <Box>
                <Badge colorScheme="blue" mb={2}>DOCTOR</Badge>
                <Text color="gray.600">
                  • Patient Management<br />
                  • Appointment Schedule<br />
                  • EMR Access<br />
                  • Prescription Writing
                </Text>
              </Box>
              <Box>
                <Badge colorScheme="red" mb={2}>ADMIN</Badge>
                <Text color="gray.600">
                  • User Management<br />
                  • Department Management<br />
                  • Analytics Dashboard<br />
                  • Billing System
                </Text>
              </Box>
              <Box>
                <Badge colorScheme="green" mb={2}>STAFF</Badge>
                <Text color="gray.600">
                  • Patient Registration<br />
                  • Appointment Booking<br />
                  • Report Upload<br />
                  • Walk-in Management
                </Text>
              </Box>
            </SimpleGrid>
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Login;
