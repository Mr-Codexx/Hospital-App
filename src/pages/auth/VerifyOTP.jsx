import React, { useState, useEffect } from 'react';
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
  HStack,
  PinInput,
  PinInputField,
  Alert,
  AlertIcon,
  Spinner,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyOTP, sendOTP } = useAuth();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [phone] = useState(location.state?.phone || '+911234567890');
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const otpString = otp.join('');
    if (otpString.length !== 6) {
      alert('Please enter 6-digit OTP');
      setLoading(false);
      return;
    }

    try {
      const success = await verifyOTP(phone, otpString);
      if (success) {
        navigate('/');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      await sendOTP(phone);
      setTimer(60);
    } catch (error) {
      console.error('Resend OTP error:', error);
    } finally {
      setResendLoading(false);
    }
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box
        w="full"
        maxW="md"
        bg={bgColor}
        borderRadius="lg"
        shadow="xl"
        p={8}
        border="1px"
        borderColor={borderColor}
      >
        <VStack spacing={6}>
          <Image
            src="https://cdn-icons-png.flaticon.com/512/3063/3063812.png"
            alt="Hospital Logo"
            boxSize="80px"
            mb={4}
          />

          <Heading size="lg" textAlign="center" color="brand.500">
            Verify OTP
          </Heading>

          <Text color="gray.600" textAlign="center">
            Enter the 6-digit code sent to {phone}
          </Text>

          <Alert status="info" borderRadius="md" fontSize="sm">
            <AlertIcon />
            Demo OTP: 123456
          </Alert>

          <Box as="form" w="full" onSubmit={handleSubmit}>
            <FormControl isRequired mb={6}>
              <FormLabel textAlign="center">OTP Code</FormLabel>

              <HStack justify="center" spacing={2} mb={4}>
                <PinInput
                  otp
                  value={otp.join('')}
                  onChange={(value) => {
                    const arr = value.split('');
                    setOtp(arr);
                  }}
                >
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <PinInputField
                      key={index}
                      id={`otp-${index}`}
                      width="45px"
                      height="45px"
                      textAlign="center"
                      fontSize="xl"
                    />
                  ))}
                </PinInput>
              </HStack>
            </FormControl>


            <Button
              type="submit"
              colorScheme="brand"
              size="lg"
              w="full"
              isLoading={loading}
              loadingText="Verifying"
            >
              Verify & Continue
            </Button>
          </Box>

          <HStack spacing={2} justify="center" mt={4}>
            <Text fontSize="sm" color="gray.500">
              Didn't receive code?
            </Text>
            <Button
              variant="link"
              colorScheme="brand"
              size="sm"
              isLoading={resendLoading}
              loadingText="Resending"
              isDisabled={timer > 0}
              onClick={handleResendOTP}
            >
              Resend {timer > 0 ? `(${timer}s)` : ''}
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Flex>
  );
};

export default VerifyOTP;