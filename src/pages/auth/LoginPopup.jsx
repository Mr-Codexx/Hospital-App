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
  Textarea,
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
} from 'react-icons/fi';
import {
  MdAccessTime,
  MdDateRange,
  MdLocalHospital,
  MdHealthAndSafety,
  MdEmergency,
  MdPayment,
} from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, addDays } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

// Import contexts
import { useAuth } from '../../context/AuthContext';
import { useHospitalDataContext } from '../../context/HospitalDataContext';

// Import LoginModal
import LoginModal from '../../components/LoginModal';

// Doctor Card Component
const DoctorCard = ({ doctor, onSelect, isSelected }) => {
  const { user, requireLogin } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.800');
  const selectedBg = useColorModeValue('blue.50', 'blue.900');
  
  const fee = doctor.availability?.consultationFee || '₹1000';
  const numericFee = parseInt(fee.replace(/[^0-9]/g, '')) || 1000;
  
  const handleSelect = () => {
    if (!user) {
      requireLogin(() => onSelect(doctor));
      return;
    }
    onSelect(doctor);
  };
  
  return (
    <Card
      bg={isSelected ? selectedBg : bgColor}
      borderWidth="2px"
      borderColor={isSelected ? 'blue.500' : 'transparent'}
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
      cursor="pointer"
      onClick={handleSelect}
    >
      <CardBody>
        <HStack spacing={4} align="start">
          <Avatar
            size="lg"
            name={doctor.name}
            src={doctor.profileImage || `https://ui-avatars.com/api/?name=${doctor.name}&background=3182CE&color=fff`}
            border="4px solid"
            borderColor="blue.100"
          />
          
          <Box flex={1}>
            <HStack justify="space-between" mb={2}>
              <VStack align="start" spacing={1}>
                <Heading size="md">{doctor.name}</Heading>
                <Badge colorScheme="blue">{doctor.specialization}</Badge>
              </VStack>
              <Tag colorScheme="green" size="sm">
                <TagLeftIcon as={FiStar} />
                <TagLabel>{doctor.rating || '4.5'}</TagLabel>
              </Tag>
            </HStack>

            <Text color="gray.600" fontSize="sm" mb={3}>
              {doctor.qualifications?.[0] || doctor.specialization}
            </Text>

            <SimpleGrid columns={2} spacing={2} mb={3}>
              <HStack spacing={2}>
                <FiBriefcase color="blue.500" />
                <Text fontSize="sm">{doctor.experience || '10+ years'}</Text>
              </HStack>
              <HStack spacing={2}>
                <MdAccessTime color="green.500" />
                <Text fontSize="sm">{doctor.availability?.days?.[0] || 'Mon-Fri'}</Text>
              </HStack>
            </SimpleGrid>

            <HStack spacing={2} wrap="wrap">
              {doctor.languages?.slice(0, 2).map((lang, idx) => (
                <Badge key={idx} variant="subtle" colorScheme="gray">
                  {lang}
                </Badge>
              ))}
            </HStack>
          </Box>
        </HStack>
      </CardBody>
      
      <CardFooter borderTopWidth="1px" pt={3}>
        <HStack justify="space-between" w="100%">
          <VStack align="start" spacing={0}>
            <Text fontSize="sm" color="gray.500">Consultation Fee</Text>
            <Text fontSize="xl" fontWeight="bold" color="green.600">
              {fee}
            </Text>
          </VStack>
          <Button
            colorScheme={isSelected ? 'green' : 'blue'}
            size="sm"
            rightIcon={isSelected ? <FiCheck /> : <FiChevronRight />}
          >
            {!user ? 'Login to Book' : isSelected ? 'Selected' : 'Book Now'}
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  );
};

