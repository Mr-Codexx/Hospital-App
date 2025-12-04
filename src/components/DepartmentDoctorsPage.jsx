import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Grid,
  GridItem,
  Input,
  Select,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Badge,
  Avatar,
  Tag,
  TagLabel,
  TagLeftIcon,
  IconButton,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormHelperText,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Stack,
  Checkbox,
  Divider,
  Flex,
  Spinner,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  WrapItem,
  Tooltip,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Link,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  AspectRatio,
  Icon,
} from '@chakra-ui/react';
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiStar,
  FiMapPin,
  FiPhone,
  FiMail,
  FiFilter,
  FiSearch,
  FiCheck,
  FiX,
  FiChevronRight,
  FiChevronLeft,
  FiDollarSign,
  FiBriefcase,
  FiHeart,
  FiShield,
  FiLock,
  FiLogIn,
  FiUserPlus,
  FiDownload,
  FiShare2,
  FiArrowLeft,
  FiHome,
  FiActivity,
  FiUsers,
  FiAward,
  FiFileText,
  FiGlobe,
  FiBookOpen,
} from 'react-icons/fi';
import {
  MdAccessTime,
  MdDateRange,
  MdLocalHospital,
  MdHealthAndSafety,
  MdEmergency,
  MdPayment,
  MdVerifiedUser,
  MdSchool,
  MdWork,
  MdLanguage,
  MdLocationOn,
} from 'react-icons/md';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, addDays } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

// Import your existing context and components
import { useAuth } from '../context/AuthContext';
import { useHospitalDataContext } from '../context/HospitalDataContext';

// Department Images Mapping
const departmentImages = {
  'Cardiology': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'Neurology': 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'Orthopedics': 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'Pediatrics': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'Gynecology': 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'Emergency Medicine': 'https://images.unsplash.com/photo-1612277794321-4c6a41c47c21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'General Medicine': 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'Oncology': 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
};

// Department Descriptions
const departmentDescriptions = {
  'Cardiology': 'Specialized care for heart diseases, cardiovascular conditions, and preventive cardiology with advanced diagnostic and treatment facilities.',
  'Neurology': 'Expert treatment for brain and nervous system disorders including stroke, epilepsy, Parkinson\'s disease, and migraine management.',
  'Orthopedics': 'Comprehensive bone, joint, and muscle care including trauma surgery, joint replacements, and sports injury management.',
  'Pediatrics': 'Compassionate healthcare for infants, children, and adolescents with specialized neonatal and pediatric intensive care.',
  'Gynecology': 'Women\'s health and reproductive system care including high-risk pregnancy management, infertility treatment, and laparoscopic surgeries.',
  'Emergency Medicine': '24x7 emergency and critical care services with rapid response teams and advanced life support systems.',
  'General Medicine': 'Comprehensive internal medicine and OPD services for all general health conditions and chronic disease management.',
  'Oncology': 'Advanced cancer diagnosis, treatment including chemotherapy, radiation therapy, and comprehensive cancer care programs.',
};

