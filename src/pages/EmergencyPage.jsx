// pages/EmergencyPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  SimpleGrid,
  Icon,
  useToast,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Textarea,
  Select,
  FormControl,
  FormLabel,
  Wrap,
  WrapItem,
  Divider,
  Avatar,
  Progress,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FiAlertTriangle,
  FiPhone,
  FiMapPin,
  FiUser,
  FiClock,
  FiHeart,
  FiActivity,
  FiShield,
  FiNavigation,
  FiMessageSquare,
} from 'react-icons/fi';
import {
  MdEmergency,
  MdLocalHospital,
  MdDirectionsCar,
  MdLocationOn,
  MdAccessTime,
  MdHealthAndSafety,
  MdPeople,
  MdPhoneInTalk,
  MdWarning,
} from 'react-icons/md';
import { FaAmbulance, FaUserMd, FaHeartbeat } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useHospitalDataContext } from '../context/HospitalDataContext';
import { useAmbulance } from '../context/AmbulanceContext';
import LoginPopup from '../pages/auth/LoginPopup';

const EmergencyPage = () => {
  const { user } = useAuth();
  const { getDoctors, getDepartments } = useHospitalDataContext();
  const { openAmbulanceModal } = useAmbulance();
  const navigate = useNavigate();
  const toast = useToast();

  const [emergencyData, setEmergencyData] = useState({
    type: '',
    description: '',
    location: '',
    patientName: '',
    phone: '',
  });
  
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isCallingDoctor, setIsCallingDoctor] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const bgColor = useColorModeValue('white', 'gray.800');
  const dangerBg = useColorModeValue('red.50', 'red.900');
  const warningBg = useColorModeValue('orange.50', 'orange.900');
  const infoBg = useColorModeValue('blue.50', 'blue.900');

  const emergencyTypes = [
    { id: 'cardiac', label: 'Cardiac Emergency', icon: FaHeartbeat, color: 'red', description: 'Heart attack, chest pain, palpitations' },
    { id: 'trauma', label: 'Trauma/Accident', icon: MdEmergency, color: 'orange', description: 'Road accidents, falls, injuries' },
    { id: 'stroke', label: 'Stroke', icon: FiActivity, color: 'purple', description: 'Sudden weakness, speech difficulty, facial drooping' },
    { id: 'respiratory', label: 'Breathing Difficulty', icon: FaUserMd, color: 'blue', description: 'Shortness of breath, asthma attack, choking' },
    { id: 'pediatric', label: 'Pediatric Emergency', icon: MdPeople, color: 'green', description: 'Child emergencies, high fever in infants' },
    { id: 'other', label: 'Other Emergency', icon: MdWarning, color: 'gray', description: 'Any other medical emergency' },
  ];

  const emergencyNumbers = [
    { number: '108', service: 'National Emergency', description: 'Ambulance, Fire, Police' },
    { number: '102', service: 'Ambulance', description: 'Emergency medical services' },
    { number: '+91-11-25678901', service: 'Hospital Emergency', description: 'MediCare Pro Emergency Desk' },
  ];

  useEffect(() => {
    // Load available emergency doctors
    const doctors = getDoctors ? getDoctors() : [];
    const emergencyDept = getDepartments ? getDepartments().find(dept => dept.name === 'Emergency Medicine') : null;
    
    if (emergencyDept) {
      const emergencyDoctors = doctors.filter(doctor => 
        doctor.department === 'Emergency Medicine' || 
        doctor.specialization.toLowerCase().includes('emergency')
      );
      setAvailableDoctors(emergencyDoctors.slice(0, 3));
    }
  }, [getDoctors, getDepartments]);

  const handleEmergencyTypeSelect = (typeId) => {
    setEmergencyData(prev => ({ ...prev, type: typeId }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmergencyData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuickCall = (number) => {
    window.open(`tel:${number}`, '_blank');
    toast({
      title: 'Calling Emergency Number',
      description: `Connecting to ${number}`,
      status: 'info',
      duration: 3000,
    });
  };

  const handleDoctorCall = (doctor) => {
    if (!user) {
      setIsLoginOpen(true);
      return;
    }

    setIsCallingDoctor(true);
    setSelectedDoctor(doctor);

    // Simulate doctor call
    setTimeout(() => {
      setIsCallingDoctor(false);
      toast({
        title: 'Doctor Connected!',
        description: `Dr. ${doctor.name} is on the call`,
        status: 'success',
        duration: 5000,
      });

      // Log the emergency call
      const emergencyCall = {
        id: `EC-${Date.now()}`,
        doctorId: doctor.id,
        doctorName: doctor.name,
        patientId: user.id,
        patientName: user.name,
        timestamp: new Date().toISOString(),
        type: emergencyData.type || 'general',
        duration: 'Connected',
      };

      const existingCalls = JSON.parse(localStorage.getItem('emergencyCalls') || '[]');
      localStorage.setItem('emergencyCalls', JSON.stringify([...existingCalls, emergencyCall]));
    }, 2000);
  };

  const handleGetAmbulance = () => {
    if (!user) {
      setIsLoginOpen(true);
      return;
    }
    openAmbulanceModal();
  };

  const handleSubmitEmergency = () => {
    if (!emergencyData.type || !emergencyData.description) {
      toast({
        title: 'Missing Information',
        description: 'Please select emergency type and provide description',
        status: 'warning',
        duration: 3000,
      });
      return;
    }

    if (!user) {
      setIsLoginOpen(true);
      return;
    }

    // Save emergency request
    const emergencyRequest = {
      id: `ER-${Date.now()}`,
      ...emergencyData,
      patientId: user.id,
      patientName: user.name,
      timestamp: new Date().toISOString(),
      status: 'pending',
      assignedDoctor: selectedDoctor?.id,
    };

    const existingEmergencies = JSON.parse(localStorage.getItem('emergencyRequests') || '[]');
    localStorage.setItem('emergencyRequests', JSON.stringify([...existingEmergencies, emergencyRequest]));

    toast({
      title: 'Emergency Alert Sent!',
      description: 'Medical team has been notified. Help is on the way.',
      status: 'success',
      duration: 5000,
    });

    // Reset form
    setEmergencyData({
      type: '',
      description: '',
      location: '',
      patientName: '',
      phone: '',
    });
  };

  return (
    <Box>
      {/* Emergency Hero Section */}
      <Box
        bgGradient="linear(to-r, red.600, orange.500)"
        color="white"
        py={12}
        position="relative"
        overflow="hidden"
      >
        <Container maxW="container.xl">
          <VStack spacing={6} align="center" textAlign="center">
            <HStack spacing={4}>
              <Box
                w="80px"
                h="80px"
                bg="white"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                animation="pulse 2s infinite"
              >
                <MdEmergency size={48} color="#E53E3E" />
              </Box>
              <Box>
                <Heading size="2xl">EMERGENCY SERVICES</Heading>
                <Text fontSize="xl" mt={2}>24x7 Immediate Medical Assistance</Text>
              </Box>
            </HStack>
            
            <Alert status="error" borderRadius="lg" maxW="3xl">
              <AlertIcon />
              <Box>
                <AlertTitle>LIFE-THREATENING EMERGENCY?</AlertTitle>
                <AlertDescription>
                  Call 108 immediately or visit the nearest emergency department
                </AlertDescription>
              </Box>
            </Alert>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        {/* Quick Action Cards */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={10}>
          <Card bg={dangerBg} borderLeft="4px solid" borderLeftColor="red.500">
            <CardBody>
              <VStack spacing={4} align="center" textAlign="center">
                <Box
                  w="60px"
                  h="60px"
                  bg="red.100"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FaAmbulance size={32} color="#E53E3E" />
                </Box>
                <Box>
                  <Heading size="md" mb={2}>Get Ambulance</Heading>
                  <Text fontSize="sm" mb={4}>Immediate ambulance service with trained paramedics</Text>
                  <Button
                    colorScheme="red"
                    size="lg"
                    w="100%"
                    onClick={handleGetAmbulance}
                    leftIcon={<FaAmbulance />}
                  >
                    Request Ambulance
                  </Button>
                </Box>
              </VStack>
            </CardBody>
          </Card>

          <Card bg={warningBg} borderLeft="4px solid" borderLeftColor="orange.500">
            <CardBody>
              <VStack spacing={4} align="center" textAlign="center">
                <Box
                  w="60px"
                  h="60px"
                  bg="orange.100"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FaUserMd size={32} color="#DD6B20" />
                </Box>
                <Box>
                  <Heading size="md" mb={2}>Talk to Doctor</Heading>
                  <Text fontSize="sm" mb={4}>Instant video/audio consultation with emergency doctors</Text>
                  <Button
                    colorScheme="orange"
                    size="lg"
                    w="100%"
                    onClick={() => availableDoctors.length > 0 && handleDoctorCall(availableDoctors[0])}
                    leftIcon={<FaUserMd />}
                    isLoading={isCallingDoctor && selectedDoctor?.id === availableDoctors[0]?.id}
                  >
                    Call Emergency Doctor
                  </Button>
                </Box>
              </VStack>
            </CardBody>
          </Card>

          <Card bg={infoBg} borderLeft="4px solid" borderLeftColor="blue.500">
            <CardBody>
              <VStack spacing={4} align="center" textAlign="center">
                <Box
                  w="60px"
                  h="60px"
                  bg="blue.100"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <MdLocalHospital size={32} color="#3182CE" />
                </Box>
                <Box>
                  <Heading size="md" mb={2}>Hospital Directions</Heading>
                  <Text fontSize="sm" mb={4}>Get real-time directions to our emergency department</Text>
                  <Button
                    colorScheme="blue"
                    size="lg"
                    w="100%"
                    onClick={() => window.open('https://maps.app.goo.gl/hospital-location', '_blank')}
                    leftIcon={<MdDirectionsCar />}
                  >
                    Get Directions
                  </Button>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Emergency Type Selection */}
        <Card mb={8}>
          <CardHeader>
            <Heading size="lg">Select Emergency Type</Heading>
            <Text color="gray.600">Choose the type of emergency for appropriate assistance</Text>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              {emergencyTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={emergencyData.type === type.id ? 'solid' : 'outline'}
                  colorScheme={emergencyData.type === type.id ? type.color : 'gray'}
                  h="auto"
                  py={6}
                  onClick={() => handleEmergencyTypeSelect(type.id)}
                  justifyContent="flex-start"
                >
                  <VStack spacing={2} align="start">
                    <HStack spacing={3}>
                      <Icon as={type.icon} />
                      <Text fontWeight="bold">{type.label}</Text>
                    </HStack>
                    <Text fontSize="sm" textAlign="left">{type.description}</Text>
                  </VStack>
                </Button>
              ))}
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Emergency Form */}
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8} mb={10}>
          <GridItem>
            <Card>
              <CardHeader>
                <Heading size="md">Emergency Details</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={6}>
                  <FormControl>
                    <FormLabel>Describe the Emergency</FormLabel>
                    <Textarea
                      name="description"
                      placeholder="Please describe the symptoms, patient condition, and any immediate concerns..."
                      value={emergencyData.description}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Location (if different from registered address)</FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <MdLocationOn color="gray.400" />
                      </InputLeftElement>
                      <Input
                        name="location"
                        placeholder="Current location or address"
                        value={emergencyData.location}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Patient Information</FormLabel>
                    <HStack spacing={4}>
                      <Input
                        name="patientName"
                        placeholder="Patient name"
                        value={emergencyData.patientName}
                        onChange={handleInputChange}
                      />
                      <Input
                        name="phone"
                        placeholder="Contact phone"
                        value={emergencyData.phone}
                        onChange={handleInputChange}
                      />
                    </HStack>
                  </FormControl>

                  <Button
                    colorScheme="red"
                    size="lg"
                    w="100%"
                    onClick={handleSubmitEmergency}
                    leftIcon={<MdEmergency />}
                  >
                    Send Emergency Alert
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem>
            {/* Available Emergency Doctors */}
            <Card mb={6}>
              <CardHeader>
                <Heading size="md">Available Emergency Doctors</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4}>
                  {availableDoctors.map((doctor) => (
                    <Card
                      key={doctor.id}
                      variant="outline"
                      w="100%"
                      _hover={{ shadow: 'md', cursor: 'pointer' }}
                      onClick={() => handleDoctorCall(doctor)}
                    >
                      <CardBody>
                        <HStack spacing={4}>
                          <Avatar
                            size="md"
                            name={doctor.name}
                            src={doctor.profileImage}
                          />
                          <Box flex={1}>
                            <Text fontWeight="bold">{doctor.name}</Text>
                            <Text fontSize="sm" color="gray.600">{doctor.specialization}</Text>
                            <Badge colorScheme="green" mt={1}>Available Now</Badge>
                          </Box>
                          <Button
                            colorScheme="blue"
                            size="sm"
                            isLoading={isCallingDoctor && selectedDoctor?.id === doctor.id}
                          >
                            Call Now
                          </Button>
                        </HStack>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              </CardBody>
            </Card>

            {/* Emergency Numbers */}
            <Card>
              <CardHeader>
                <Heading size="md">Emergency Contacts</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={3}>
                  {emergencyNumbers.map((contact, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      w="100%"
                      justifyContent="space-between"
                      onClick={() => handleQuickCall(contact.number)}
                    >
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold">{contact.service}</Text>
                        <Text fontSize="sm" color="gray.600">{contact.description}</Text>
                      </VStack>
                      <Badge colorScheme="red" fontSize="lg">{contact.number}</Badge>
                    </Button>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>

        {/* Emergency Instructions */}
        <Card bg="red.50" border="1px solid" borderColor="red.200">
          <CardBody>
            <VStack spacing={4} align="start">
              <Heading size="md" color="red.700">Emergency First Aid Instructions</Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
                <Box>
                  <Text fontWeight="bold" mb={2}>For Cardiac Emergency:</Text>
                  <Text>• Call emergency number immediately</Text>
                  <Text>• Keep patient in comfortable position</Text>
                  <Text>• Loosen tight clothing</Text>
                  <Text>• Do not give anything to eat or drink</Text>
                  <Text>• Be prepared for CPR if trained</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" mb={2}>For Trauma/Accident:</Text>
                  <Text>• Do not move patient unnecessarily</Text>
                  <Text>• Control bleeding with clean cloth</Text>
                  <Text>• Keep injured limb elevated</Text>
                  <Text>• Do not remove impaled objects</Text>
                  <Text>• Keep patient warm</Text>
                </Box>
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>

        {/* Stats Section */}
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mt={10}>
          <Stat>
            <StatLabel>Response Time</StatLabel>
            <StatNumber>8.5 min</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              12% faster than average
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Emergency Cases Today</StatLabel>
            <StatNumber>42</StatNumber>
            <StatHelpText>24x7 service</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Ambulances Available</StatLabel>
            <StatNumber>6</StatNumber>
            <StatHelpText>Across Delhi NCR</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Doctors On Duty</StatLabel>
            <StatNumber>12</StatNumber>
            <StatHelpText>Emergency specialists</StatHelpText>
          </Stat>
        </SimpleGrid>
      </Container>

      {/* Login Popup */}
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={() => {
          toast({
            title: 'Logged In',
            description: 'You can now access emergency services',
            status: 'success',
            duration: 3000,
          });
        }}
      />

      {/* Add CSS for pulse animation */}
      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
};

export default EmergencyPage;