// Time Slot Picker Component
const TimeSlotPicker = ({ date, doctor, onSelectTime }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const slots = [];
    const startHour = 9;
    const endHour = 18;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute of [0, 30]) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const isAvailable = Math.random() > 0.3;
        
        slots.push({
          time,
          formattedTime: format(new Date().setHours(hour, minute), 'hh:mm a'),
          isAvailable,
          isPopular: hour >= 10 && hour <= 12,
        });
      }
    }
    
    setTimeSlots(slots);
  }, [date, doctor]);

  const handleTimeSelect = (time) => {
    if (!time.isAvailable) {
      toast({
        title: 'Slot Unavailable',
        description: 'This time slot is already booked',
        status: 'warning',
        duration: 3000,
      });
      return;
    }
    
    setSelectedTime(time);
    onSelectTime(time.formattedTime);
  };

  return (
    <Box>
      <Heading size="md" mb={4}>Select Time Slot</Heading>
      <Wrap spacing={3}>
        {timeSlots.map((slot, idx) => (
          <WrapItem key={idx}>
            <Button
              variant={selectedTime?.time === slot.time ? 'solid' : 'outline'}
              colorScheme={selectedTime?.time === slot.time ? 'blue' : slot.isAvailable ? 'gray' : 'gray'}
              isDisabled={!slot.isAvailable}
              leftIcon={slot.isPopular && <FiStar />}
              onClick={() => handleTimeSelect(slot)}
              size="md"
              borderRadius="full"
              opacity={slot.isAvailable ? 1 : 0.5}
            >
              {slot.formattedTime}
              {!slot.isAvailable && (
                <Badge ml={2} colorScheme="red" fontSize="xs">
                  Booked
                </Badge>
              )}
            </Button>
          </WrapItem>
        ))}
      </Wrap>
      
      <Alert status="info" mt={4} borderRadius="md">
        <AlertIcon />
        <Box>
          <AlertTitle>Popular Slots</AlertTitle>
          <AlertDescription>
            Morning slots (10 AM - 12 PM) are most popular. Book early!
          </AlertDescription>
        </Box>
      </Alert>
    </Box>
  );
};

// Appointment Form Component
const AppointmentForm = ({ doctor, selectedDate, selectedTime, onFormSubmit }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    patientName: user?.name || '',
    patientAge: user?.age || '',
    patientGender: user?.gender || '',
    patientPhone: user?.phone || '',
    patientEmail: user?.email || '',
    symptoms: '',
    preferredCommunication: 'phone',
    isEmergency: false,
    insuranceProvider: '',
    insuranceId: '',
    notes: '',
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        patientName: user.name || '',
        patientAge: user.age || '',
        patientGender: user.gender || '',
        patientPhone: user.phone || '',
        patientEmail: user.email || '',
      }));
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.patientName || !formData.patientAge || !formData.patientGender || !formData.patientPhone || !formData.patientEmail) {
      return;
    }
    
    const appointment = {
      id: uuidv4(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialization: doctor.specialization,
      date: selectedDate.toISOString(),
      time: selectedTime,
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      appointmentId: `APT-${Date.now().toString().slice(-6)}`,
      fee: doctor.availability?.consultationFee || '₹1000',
    };
    
    onFormSubmit(appointment);
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={6}>
        <Heading size="lg">Patient Details</Heading>
        
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          <Text fontSize="sm">Your profile information has been auto-filled</Text>
        </Alert>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <FiUser color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Pavan Ponnella"
                value={formData.patientName}
                onChange={(e) => setFormData({...formData, patientName: e.target.value})}
              />
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Age</FormLabel>
            <NumberInput min={0} max={120}>
              <NumberInputField
                placeholder="30"
                value={formData.patientAge}
                onChange={(e) => setFormData({...formData, patientAge: e.target.value})}
              />
            </NumberInput>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              value={formData.patientGender}
              onChange={(value) => setFormData({...formData, patientGender: value})}
            >
              <Stack direction="row">
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="other">Other</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Phone Number</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <FiPhone color="gray.400" />
              </InputLeftElement>
              <Input
                type="tel"
                placeholder="+91 (123) 456-7890"
                value={formData.patientPhone}
                onChange={(e) => setFormData({...formData, patientPhone: e.target.value})}
              />
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email Address</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <FiMail color="gray.400" />
              </InputLeftElement>
              <Input
                type="email"
                placeholder="you@example.com"
                value={formData.patientEmail}
                onChange={(e) => setFormData({...formData, patientEmail: e.target.value})}
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Communication Preference</FormLabel>
            <Select
              value={formData.preferredCommunication}
              onChange={(e) => setFormData({...formData, preferredCommunication: e.target.value})}
            >
              <option value="phone">Phone Call</option>
              <option value="sms">SMS</option>
              <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
            </Select>
          </FormControl>
        </SimpleGrid>

        <FormControl>
          <FormLabel>Symptoms / Reason for Visit</FormLabel>
          <Textarea
            placeholder="Describe your symptoms or reason for appointment..."
            rows={4}
            value={formData.symptoms}
            onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
          />
          <FormHelperText>Be specific for better diagnosis</FormHelperText>
        </FormControl>

        <Accordion allowToggle w="100%">
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Heading size="sm">Additional Details</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <VStack spacing={4}>
                <FormControl>
                  <Checkbox
                    colorScheme="red"
                    isChecked={formData.isEmergency}
                    onChange={(e) => setFormData({...formData, isEmergency: e.target.checked})}
                  >
                    Emergency Appointment (Additional ₹500 fee)
                  </Checkbox>
                </FormControl>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
                  <FormControl>
                    <FormLabel>Insurance Provider</FormLabel>
                    <Input
                      placeholder="e.g., Star Health"
                      value={formData.insuranceProvider}
                      onChange={(e) => setFormData({...formData, insuranceProvider: e.target.value})}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Insurance ID</FormLabel>
                    <Input
                      placeholder="Insurance ID"
                      value={formData.insuranceId}
                      onChange={(e) => setFormData({...formData, insuranceId: e.target.value})}
                    />
                  </FormControl>
                </SimpleGrid>

                <FormControl>
                  <FormLabel>Additional Notes</FormLabel>
                  <Textarea
                    placeholder="Any additional information..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </FormControl>
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          w="100%"
          leftIcon={<FiCalendar />}
        >
          Confirm Appointment
        </Button>
      </VStack>
    </Box>
  );
};