// Helper function to normalize department names for URL comparison
const normalizeDepartmentName = (name) => {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

// Helper function to find department by URL param
const findDepartmentByUrlParam = (departments, param) => {
  if (!param || !departments) return null;
  
  // Try exact match first
  const paramNormalized = param.toLowerCase();
  let department = departments.find(dept => 
    normalizeDepartmentName(dept.name) === paramNormalized
  );
  
  // Try partial match
  if (!department) {
    department = departments.find(dept => 
      dept.name.toLowerCase().includes(paramNormalized.replace(/-/g, ' '))
    );
  }
  
  // Try by ID if param matches an ID format
  if (!department && param.toUpperCase().startsWith('DEPT')) {
    department = departments.find(dept => dept.id === param.toUpperCase());
  }
  
  return department;
};

// Login Popup Component (Reusable)
const LoginPopup = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const handleLogin = async () => {
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
    setTimeout(() => {
      const mockUser = {
        id: uuidv4(),
        email,
        name: email.split('@')[0],
        role: 'patient',
        token: 'mock-jwt-token',
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('authToken', mockUser.token);
      
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }

      toast({
        title: 'Success!',
        description: 'Logged in successfully',
        status: 'success',
        duration: 3000,
      });

      onLoginSuccess(mockUser);
      onClose();
      setIsLoading(false);
    }, 1500);
  };

  const handleSignup = async () => {
    if (!name || !email || !password || !phone) {
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
      const mockUser = {
        id: uuidv4(),
        email,
        name,
        phone,
        role: 'patient',
        token: 'mock-jwt-token-new',
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('authToken', mockUser.token);

      toast({
        title: 'Account Created!',
        description: 'Welcome to MediCare Pro',
        status: 'success',
        duration: 3000,
      });

      onLoginSuccess(mockUser);
      onClose();
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(10px)" />
      <ModalContent borderRadius="2xl" overflow="hidden">
        <ModalHeader bgGradient="linear(to-r, blue.500, teal.400)" color="white">
          <HStack spacing={3}>
            <MdHealthAndSafety size={24} />
            <Box>
              <Text fontSize="xl" fontWeight="bold">MediCare Pro</Text>
              <Text fontSize="sm" opacity={0.9}>
                {isLoginMode ? 'Welcome Back!' : 'Create Account'}
              </Text>
            </Box>
          </HStack>
        </ModalHeader>
        <ModalCloseButton color="white" />
        
        <ModalBody py={8}>
          <VStack spacing={6}>
            <VStack w="100%" spacing={4}>
              <Button
                w="100%"
                variant="outline"
                leftIcon={<FiMail />}
                size="lg"
                onClick={() => {
                  toast({
                    title: 'Google Login',
                    description: 'Redirecting to Google...',
                    status: 'info',
                  });
                }}
              >
                Continue with Google
              </Button>
            </VStack>

            <Divider />
              <Text fontSize="sm" color="gray.500">OR</Text>
           <Divider />

            <VStack w="100%" spacing={4}>
              {!isLoginMode && (
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <FiUser color="gray.400" />
                    </InputLeftElement>
                    <Input
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      size="lg"
                    />
                  </InputGroup>
                </FormControl>
              )}

              <FormControl>
                <FormLabel>Email Address</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <FiMail color="gray.400" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="lg"
                  />
                </InputGroup>
              </FormControl>

              {!isLoginMode && (
                <FormControl>
                  <FormLabel>Phone Number</FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <FiPhone color="gray.400" />
                    </InputLeftElement>
                    <Input
                      type="tel"
                      placeholder="+91 (123) 456-7890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      size="lg"
                    />
                  </InputGroup>
                </FormControl>
              )}

              <FormControl>
                <FormLabel>Password</FormLabel>
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {isLoginMode && (
                <FormControl>
                  <Checkbox
                    colorScheme="blue"
                    isChecked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  >
                    Remember me
                  </Checkbox>
                </FormControl>
              )}
            </VStack>
          </VStack>
        </ModalBody>

        <ModalFooter borderTopWidth="1px" pt={6}>
          <VStack w="100%" spacing={4}>
            <Button
              w="100%"
              colorScheme="blue"
              size="lg"
              onClick={isLoginMode ? handleLogin : handleSignup}
              isLoading={isLoading}
              loadingText={isLoginMode ? "Logging in..." : "Creating account..."}
              leftIcon={isLoginMode ? <FiLogIn /> : <FiUserPlus />}
            >
              {isLoginMode ? 'Login' : 'Create Account'}
            </Button>

            <HStack>
              <Text color="gray.600">
                {isLoginMode ? "Don't have an account?" : "Already have an account?"}
              </Text>
              <Button
                variant="link"
                colorScheme="blue"
                onClick={() => setIsLoginMode(!isLoginMode)}
              >
                {isLoginMode ? 'Sign Up' : 'Login'}
              </Button>
            </HStack>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

// Doctor Card Component
const DoctorCard = ({ doctor, onBookNow }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const { user } = useAuth();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const toast = useToast();
  
  // Extract fee from availability or set default
  const fee = doctor.availability?.consultationFee || '₹1000';
  const experience = doctor.experience || '10+ years';
  const rating = doctor.rating || 4.5;
  
  const handleBookClick = () => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please login to book an appointment',
        status: 'warning',
        duration: 3000,
      });
      onLoginOpen();
      return;
    }
    onBookNow(doctor);
  };

  return (
    <>
      <Card
        bg={bgColor}
        borderRadius="xl"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
        cursor="pointer"
        h="100%"
        display="flex"
        flexDirection="column"
      >
        <CardBody flex={1}>
          <VStack spacing={4} align="stretch">
            {/* Doctor Header */}
            <HStack spacing={4}>
              <Avatar
                size="xl"
                name={doctor.name}
                src={doctor.profileImage || `https://ui-avatars.com/api/?name=${doctor.name}&background=3182CE&color=fff`}
                border="4px solid"
                borderColor="blue.100"
              />
              <Box flex={1}>
                <Heading size="md">{doctor.name}</Heading>
                <Badge colorScheme="blue" mt={1}>{doctor.specialization}</Badge>
                <HStack mt={2} spacing={2}>
                  <Tag size="sm" colorScheme="green">
                    <TagLeftIcon as={FiStar} />
                    <TagLabel>{rating.toFixed(1)}</TagLabel>
                  </Tag>
                  <Tag size="sm" colorScheme="purple">
                    <TagLeftIcon as={MdWork} />
                    <TagLabel>{experience}</TagLabel>
                  </Tag>
                </HStack>
              </Box>
            </HStack>

            {/* Qualifications */}
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={1}>
                Qualifications:
              </Text>
              <Text fontSize="sm" color="gray.600">
                {doctor.qualifications?.slice(0, 2).join(', ') || doctor.specialization}
              </Text>
            </Box>

            {/* Availability */}
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={1}>
                Availability:
              </Text>
              <Text fontSize="sm" color="gray.600">
                {doctor.availability?.days?.join(', ') || 'Mon - Sat'} • {doctor.availability?.timings || '9AM - 5PM'}
              </Text>
            </Box>

            {/* Languages */}
            {doctor.languages && doctor.languages.length > 0 && (
              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={1}>
                  Speaks:
                </Text>
                <HStack spacing={1} wrap="wrap">
                  {doctor.languages.slice(0, 3).map((lang, idx) => (
                    <Badge key={idx} variant="subtle" colorScheme="gray" fontSize="xs">
                      {lang}
                    </Badge>
                  ))}
                  {doctor.languages.length > 3 && (
                    <Badge variant="subtle" colorScheme="gray" fontSize="xs">
                      +{doctor.languages.length - 3} more
                    </Badge>
                  )}
                </HStack>
              </Box>
            )}

            {/* Bio */}
            {doctor.bio && (
              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={1}>
                  About:
                </Text>
                <Text fontSize="sm" color="gray.600" noOfLines={2}>
                  {doctor.bio}
                </Text>
              </Box>
            )}
          </VStack>
        </CardBody>
        
        <Divider />
        
        <CardFooter pt={3}>
          <HStack justify="space-between" w="100%">
            <VStack align="start" spacing={0}>
              <Text fontSize="sm" color="gray.500">Consultation Fee</Text>
              <Text fontSize="xl" fontWeight="bold" color="green.600">
                {fee}
              </Text>
            </VStack>
            <Button
              colorScheme="blue"
              size="sm"
              rightIcon={<FiCalendar />}
              onClick={handleBookClick}
            >
              Book Now
            </Button>
          </HStack>
        </CardFooter>
      </Card>

      <LoginPopup
        isOpen={isLoginOpen}
        onClose={onLoginClose}
        onLoginSuccess={() => {
          // After login, trigger booking
          handleBookClick();
        }}
      />
    </>
  );
};

