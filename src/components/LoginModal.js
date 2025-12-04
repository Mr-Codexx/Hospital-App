import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  HStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Text,
  Box,
  Image,
  IconButton,
  Divider,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Checkbox,
  useToast,
  Badge,
  SimpleGrid,
  Card,
  CardBody,
  Heading,
  Flex,
  useColorModeValue,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import {
  FiMail,
  FiLock,
  FiPhone,
  FiEye,
  FiEyeOff,
  FiUser,
  FiSmartphone,
  FiShield,
  FiKey,
  FiLogIn,
  FiUserPlus,
} from 'react-icons/fi';
import { MdHealthAndSafety, MdPassword, MdSms } from 'react-icons/md';
import usersData from '../data/users.json';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' or 'otp'
  
  // Password login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // OTP login state
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  
  // Registration state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBg = useColorModeValue('gray.50', 'gray.700');

  // Test users for quick login
  const testUsers = [
    { ...usersData.users[0], color: 'purple' }, // Patient
    { ...usersData.users[1], color: 'blue' },   // Doctor
    { ...usersData.users[2], color: 'red' },    // Admin
    { ...usersData.users[3], color: 'green' },  // Staff
  ];

  const handlePasswordLogin = async (e) => {
    e?.preventDefault();
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      // Find user
      const user = usersData.users.find(u => 
        (u.email === email || u.phone === email) && u.password === password
      );
      
      if (user) {
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        onLoginSuccess(user);
        toast({
          title: 'Success!',
          description: `Welcome back, ${user.name}`,
          status: 'success',
          duration: 3000,
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: 'Invalid email/phone or password',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = () => {
    if (!phone) {
      toast({
        title: 'Error',
        description: 'Please enter phone number',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    // Simulate sending OTP
    setOtpSent(true);
    setOtp('123456'); // Pre-fill demo OTP
    
    toast({
      title: 'OTP Sent!',
      description: (
        <Box>
          <Text>Demo OTP: <Badge colorScheme="green">123456</Badge></Text>
          <Text fontSize="sm">For demo purposes only</Text>
        </Box>
      ),
      status: 'info',
      duration: 5000,
    });
  };

  const handleOTPLogin = async (e) => {
    e?.preventDefault();
    if (!phone || !otp) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate OTP verification
      if (otp === '123456') {
        const user = usersData.users.find(u => u.phone === phone) || {
          id: `PAT${Date.now().toString().slice(-4)}`,
          name: 'New Patient',
          phone,
          email: `${phone}@patient.com`,
          role: 'patient',
          avatar: `https://ui-avatars.com/api/?name=New+Patient&background=805AD5&color=fff`,
        };
        
        onLoginSuccess(user);
        toast({
          title: 'Login Successful!',
          description: `Welcome ${user.name}`,
          status: 'success',
          duration: 3000,
        });
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter 123456 for demo',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (user) => {
    setEmail(user.email);
    setPassword(user.password);
    
    // Auto login after 500ms
    setTimeout(() => {
      handlePasswordLogin();
    }, 500);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPhone || !regPassword) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const newUser = {
        id: `PAT${Date.now().toString().slice(-4)}`,
        name: regName,
        email: regEmail,
        phone: regPhone,
        password: regPassword,
        role: 'patient',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(regName)}&background=805AD5&color=fff`,
        createdAt: new Date().toISOString(),
      };

      onLoginSuccess(newUser);
      toast({
        title: 'Account Created!',
        description: 'Welcome to MediCare Pro',
        status: 'success',
        duration: 3000,
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="xxl" 
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(10px)" />
      <ModalContent borderRadius="2xl" maxH="90vh" overflow="hidden" maxW="80vw" w="80vw" >
        <ModalCloseButton />
        <ModalBody p={0}>
          <Flex direction={{ base: 'column', md: 'row' }} minH="500px">
            {/* Left Side - Branding */}
            <Box
              flex="1"
              bgGradient="linear(to-br, blue.500, teal.400)"
              color="white"
              p={8}
              display={{ base: 'none', md: 'flex' }}
              flexDirection="column"
              justifyContent="center"
            >
              <VStack spacing={6} align="start">
                <HStack spacing={3}>
                  <MdHealthAndSafety size={40} />
                  <Box>
                    <Heading size="lg">MediCare Pro</Heading>
                    <Text fontSize="sm" opacity={0.9}>Hospital Management System</Text>
                  </Box>
                </HStack>
                
                <Box>
                  <Text fontSize="lg" fontWeight="bold" mb={2}>
                    Smart Healthcare Access
                  </Text>
                  <Text fontSize="sm" opacity={0.9}>
                    • Book appointments instantly<br />
                    • Access medical records<br />
                    • Connect with top doctors<br />
                    • 24/7 healthcare support
                  </Text>
                </Box>
                
                <Alert status="info" borderRadius="md" colorScheme="whiteAlpha">
                  <AlertIcon />
                  <Text fontSize="sm">Demo: Use any test user below or register new</Text>
                </Alert>
              </VStack>
            </Box>

            {/* Right Side - Login Form */}
            <Box flex="1" p={8} bg={bgColor} overflowY="auto">
              <Tabs 
                index={activeTab} 
                onChange={setActiveTab}
                variant="soft-rounded"
                colorScheme="blue"
              >
                <TabList justifyContent="center" mb={6}>
                  <Tab>Login</Tab>
                  <Tab>Register</Tab>
                </TabList>

                <TabPanels>
                  {/* Login Panel */}
                  <TabPanel p={0}>
                    <VStack spacing={6} align="stretch">
                      <Box textAlign="center" mb={4}>
                        <Heading size="lg">Welcome Back</Heading>
                        <Text color="gray.600">Sign in to continue</Text>
                      </Box>

                      {/* Quick Login Cards */}
                      <Box>
                        <Text fontSize="sm" fontWeight="medium" mb={3} color="gray.600">
                          Quick Login (Demo Users):
                        </Text>
                        <SimpleGrid columns={2} spacing={3}>
                          {testUsers.map((user) => (
                            <Card 
                              key={user.id} 
                              size="sm" 
                              cursor="pointer"
                              onClick={() => handleQuickLogin(user)}
                              border="1px solid"
                              borderColor={`${user.color}.200`}
                              _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
                              transition="all 0.2s"
                            >
                              <CardBody p={3}>
                                <HStack spacing={2}>
                                  <Box
                                    w={8}
                                    h={8}
                                    borderRadius="full"
                                    bg={`${user.color}.100`}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    <FiUser size={16} color={`var(--chakra-colors-${user.color}-600)`} />
                                  </Box>
                                  <Box flex="1">
                                    <Text fontSize="xs" fontWeight="bold">{user.name}</Text>
                                    <Badge
                                      colorScheme={user.color}
                                      fontSize="2xs"
                                      textTransform="uppercase"
                                    >
                                      {user.role}
                                    </Badge>
                                  </Box>
                                </HStack>
                              </CardBody>
                            </Card>
                          ))}
                        </SimpleGrid>
                      </Box>

                      <Divider />

                      {/* Login Method Toggle */}
                      <Box>
                        <HStack justify="center" mb={4}>
                          <Button
                            size="sm"
                            variant={loginMethod === 'password' ? 'solid' : 'outline'}
                            colorScheme="blue"
                            onClick={() => setLoginMethod('password')}
                            leftIcon={<MdPassword />}
                          >
                            Password
                          </Button>
                          <Button
                            size="sm"
                            variant={loginMethod === 'otp' ? 'solid' : 'outline'}
                            colorScheme="green"
                            onClick={() => setLoginMethod('otp')}
                            leftIcon={<MdSms />}
                          >
                            OTP Login
                          </Button>
                        </HStack>

                        {/* Password Login Form */}
                        {loginMethod === 'password' && (
                          <form onSubmit={handlePasswordLogin}>
                            <VStack spacing={4}>
                              <FormControl>
                                <FormLabel fontSize="sm">Email or Phone</FormLabel>
                                <InputGroup>
                                  <InputLeftElement>
                                    <FiMail color="gray.400" />
                                  </InputLeftElement>
                                  <Input
                                    placeholder="john@example.com or +911234567890"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    size="lg"
                                  />
                                </InputGroup>
                              </FormControl>

                              <FormControl>
                                <FormLabel fontSize="sm">Password</FormLabel>
                                <InputGroup>
                                  <InputLeftElement>
                                    <FiLock color="gray.400" />
                                  </InputLeftElement>
                                  <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    size="lg"
                                  />
                                  <InputRightElement>
                                    <IconButton
                                      variant="ghost"
                                      size="sm"
                                      icon={showPassword ? <FiEyeOff /> : <FiEye />}
                                      onClick={() => setShowPassword(!showPassword)}
                                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    />
                                  </InputRightElement>
                                </InputGroup>
                              </FormControl>

                              <HStack justify="space-between" w="100%">
                                <Checkbox
                                  size="sm"
                                  isChecked={rememberMe}
                                  onChange={(e) => setRememberMe(e.target.checked)}
                                >
                                  Remember me
                                </Checkbox>
                                <Button variant="link" size="sm" colorScheme="blue">
                                  Forgot password?
                                </Button>
                              </HStack>

                              <Button
                                type="submit"
                                w="100%"
                                colorScheme="blue"
                                size="lg"
                                isLoading={isLoading}
                                loadingText="Signing in..."
                                leftIcon={<FiLogIn />}
                              >
                                Sign In
                              </Button>
                            </VStack>
                          </form>
                        )}

                        {/* OTP Login Form */}
                        {loginMethod === 'otp' && (
                          <form onSubmit={handleOTPLogin}>
                            <VStack spacing={4}>
                              <FormControl>
                                <FormLabel fontSize="sm">Phone Number</FormLabel>
                                <InputGroup>
                                  <InputLeftElement>
                                    <FiSmartphone color="gray.400" />
                                  </InputLeftElement>
                                  <Input
                                    placeholder="+91 12345 67890"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    size="lg"
                                  />
                                </InputGroup>
                              </FormControl>

                              {!otpSent ? (
                                <Button
                                  w="100%"
                                  colorScheme="green"
                                  onClick={handleSendOTP}
                                  leftIcon={<FiShield />}
                                >
                                  Send OTP
                                </Button>
                              ) : (
                                <>
                                  <FormControl>
                                    <FormLabel fontSize="sm">Enter OTP</FormLabel>
                                    <InputGroup>
                                      <InputLeftElement>
                                        <FiKey color="gray.400" />
                                      </InputLeftElement>
                                      <Input
                                        placeholder="123456"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        size="lg"
                                        textAlign="center"
                                        fontSize="xl"
                                        letterSpacing="4px"
                                      />
                                    </InputGroup>
                                    <Text fontSize="xs" color="gray.500" mt={2}>
                                      Demo OTP: <Badge colorScheme="green">123456</Badge>
                                    </Text>
                                  </FormControl>

                                  <Button
                                    type="submit"
                                    w="100%"
                                    colorScheme="green"
                                    size="lg"
                                    isLoading={isLoading}
                                    loadingText="Verifying..."
                                  >
                                    Verify & Login
                                  </Button>
                                </>
                              )}
                            </VStack>
                          </form>
                        )}
                      </Box>

                      <Divider />

                      {/* Social Login */}
                      <Box textAlign="center">
                        <Text fontSize="sm" color="gray.600" mb={3}>
                          Or continue with
                        </Text>
                        <HStack spacing={3} justify="center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              toast({
                                title: 'Google Login',
                                description: 'Redirecting to Google...',
                                status: 'info',
                              });
                            }}
                          >
                            Google
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              toast({
                                title: 'Apple Login',
                                description: 'Redirecting to Apple...',
                                status: 'info',
                              });
                            }}
                          >
                            Apple
                          </Button>
                        </HStack>
                      </Box>
                    </VStack>
                  </TabPanel>

                  {/* Register Panel */}
                  <TabPanel p={0}>
                    <VStack spacing={6} align="stretch">
                      <Box textAlign="center" mb={4}>
                        <Heading size="lg">Create Account</Heading>
                        <Text color="gray.600">Join MediCare Pro today</Text>
                      </Box>

                      <form onSubmit={handleRegister}>
                        <VStack spacing={4}>
                          <FormControl>
                            <FormLabel fontSize="sm">Full Name</FormLabel>
                            <InputGroup>
                              <InputLeftElement>
                                <FiUser color="gray.400" />
                              </InputLeftElement>
                              <Input
                                placeholder="Pavan Ponnella"
                                value={regName}
                                onChange={(e) => setRegName(e.target.value)}
                                size="lg"
                              />
                            </InputGroup>
                          </FormControl>

                          <FormControl>
                            <FormLabel fontSize="sm">Email Address</FormLabel>
                            <InputGroup>
                              <InputLeftElement>
                                <FiMail color="gray.400" />
                              </InputLeftElement>
                              <Input
                                type="email"
                                placeholder="john@example.com"
                                value={regEmail}
                                onChange={(e) => setRegEmail(e.target.value)}
                                size="lg"
                              />
                            </InputGroup>
                          </FormControl>

                          <FormControl>
                            <FormLabel fontSize="sm">Phone Number</FormLabel>
                            <InputGroup>
                              <InputLeftElement>
                                <FiSmartphone color="gray.400" />
                              </InputLeftElement>
                              <Input
                                placeholder="+91 12345 67890"
                                value={regPhone}
                                onChange={(e) => setRegPhone(e.target.value)}
                                size="lg"
                              />
                            </InputGroup>
                          </FormControl>

                          <FormControl>
                            <FormLabel fontSize="sm">Password</FormLabel>
                            <InputGroup>
                              <InputLeftElement>
                                <FiLock color="gray.400" />
                              </InputLeftElement>
                              <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={regPassword}
                                onChange={(e) => setRegPassword(e.target.value)}
                                size="lg"
                              />
                              <InputRightElement>
                                <IconButton
                                  variant="ghost"
                                  size="sm"
                                  icon={showPassword ? <FiEyeOff /> : <FiEye />}
                                  onClick={() => setShowPassword(!showPassword)}
                                />
                              </InputRightElement>
                            </InputGroup>
                          </FormControl>

                          <Checkbox size="sm" defaultChecked>
                            I agree to terms and conditions
                          </Checkbox>

                          <Button
                            type="submit"
                            w="100%"
                            colorScheme="blue"
                            size="lg"
                            isLoading={isLoading}
                            loadingText="Creating account..."
                            leftIcon={<FiUserPlus />}
                          >
                            Create Account
                          </Button>
                        </VStack>
                      </form>

                      <Text fontSize="sm" textAlign="center" color="gray.600">
                        Already have an account?{' '}
                        <Button
                          variant="link"
                          colorScheme="blue"
                          size="sm"
                          onClick={() => setActiveTab(0)}
                        >
                          Sign In
                        </Button>
                      </Text>
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;