// Main Appointment Booking Component
const AdvancedAppointmentPage = () => {
  const { user, requireLogin } = useAuth();
  const { getDoctors, getDepartments, loading, error } = useHospitalDataContext();
  const toast = useToast();
  
  // States
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [step, setStep] = useState(1);
  const [appointment, setAppointment] = useState(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [priceRange, setPriceRange] = useState([500, 5000]);

  // Load doctors
  useEffect(() => {
    if (getDoctors && typeof getDoctors === 'function') {
      try {
        const doctorsData = getDoctors();
        setDoctors(doctorsData || []);
        setFilteredDoctors(doctorsData || []);
      } catch (err) {
        console.error('Error loading doctors:', err);
        toast({
          title: 'Error',
          description: 'Failed to load doctors data',
          status: 'error',
          duration: 5000,
        });
      }
    }
  }, [getDoctors, toast]);

  // Filter doctors
  useEffect(() => {
    let filtered = [...doctors];
    
    if (searchQuery) {
      filtered = filtered.filter(doctor =>
        doctor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.department?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(doctor => doctor.department === selectedDepartment);
    }
    
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
      return 0;
    });
    
    filtered = filtered.filter(doctor => {
      const fee = parseInt(doctor.availability?.consultationFee?.replace(/[^0-9]/g, '') || 1000);
      return fee >= priceRange[0] && fee <= priceRange[1];
    });
    
    setFilteredDoctors(filtered);
  }, [searchQuery, selectedDepartment, sortBy, priceRange, doctors]);

  const handleDoctorSelect = (doctor) => {
    if (!user) {
      requireLogin(() => {
        setSelectedDoctor(doctor);
        setStep(2);
      });
      return;
    }
    
    setSelectedDoctor(doctor);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleFormSubmit = (appointmentData) => {
    const existingAppointments = JSON.parse(localStorage.getItem('userAppointments') || '[]');
    const updatedAppointments = [...existingAppointments, appointmentData];
    localStorage.setItem('userAppointments', JSON.stringify(updatedAppointments));
    
    if (user) {
      const userWithAppointments = {
        ...user,
        appointments: updatedAppointments,
      };
      localStorage.setItem('hms_user', JSON.stringify(userWithAppointments));
    }
    
    setAppointment(appointmentData);
    setStep(4);
    
    toast({
      title: "Appointment Booked Successfully!",
      description: `Your appointment with ${appointmentData.doctorName} is confirmed.`,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  const getDepartmentsList = () => {
    if (getDepartments && typeof getDepartments === 'function') {
      const departments = getDepartments();
      return [
        { id: 'all', name: 'All Departments' },
        ...(departments?.map(dept => ({
          id: dept.id,
          name: dept.name,
        })) || [])
      ];
    }
    return [{ id: 'all', name: 'All Departments' }];
  };

  const renderStepIndicator = () => (
    <HStack spacing={4} mb={8} justify="center">
      {[1, 2, 3, 4].map((stepNum) => (
        <VStack key={stepNum} spacing={2}>
          <Box
            w={10}
            h={10}
            borderRadius="full"
            bg={step >= stepNum ? 'blue.500' : 'gray.200'}
            color={step >= stepNum ? 'white' : 'gray.400'}
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontWeight="bold"
            transition="all 0.3s"
          >
            {stepNum}
          </Box>
          <Text fontSize="sm" color={step >= stepNum ? 'blue.500' : 'gray.400'}>
            {stepNum === 1 && 'Select Doctor'}
            {stepNum === 2 && 'Choose Time'}
            {stepNum === 3 && 'Fill Details'}
            {stepNum === 4 && 'Confirmation'}
          </Text>
        </VStack>
      ))}
    </HStack>
  );

  if (loading) {
    return (
      <Container maxW="container.xl" py={20}>
        <VStack spacing={6}>
          <Spinner size="xl" color="blue.500" />
          <Text>Loading doctors data...</Text>
        </VStack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={20}>
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

  return (
    <Container maxW="full" p={8}>
      {/* Header */}
      <VStack spacing={6} mb={10}>
        <Heading size="2xl" textAlign="center" bgGradient="linear(to-r, blue.500, teal.400)" bgClip="text">
          Book Your Appointment
        </Heading>
        <Text fontSize="lg" color="gray.600" textAlign="center" maxW="2xl">
          Connect with top medical specialists in India. Book appointments instantly with our advanced booking system.
        </Text>
        
        {!user && (
          <Alert status="warning" borderRadius="lg" maxW="2xl">
            <AlertIcon />
            <Box>
              <AlertTitle>Login Required</AlertTitle>
              <AlertDescription>
                Please login to book appointments and access advanced features.
                <Button ml={4} colorScheme="blue" size="sm" onClick={() => requireLogin()}>
                  Login Now
                </Button>
              </AlertDescription>
            </Box>
          </Alert>
        )}
      </VStack>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Main Content */}
      <Grid templateColumns={{ base: '1fr', lg: '300px 1fr' }} gap={8}>
        {/* Sidebar Filters */}
        <GridItem>
          <Card position="sticky" top={8}>
            <CardHeader>
              <Heading size="md">Filters</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={6} align="stretch">
                <FormControl>
                  <InputGroup>
                    <InputLeftElement>
                      <FiSearch color="gray.400" />
                    </InputLeftElement>
                    <Input
                      placeholder="Search doctors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>Department</FormLabel>
                  <Select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    {getDepartmentsList().map(dept => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </Select>
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
                  </Select>
                </FormControl>

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

                <Box p={4} bg="blue.50" borderRadius="md">
                  <Stat>
                    <StatLabel>Available Doctors</StatLabel>
                    <StatNumber>{filteredDoctors.length}</StatNumber>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      23% from last month
                    </StatHelpText>
                  </Stat>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        {/* Main Content Area */}
        <GridItem>
          {/* Step 1: Select Doctor */}
          {step === 1 && (
            <VStack spacing={6} align="stretch">
              <HStack justify="space-between">
                <Heading size="lg">Select a Doctor</Heading>
                <Badge colorScheme="blue" fontSize="lg" p={2}>
                  {filteredDoctors.length} Doctors Available
                </Badge>
              </HStack>

              {filteredDoctors.length === 0 ? (
                <Alert status="info" borderRadius="lg">
                  <AlertIcon />
                  <AlertTitle>No doctors found</AlertTitle>
                  <AlertDescription>
                    Try adjusting your filters or search query.
                    {doctors.length === 0 && (
                      <Text mt={2} fontWeight="bold">
                        No doctors data available. Please check your data source.
                      </Text>
                    )}
                  </AlertDescription>
                </Alert>
              ) : (
                <SimpleGrid 
                  columns={{ base: 1, sm: 2, md: 2, lg: 2, xl: 3 }}  
                  spacing={6} 
                  w="100%"
                >
                  {filteredDoctors.map((doctor) => (
                    <DoctorCard
                      key={doctor.id}
                      doctor={doctor}
                      onSelect={handleDoctorSelect}
                      isSelected={selectedDoctor?.id === doctor.id}
                    />
                  ))}
                </SimpleGrid>
              )}
            </VStack>
          )}

          {/* Step 2: Select Time */}
          {step === 2 && selectedDoctor && (
            <VStack spacing={8} align="stretch">
              <Card>
                <CardBody>
                  <HStack spacing={4}>
                    <Avatar
                      size="xl"
                      name={selectedDoctor.name}
                      src={selectedDoctor.profileImage}
                    />
                    <Box flex={1}>
                      <Heading size="lg">{selectedDoctor.name}</Heading>
                      <Text color="blue.600" fontWeight="medium">
                        {selectedDoctor.specialization}
                      </Text>
                      <Text color="gray.600">{selectedDoctor.qualifications?.[0] || selectedDoctor.specialization}</Text>
                      <Text color="green.600" fontWeight="bold" mt={2}>
                        {selectedDoctor.availability?.consultationFee || '₹1000'}
                      </Text>
                    </Box>
                    <Button
                      variant="outline"
                      colorScheme="blue"
                      onClick={() => setStep(1)}
                    >
                      Change Doctor
                    </Button>
                  </HStack>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <Heading size="md" mb={4}>Select Date</Heading>
                  <Box borderWidth="1px" borderRadius="lg" p={4}>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      inline
                      minDate={new Date()}
                      maxDate={addDays(new Date(), 30)}
                      filterDate={(date) => date.getDay() !== 0}
                      highlightDates={[new Date(), addDays(new Date(), 1)]}
                    />
                  </Box>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <TimeSlotPicker
                    date={selectedDate}
                    doctor={selectedDoctor}
                    onSelectTime={handleTimeSelect}
                  />
                </CardBody>
              </Card>
            </VStack>
          )}

          {/* Step 3: Fill Form */}
          {step === 3 && selectedDoctor && (
            <Card>
              <CardBody>
                <AppointmentForm
                  doctor={selectedDoctor}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onFormSubmit={handleFormSubmit}
                />
              </CardBody>
            </Card>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && appointment && (
            <Card bgGradient="linear(to-br, green.50, blue.50)" borderColor="green.200">
              <CardBody>
                <VStack spacing={8} textAlign="center" py={8}>
                  <Box
                    w={20}
                    h={20}
                    borderRadius="full"
                    bg="green.100"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mb={4}
                  >
                    <FiCheck size={40} color="green.500" />
                  </Box>

                  <Box>
                    <Heading size="xl" color="green.600" mb={2}>
                      Appointment Confirmed!
                    </Heading>
                    <Text fontSize="lg" color="gray.600">
                      Your appointment has been successfully booked.
                    </Text>
                  </Box>

                  <Card w="100%" maxW="md">
                    <CardBody>
                      <VStack spacing={4}>
                        <Badge colorScheme="green" fontSize="lg" p={2}>
                          {appointment.appointmentId}
                        </Badge>
                        
                        <HStack justify="space-between" w="100%">
                          <Text fontWeight="medium">Doctor:</Text>
                          <Text>{appointment.doctorName}</Text>
                        </HStack>
                        
                        <HStack justify="space-between" w="100%">
                          <Text fontWeight="medium">Date:</Text>
                          <Text>{format(new Date(appointment.date), 'PPP')}</Text>
                        </HStack>
                        
                        <HStack justify="space-between" w="100%">
                          <Text fontWeight="medium">Time:</Text>
                          <Text>{appointment.time}</Text>
                        </HStack>
                        
                        <HStack justify="space-between" w="100%">
                          <Text fontWeight="medium">Patient:</Text>
                          <Text>{appointment.patientName}</Text>
                        </HStack>

                        <HStack justify="space-between" w="100%">
                          <Text fontWeight="medium">Fee:</Text>
                          <Text color="green.600" fontWeight="bold">{appointment.fee}</Text>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>

                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
                    <Button
                      colorScheme="blue"
                      leftIcon={<FiDownload />}
                      onClick={() => {
                        toast({
                          title: "Downloading Appointment Details",
                          status: "info",
                        });
                      }}
                    >
                      Download Details
                    </Button>
                    
                    <Button
                      variant="outline"
                      leftIcon={<FiCalendar />}
                      onClick={() => {
                        toast({
                          title: "Added to Calendar",
                          status: "success",
                        });
                      }}
                    >
                      Add to Calendar
                    </Button>
                    
                    <Button
                      variant="outline"
                      leftIcon={<FiShare2 />}
                      onClick={() => {
                        navigator.clipboard.writeText(`Appointment ID: ${appointment.appointmentId}`);
                        toast({
                          title: "Share Link Copied",
                          status: "success",
                        });
                      }}
                    >
                      Share Appointment
                    </Button>
                    
                    <Button
                      colorScheme="green"
                      onClick={() => {
                        setStep(1);
                        setSelectedDoctor(null);
                        setSelectedTime(null);
                      }}
                    >
                      Book Another Appointment
                    </Button>
                  </SimpleGrid>
                </VStack>
              </CardBody>
            </Card>
          )}
        </GridItem>
      </Grid>
    </Container>
  );
};

export default AdvancedAppointmentPage;