// Quick Appointment Modal
const QuickAppointmentModal = ({ isOpen, onClose, doctor }) => {
  const { user } = useAuth();
  const toast = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM'
  ];

  const handleBookAppointment = async () => {
    if (!selectedTime) {
      toast({
        title: 'Select Time',
        description: 'Please select a time slot',
        status: 'warning',
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    // Create appointment object
    const appointment = {
      id: uuidv4(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialization: doctor.specialization,
      date: selectedDate.toISOString(),
      time: selectedTime,
      patientName: user?.name || 'Patient',
      patientEmail: user?.email,
      patientPhone: user?.phone,
      status: 'pending',
      createdAt: new Date().toISOString(),
      appointmentId: `APT-${Date.now().toString().slice(-6)}`,
      fee: doctor.availability?.consultationFee || '₹1000',
      department: doctor.department,
    };

    // Save to localStorage
    const existingAppointments = JSON.parse(localStorage.getItem('userAppointments') || '[]');
    const updatedAppointments = [...existingAppointments, appointment];
    localStorage.setItem('userAppointments', JSON.stringify(updatedAppointments));

    // Update user data
    if (user) {
      const userWithAppointments = {
        ...user,
        appointments: updatedAppointments,
      };
      localStorage.setItem('user', JSON.stringify(userWithAppointments));
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: 'Appointment Booked!',
        description: `Your appointment with ${doctor.name} has been confirmed.`,
        status: 'success',
        duration: 5000,
      });
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(10px)" />
      <ModalContent borderRadius="2xl">
        <ModalHeader>
          <HStack spacing={3}>
            <Avatar size="sm" name={doctor.name} src={doctor.profileImage} />
            <Box>
              <Text fontSize="lg" fontWeight="bold">Book Appointment</Text>
              <Text fontSize="sm" color="gray.600">{doctor.name} - {doctor.specialization}</Text>
            </Box>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody py={6}>
          <VStack spacing={6} align="stretch">
            {/* Date Picker */}
            <FormControl>
              <FormLabel>Select Date</FormLabel>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
                minDate={new Date()}
                maxDate={addDays(new Date(), 30)}
                filterDate={(date) => date.getDay() !== 0}
              />
            </FormControl>

            {/* Time Slots */}
            <FormControl>
              <FormLabel>Select Time Slot</FormLabel>
              <Wrap spacing={2}>
                {timeSlots.map((time, idx) => (
                  <WrapItem key={idx}>
                    <Button
                      variant={selectedTime === time ? 'solid' : 'outline'}
                      colorScheme={selectedTime === time ? 'blue' : 'gray'}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      borderRadius="full"
                    >
                      {time}
                    </Button>
                  </WrapItem>
                ))}
              </Wrap>
            </FormControl>

            {/* Appointment Summary */}
            <Card variant="outline">
              <CardBody>
                <VStack spacing={3} align="stretch">
                  <HStack justify="space-between">
                    <Text fontWeight="medium">Doctor:</Text>
                    <Text>{doctor.name}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontWeight="medium">Specialization:</Text>
                    <Text>{doctor.specialization}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontWeight="medium">Date:</Text>
                    <Text>{format(selectedDate, 'PPP')}</Text>
                  </HStack>
                  {selectedTime && (
                    <HStack justify="space-between">
                      <Text fontWeight="medium">Time:</Text>
                      <Text color="blue.600" fontWeight="bold">{selectedTime}</Text>
                    </HStack>
                  )}
                  <HStack justify="space-between">
                    <Text fontWeight="medium">Fee:</Text>
                    <Text color="green.600" fontWeight="bold">
                      {doctor.availability?.consultationFee || '₹1000'}
                    </Text>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </ModalBody>

        <ModalFooter borderTopWidth="1px" pt={6}>
          <HStack spacing={3} w="100%">
            <Button variant="outline" flex={1} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              flex={1}
              onClick={handleBookAppointment}
              isLoading={isSubmitting}
              loadingText="Booking..."
              isDisabled={!selectedTime}
            >
              Confirm Booking
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

// Main Department Doctors Page
const DepartmentDoctorsPage = () => {
  const { departmentName } = useParams();
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const { getDoctors, getDepartments, getDoctorsByDepartment, loading, error } = useHospitalDataContext();
  const toast = useToast();
  
  // States
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [department, setDepartment] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  
  // Modal states
  const { isOpen: isAppointmentOpen, onOpen: onAppointmentOpen, onClose: onAppointmentClose } = useDisclosure();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();

  // Load department and doctors with better debugging
  useEffect(() => {
    if (!departmentName) {
      console.log('No department name in URL');
      return;
    }

    console.log('Loading department for:', departmentName);
    
    const loadData = async () => {
      try {
        // Get all departments
        const departments = getDepartments?.() || [];
        console.log('Available departments:', departments);
        
        const foundDepartment = findDepartmentByUrlParam(departments, departmentName);
        
        if (!foundDepartment) {
          console.log('Department not found for:', departmentName);
          toast({
            title: 'Department Not Found',
            description: `Department "${departmentName}" not found`,
            status: 'error',
            duration: 5000,
          });
          navigate('/doctors');
          return;
        }
        
        console.log('Found department:', foundDepartment);
        setDepartment(foundDepartment);
        
        // Get all doctors
        const allDoctors = getDoctors?.() || [];
        console.log('Total doctors loaded:', allDoctors.length);
        console.log('Sample doctor:', allDoctors[0]);
        
        // Filter doctors by department - multiple matching strategies
        let doctorsData = [];
        
        // Try function first
        if (getDoctorsByDepartment && typeof getDoctorsByDepartment === 'function') {
          doctorsData = getDoctorsByDepartment(foundDepartment.id);
          console.log(`Found ${doctorsData.length} doctors by function for ${foundDepartment.id}`);
        }
        
        // If no doctors found by function, try direct filtering
        if (doctorsData.length === 0) {
          doctorsData = allDoctors.filter(doctor => {
            // Multiple matching strategies
            const doctorDept = doctor.department || doctor.departmentId;
            return (
              doctorDept === foundDepartment.name ||
              doctorDept === foundDepartment.id ||
              (doctorDept && doctorDept.toLowerCase() === foundDepartment.name.toLowerCase()) ||
              (doctor.specialization && doctor.specialization.toLowerCase().includes(foundDepartment.name.toLowerCase()))
            );
          });
          console.log(`Found ${doctorsData.length} doctors by filtering for ${foundDepartment.name}`);
        }
        
        // Log doctor details for debugging
        if (doctorsData.length > 0) {
          console.log('Doctors in this department:', doctorsData.map(d => ({
            name: d.name,
            department: d.department,
            specialization: d.specialization
          })));
        } else {
          console.log('No doctors found. All doctors:', allDoctors.map(d => ({
            name: d.name,
            department: d.department,
            specialization: d.specialization
          })));
        }
        
        setDoctors(doctorsData);
        setFilteredDoctors(doctorsData);
        
      } catch (err) {
        console.error('Error loading department data:', err);
        toast({
          title: 'Error',
          description: 'Failed to load department data',
          status: 'error',
          duration: 5000,
        });
      }
    };

    loadData();
  }, [departmentName, getDepartments, getDoctors, getDoctorsByDepartment, navigate, toast]);

  // Filter doctors
  useEffect(() => {
    let filtered = [...doctors];
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(doctor =>
        doctor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.qualifications?.some(q => q?.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Sort doctors
    filtered.sort((a, b) => {
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'experience') {
        const expA = parseInt(a.experience) || 0;
        const expB = parseInt(b.experience) || 0;
        return expB - expA;
      }
      if (sortBy === 'price') {
        const feeA = parseInt(a.availability?.consultationFee?.replace(/[^0-9]/g, '') || 1000);
        const feeB = parseInt(b.availability?.consultationFee?.replace(/[^0-9]/g, '') || 1000);
        return feeA - feeB;
      }
      if (sortBy === 'name') {
        return a.name?.localeCompare(b.name);
      }
      return 0;
    });
    
    // Price filter
    filtered = filtered.filter(doctor => {
      const fee = parseInt(doctor.availability?.consultationFee?.replace(/[^0-9]/g, '') || 1000);
      return fee >= priceRange[0] && fee <= priceRange[1];
    });
    
    // Availability filter
    if (availabilityFilter === 'today') {
      const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      filtered = filtered.filter(doctor => 
        doctor.availability?.days?.some(day => 
          day.toLowerCase() === today.toLowerCase()
        )
      );
    } else if (availabilityFilter === 'week') {
      const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      filtered = filtered.filter(doctor => 
        doctor.availability?.days?.some(day => weekdays.includes(day))
      );
    }
    
    setFilteredDoctors(filtered);
  }, [searchQuery, sortBy, priceRange, availabilityFilter, doctors]);

  const handleBookNow = (doctor) => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please login to book an appointment',
        status: 'warning',
        duration: 3000,
      });
      onLoginOpen();
      return;
    }
    setSelectedDoctor(doctor);
    onAppointmentOpen();
  };

  const handleLoginSuccess = (userData) => {
    login(userData);
    if (selectedDoctor) {
      onAppointmentOpen();
    }
  };

  if (loading) {
    return (
      <Container maxW="container.xl" py={20}>
        <VStack spacing={6} align="center">
          <Spinner size="xl" color="blue.500" />
          <Text fontSize="lg" color="gray.600">Loading department information...</Text>
        </VStack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={10}>
        <Alert status="error" borderRadius="lg">
          <AlertIcon />
          <Box>
            <AlertTitle>Error Loading Data</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Box>
        </Alert>
      </Container>
    );
  }

  if (!department) {
    return (
      <Container maxW="container.xl" py={10}>
        <Alert status="info" borderRadius="lg">
          <AlertIcon />
          <Box>
            <AlertTitle>Department Not Found</AlertTitle>
            <AlertDescription>
              The department "{departmentName}" was not found. Please check the URL or browse other departments.
            </AlertDescription>
          </Box>
          <Button ml={4} colorScheme="blue" onClick={() => navigate('/doctors')}>
            Browse All Departments
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Box>
      {/* Department Hero Section */}
      <Box
        position="relative"
        bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        color="white"
        py={16}
        mb={8}
      >
        <Container maxW="container.xl">
          <VStack spacing={6} align="start">
            <Breadcrumb color="white" opacity={0.9}>
              <BreadcrumbItem>
                <BreadcrumbLink as={RouterLink} to="/">
                  <HStack spacing={1}>
                    <FiHome />
                    <Text>Home</Text>
                  </HStack>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink as={RouterLink} to="/doctors">
                  <HStack spacing={1}>
                    <FiUser />
                    <Text>Doctors</Text>
                  </HStack>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>
                  <Text>{department.name}</Text>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            
            <HStack spacing={6} align="center">
              <Box flex={1}>
                <Heading size="2xl" mb={4}>
                  {department.name}
                </Heading>
                <Text fontSize="lg" opacity={0.9} mb={6}>
                  {departmentDescriptions[department.name] || department.description}
                </Text>
                
                <HStack spacing={6}>
                  <Stat color="white">
                    <StatLabel>Available Doctors</StatLabel>
                    <StatNumber>{doctors.length}</StatNumber>
                  </Stat>
                  <Stat color="white">
                    <StatLabel>Department Head</StatLabel>
                    <StatNumber>
                      {doctors.find(d => d.id === department.headDoctorId)?.name?.split('Dr. ')[1] || 'Not Available'}
                    </StatNumber>
                  </Stat>
                  <Stat color="white">
                    <StatLabel>Bed Occupancy</StatLabel>
                    <StatNumber>
                      {department.totalBeds ? Math.round((department.occupiedBeds / department.totalBeds) * 100) : 0}%
                    </StatNumber>
                  </Stat>
                </HStack>
              </Box>
              
              <Box
                w="300px"
                h="200px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="xl"
              >
                <Image
                  src={departmentImages[department.name] || 'https://images.unsplash.com/photo-1516549655669-df6654e435de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
                  alt={department.name}
                  objectFit="cover"
                  w="100%"
                  h="100%"
                />
              </Box>
            </HStack>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        

        {/* Filters and Search */}
        <Card mb={8}>
          <CardBody>
            <Grid templateColumns={{ base: '1fr', md: '300px 1fr' }} gap={6}>
              <GridItem>
                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel>Search Doctors</FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <FiSearch color="gray.400" />
                      </InputLeftElement>
                      <Input
                        placeholder="Search by name, specialization..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Sort By</FormLabel>
                    <Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="rating">Highest Rated</option>
                      <option value="experience">Most Experienced</option>
                      <option value="price">Price: Low to High</option>
                      <option value="name">Name: A to Z</option>
                    </Select>
                  </FormControl>
                </VStack>
              </GridItem>

              <GridItem>
                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel>Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</FormLabel>
                    <RangeSlider
                      aria-label={['min', 'max']}
                      min={500}
                      max={5000}
                      step={500}
                      value={priceRange}
                      onChange={setPriceRange}
                    >
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} />
                      <RangeSliderThumb index={1} />
                    </RangeSlider>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Availability</FormLabel>
                    <Select
                      value={availabilityFilter}
                      onChange={(e) => setAvailabilityFilter(e.target.value)}
                    >
                      <option value="all">All Available</option>
                      <option value="today">Available Today</option>
                      <option value="week">Available This Week</option>
                    </Select>
                  </FormControl>
                </VStack>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>

        {/* Doctors Grid */}
        {doctors.length === 0 ? (
          <Card>
            <CardBody>
              <VStack spacing={4} py={10} textAlign="center">
                <FiUser size={48} color="gray.400" />
                <Heading size="md" color="gray.600">
                  No Doctors Found in {department.name}
                </Heading>
                <Text color="gray.500">
                  There are currently no doctors available in this department. Please check back later or contact the hospital administration.
                </Text>
                <Button
                  variant="outline"
                  leftIcon={<FiArrowLeft />}
                  onClick={() => navigate('/doctors')}
                >
                  Browse Other Departments
                </Button>
              </VStack>
            </CardBody>
          </Card>
        ) : filteredDoctors.length === 0 ? (
          <Card>
            <CardBody>
              <VStack spacing={4} py={10} textAlign="center">
                <FiSearch size={48} color="gray.400" />
                <Heading size="md" color="gray.600">
                  No Matching Doctors Found
                </Heading>
                <Text color="gray.500">
                  {searchQuery 
                    ? `No doctors found matching "${searchQuery}" in ${department.name}`
                    : `No doctors match the selected filters in ${department.name}`
                  }
                </Text>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSortBy('rating');
                    setPriceRange([500, 5000]);
                    setAvailabilityFilter('all');
                  }}
                >
                  Clear All Filters
                </Button>
              </VStack>
            </CardBody>
          </Card>
        ) : (
          <>
            <HStack justify="space-between" mb={6}>
              <Heading size="lg">
                Available Doctors ({filteredDoctors.length} of {doctors.length})
              </Heading>
              <Badge colorScheme="blue" fontSize="lg" px={4} py={2}>
                {department.name}
              </Badge>
            </HStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={10}>
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onBookNow={handleBookNow}
                />
              ))}
            </SimpleGrid>

            {/* Department Info */}
            <Card variant="outline" mb={8}>
              <CardHeader>
                <Heading size="md">About {department.name} Department</Heading>
              </CardHeader>
              <CardBody>
                <Tabs>
                  <TabList>
                    <Tab>Overview</Tab>
                    <Tab>Facilities</Tab>
                    <Tab>Services</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <VStack spacing={4} align="start">
                        <Text>{department.description}</Text>
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="100%">
                          <Stat>
                            <StatLabel>Total Beds</StatLabel>
                            <StatNumber>{department.totalBeds || 'N/A'}</StatNumber>
                          </Stat>
                          <Stat>
                            <StatLabel>Occupied Beds</StatLabel>
                            <StatNumber>{department.occupiedBeds || 'N/A'}</StatNumber>
                            <StatHelpText>
                              {department.totalBeds && (
                                <>
                                  <StatArrow type={department.occupiedBeds > department.totalBeds * 0.8 ? 'increase' : 'decrease'} />
                                  {Math.round((department.occupiedBeds / department.totalBeds) * 100)}% occupancy
                                </>
                              )}
                            </StatHelpText>
                          </Stat>
                          <Stat>
                            <StatLabel>Floor</StatLabel>
                            <StatNumber>{department.floor || 'N/A'}</StatNumber>
                            <StatHelpText>Extension: {department.extension || 'N/A'}</StatHelpText>
                          </Stat>
                        </SimpleGrid>
                      </VStack>
                    </TabPanel>
                    <TabPanel>
                      <SimpleGrid columns={2} spacing={4}>
                        <HStack>
                          <FiCheck color="green.500" />
                          <Text>Advanced Equipment</Text>
                        </HStack>
                        <HStack>
                          <FiCheck color="green.500" />
                          <Text>24/7 Emergency</Text>
                        </HStack>
                        <HStack>
                          <FiCheck color="green.500" />
                          <Text>ICU Facilities</Text>
                        </HStack>
                        <HStack>
                          <FiCheck color="green.500" />
                          <Text>Diagnostic Center</Text>
                        </HStack>
                        <HStack>
                          <FiCheck color="green.500" />
                          <Text>Operation Theaters</Text>
                        </HStack>
                        <HStack>
                          <FiCheck color="green.500" />
                          <Text>Pharmacy</Text>
                        </HStack>
                      </SimpleGrid>
                    </TabPanel>
                    <TabPanel>
                      <VStack spacing={3} align="start">
                        <Text>• Consultation & OPD Services</Text>
                        <Text>• Emergency Care</Text>
                        <Text>• In-patient Treatment</Text>
                        <Text>• Surgical Procedures</Text>
                        <Text>• Diagnostic Tests</Text>
                        <Text>• Rehabilitation Services</Text>
                        <Text>• Preventive Care</Text>
                      </VStack>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </CardBody>
            </Card>
          </>
        )}

        {/* Call to Action */}
        <Card bgGradient="linear(to-r, blue.50, teal.50)" mb={8}>
          <CardBody>
            <VStack spacing={4} textAlign="center" py={8}>
              <Heading size="lg">Need Emergency Consultation?</Heading>
              <Text fontSize="lg" color="gray.600">
                Book an appointment instantly or visit our emergency department for immediate care.
              </Text>
              <HStack spacing={4}>
                <Button
                  colorScheme="blue"
                  size="lg"
                  leftIcon={<FiCalendar />}
                  onClick={() => {
                    if (!user) {
                      onLoginOpen();
                    } else {
                      navigate('/book-appointment');
                    }
                  }}
                >
                  Book General Appointment
                </Button>
                <Button
                  colorScheme="red"
                  size="lg"
                  variant="outline"
                  leftIcon={<MdEmergency />}
                  onClick={() => navigate('/emergency')}
                >
                  Emergency Services
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </Container>

      {/* Appointment Modal */}
      {selectedDoctor && (
        <QuickAppointmentModal
          isOpen={isAppointmentOpen}
          onClose={onAppointmentClose}
          doctor={selectedDoctor}
        />
      )}

      {/* Login Popup */}
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={onLoginClose}
        onLoginSuccess={handleLoginSuccess}
      />
    </Box>
  );
};

// Also create a utility file to help with data loading
export const useDepartmentData = () => {
  const { getDoctors, getDepartments } = useHospitalDataContext();
  
  const getDoctorsByDepartmentName = (departmentName) => {
    const allDoctors = getDoctors() || [];
    const departments = getDepartments() || [];
    
    // Find department by name
    const department = departments.find(dept => 
      dept.name.toLowerCase() === departmentName.toLowerCase()
    );
    
    if (!department) return [];
    
    // Filter doctors by department name or ID
    return allDoctors.filter(doctor => 
      doctor.department === department.name || 
      doctor.department === department.id ||
      (doctor.specialization && doctor.specialization.toLowerCase().includes(department.name.toLowerCase()))
    );
  };
  
  return { getDoctorsByDepartmentName };
};

export default DepartmentDoctorsPage;