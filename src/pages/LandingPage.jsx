import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Grid,
  GridItem,
  VStack,
  HStack,
  Icon,
  Avatar,
  AvatarGroup,
  Badge,
  Card,
  CardBody,
  Stack,
  Divider,
  useColorModeValue,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiHeart,
  FiClock,
  FiMapPin,
  FiPhone,
  FiMail,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
  FiArrowRight,
  FiUsers,
  FiActivity,
  FiShield,
  FiTarget,
  FiGlobe,
  FiCalendar,
  FiAward,
  FiCheckCircle,
} from 'react-icons/fi';
import { RiHospitalLine, RiStethoscopeLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionHeading = motion(Heading);

const LandingPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { isOpen: isDoctorModalOpen, onOpen: onDoctorModalOpen, onClose: onDoctorModalClose } = useDisclosure();
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const bgColor = useColorModeValue('white', 'gray.900');
  const primaryColor = useColorModeValue('brand.500', 'brand.300');
  const secondaryColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');

  // Hero Carousel Images
  const heroSlides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Advanced Medical Care',
      subtitle: 'State-of-the-art healthcare with cutting-edge technology',
      cta: 'Book Appointment',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80',
      title: '24/7 Emergency Services',
      subtitle: 'Round-the-clock emergency care with expert medical staff',
      cta: 'Emergency Contact',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Patient-Centered Approach',
      subtitle: 'Personalized care plans for optimal recovery',
      cta: 'Meet Our Doctors',
    },
  ];

  // Core Values
  const coreValues = [
    {
      icon: FiHeart,
      title: 'Compassionate Care',
      description: 'Putting patients first with empathy and understanding',
      color: 'red.500',
    },
    {
      icon: FiShield,
      title: 'Safety First',
      description: 'Highest standards of patient safety and quality care',
      color: 'blue.500',
    },
    {
      icon: FiTarget,
      title: 'Excellence',
      description: 'Commitment to medical excellence and innovation',
      color: 'green.500',
    },
    {
      icon: FiUsers,
      title: 'Teamwork',
      description: 'Collaborative approach to comprehensive healthcare',
      color: 'purple.500',
    },
    {
      icon: FiActivity,
      title: 'Innovation',
      description: 'Embracing cutting-edge technology and research',
      color: 'orange.500',
    },
    {
      icon: FiGlobe,
      title: 'Community',
      description: 'Serving our community with integrity and respect',
      color: 'teal.500',
    },
  ];

  // Doctors Data
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiologist',
      experience: '12 years',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      rating: 4.9,
      patients: 1560,
      department: 'Cardiology',
      education: 'MD, Harvard Medical School',
      availability: 'Mon-Fri, 9AM-5PM',
      bio: 'Specialized in interventional cardiology with extensive experience in complex cardiac procedures.',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialization: 'Neurologist',
      experience: '8 years',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      rating: 4.8,
      patients: 1240,
      department: 'Neurology',
      education: 'MD, Johns Hopkins University',
      availability: 'Mon-Sat, 10AM-6PM',
      bio: 'Expert in neurological disorders with focus on stroke prevention and treatment.',
    },
    {
      id: 3,
      name: 'Dr. Lisa Taylor',
      specialization: 'Orthopedic Surgeon',
      experience: '15 years',
      image: 'https://images.unsplash.com/photo-1594824434340-7e7dfc37cabb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      rating: 4.9,
      patients: 2100,
      department: 'Orthopedics',
      education: 'MD, Stanford University',
      availability: 'Tue-Thu, 8AM-4PM',
      bio: 'Specialized in joint replacement and sports medicine with advanced surgical techniques.',
    },
    {
      id: 4,
      name: 'Dr. Robert Kim',
      specialization: 'Pediatrician',
      experience: '10 years',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      rating: 4.7,
      patients: 1800,
      department: 'Pediatrics',
      education: 'MD, University of California',
      availability: 'Mon-Fri, 9AM-5PM',
      bio: 'Dedicated to children\'s health with focus on preventive care and developmental pediatrics.',
    },
    {
      id: 5,
      name: 'Dr. Amanda Scott',
      specialization: 'Dermatologist',
      experience: '6 years',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      rating: 4.6,
      patients: 950,
      department: 'Dermatology',
      education: 'MD, Yale University',
      availability: 'Mon-Wed-Fri, 11AM-7PM',
      bio: 'Expert in cosmetic and medical dermatology with focus on skin cancer prevention.',
    },
    {
      id: 6,
      name: 'Dr. James Wilson',
      specialization: 'Oncologist',
      experience: '14 years',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      rating: 4.8,
      patients: 1650,
      department: 'Oncology',
      education: 'MD, Mayo Clinic',
      availability: 'Mon-Sat, 9AM-5PM',
      bio: 'Specialized in cancer treatment with expertise in targeted therapy and immunotherapy.',
    },
  ];

  // Executive Management
  const executives = [
    {
      name: 'John Smith',
      position: 'CEO',
      experience: '25 years',
      education: 'MBA, Harvard Business School',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    },
    {
      name: 'Emma Davis',
      position: 'Medical Director',
      experience: '20 years',
      education: 'MD, Johns Hopkins University',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    },
    {
      name: 'Robert Brown',
      position: 'COO',
      experience: '18 years',
      education: 'MS, Stanford University',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    },
    {
      name: 'Sarah Miller',
      position: 'CFO',
      experience: '15 years',
      education: 'MBA, Wharton School',
      image: 'https://images.unsplash.com/photo-1594824434340-7e7dfc37cabb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    },
  ];

  // Statistics
  const stats = [
    { label: 'Patients Treated', value: '50,000+', change: '+15%' },
    { label: 'Successful Surgeries', value: '25,000+', change: '+12%' },
    { label: 'Expert Doctors', value: '200+', change: '+8%' },
    { label: 'Departments', value: '25+', change: '+5%' },
    { label: 'Years of Service', value: '30+', change: '' },
    { label: 'Patient Satisfaction', value: '98%', change: '+2%' },
  ];

  // Departments
  const departments = [
    { name: 'Cardiology', icon: FiHeart, doctors: 24, color: 'red' },
    { name: 'Neurology', icon: FiActivity, doctors: 18, color: 'blue' },
    { name: 'Orthopedics', icon: FiTarget, doctors: 22, color: 'green' },
    { name: 'Pediatrics', icon: FiUsers, doctors: 28, color: 'purple' },
    { name: 'Oncology', icon: FiShield, doctors: 16, color: 'orange' },
    { name: 'Emergency', icon: FiClock, doctors: 35, color: 'teal' },
  ];

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    onDoctorModalOpen();
  };

  return (
    <Box bg={bgColor} color={textColor}>
      {/* Hero Section with Carousel */}
      <Box position="relative" h="100vh" overflow="hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          effect="fade"
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
          className="hero-swiper"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Box
                h="100vh"
                position="relative"
                bgImage={`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${slide.image})`}
                bgSize="cover"
                bgPosition="center"
                display="flex"
                alignItems="center"
              >
                <Container maxW="container.xl">
                  <MotionFlex
                    direction="column"
                    align={{ base: 'center', lg: 'flex-start' }}
                    textAlign={{ base: 'center', lg: 'left' }}
                    color="white"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Badge
                      bg="brand.500"
                      color="white"
                      px={4}
                      py={1}
                      borderRadius="full"
                      fontSize="sm"
                      mb={4}
                    >
                      Excellence in Healthcare
                    </Badge>
                    
                    <MotionHeading
                      size="3xl"
                      mb={4}
                      fontWeight="bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {slide.title}
                    </MotionHeading>
                    
                    <Text fontSize="xl" mb={8} maxW="600px">
                      {slide.subtitle}
                    </Text>
                    
                    <HStack spacing={4}>
                      <Button
                        as={RouterLink}
                        to="/leadership"
                        size="lg"
                        colorScheme="brand"
                        rightIcon={<FiArrowRight />}
                        _hover={{ transform: 'translateY(-2px)' }}
                      >
                        {slide.cta}
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        color="white"
                        _hover={{ bg: 'whiteAlpha.200' }}
                      >
                        Learn More
                      </Button>
                    </HStack>
                  </MotionFlex>
                </Container>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Floating Stats */}
        <MotionBox
          position="absolute"
          bottom={8}
          left="50%"
          transform="translateX(-50%)"
          bg="whiteAlpha.200"
          backdropFilter="blur(10px)"
          borderRadius="2xl"
          p={4}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <HStack spacing={8}>
            {stats.slice(0, 4).map((stat) => (
              <VStack key={stat.label} spacing={1}>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  {stat.value}
                </Text>
                <Text fontSize="sm" color="whiteAlpha.800">
                  {stat.label}
                </Text>
              </VStack>
            ))}
          </HStack>
        </MotionBox>
      </Box>

      {/* Navigation Menu */}
      <Box position="sticky" top={0} zIndex={1000} bg={bgColor}shadow="sm" borderBottom="1px" borderColor="gray.200">
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center" py={4}>
            <HStack spacing={3}>
              <Icon as={RiHospitalLine} w={8} h={8} color="brand.500" />
              <Box>
                <Heading size="lg" color="brand.500">MediCare Pro</Heading>
                <Text fontSize="sm" color="gray.600">Advanced Hospital Management</Text>
              </Box>
            </HStack>

     <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
  {[
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Doctors', path: '/doctors' },
    { label: 'Departments', path: '/departments' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ].map((item) => (
    <Text
      key={item.label}
      as={RouterLink}
      to={item.path}
      fontWeight="medium"
      cursor="pointer"
      _hover={{ color: 'brand.500' }}
    >
      {item.label}
    </Text>
  ))}
</HStack>


            <Button
              as={RouterLink}
              to="/patients"
              colorScheme="brand"
              size="lg"
              rightIcon={<FiArrowRight />}
            >
              Patient Portal
            </Button>
          </Flex>
        </Container>
      </Box>

      {/* About MediCare */}
      <Box py={20} bg={secondaryColor}>
        <Container maxW="container.xl">
          <VStack spacing={12} align="center">
            <VStack spacing={4} textAlign="center" maxW="800px">
              <Badge colorScheme="brand" px={4} py={1} borderRadius="full">About Us</Badge>
              <Heading size="2xl">Welcome to MediCare Pro</Heading>
              <Text fontSize="xl" color="gray.600">
                A leading healthcare institution providing comprehensive medical services with 
                state-of-the-art technology and expert medical professionals.
              </Text>
            </VStack>

            {/* Core Values */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
              {coreValues.map((value, index) => (
                <MotionBox
                  key={value.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card h="full" _hover={{ transform: 'translateY(-8px)', shadow: 'xl' }} transition="all 0.3s">
                    <CardBody>
                      <VStack spacing={4} align="center" textAlign="center">
                        <Box
                          p={4}
                          borderRadius="full"
                          bg={`${value.color}20`}
                          color={value.color}
                        >
                          <Icon as={value.icon} w={8} h={8} />
                        </Box>
                        <Heading size="md">{value.title}</Heading>
                        <Text color="gray.600">{value.description}</Text>
                      </VStack>
                    </CardBody>
                  </Card>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Mission & Strategy */}
      <Box py={20}>
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={12} alignItems="center">
            <GridItem>
              <VStack spacing={6} align="start">
                <Badge colorScheme="green" px={4} py={1} borderRadius="full">Our Mission</Badge>
                <Heading size="2xl">Transforming Healthcare Through Innovation</Heading>
                <Text fontSize="lg" color="gray.600">
                  Our mission is to provide accessible, high-quality healthcare services while 
                  advancing medical research and education. We strive to improve patient outcomes 
                  through innovative treatments and compassionate care.
                </Text>
                
                <SimpleGrid columns={2} spacing={6} w="full" pt={4}>
                  <VStack align="start" spacing={2}>
                    <HStack>
                      <Icon as={FiCheckCircle} color="green.500" />
                      <Text fontWeight="medium">Quality Care</Text>
                    </HStack>
                    <VStack align="start" spacing={2}>
                      <HStack>
                        <Icon as={FiCheckCircle} color="green.500" />
                        <Text fontWeight="medium">Advanced Technology</Text>
                      </HStack>
                    </VStack>
                  </VStack>
                  <VStack align="start" spacing={2}>
                    <HStack>
                      <Icon as={FiCheckCircle} color="green.500" />
                      <Text fontWeight="medium">Patient Safety</Text>
                    </HStack>
                    <VStack align="start" spacing={2}>
                      <HStack>
                        <Icon as={FiCheckCircle} color="green.500" />
                        <Text fontWeight="medium">Research Excellence</Text>
                      </HStack>
                    </VStack>
                  </VStack>
                </SimpleGrid>
              </VStack>
            </GridItem>
            
            <GridItem>
              <Box
                bgImage="url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80')"
                bgSize="cover"
                bgPosition="center"
                h="500px"
                borderRadius="2xl"
                position="relative"
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  bg="linear-gradient(transparent, rgba(0,0,0,0.8))"
                  p={6}
                  color="white"
                >
                  <Heading size="lg">Strategic Goals 2024</Heading>
                  <Text mt={2}>Expanding services to reach more communities</Text>
                </Box>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Our Doctors - Slider Section */}
      <Box py={20} bg={secondaryColor}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Badge colorScheme="blue" px={4} py={1} borderRadius="full">Medical Team</Badge>
              <Heading size="2xl">Meet Our Expert Doctors</Heading>
              <Text fontSize="xl" color="gray.600" maxW="800px">
                Highly qualified medical professionals dedicated to providing exceptional healthcare
              </Text>
            </VStack>

            <Box w="full">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 4 },
                }}
                navigation
                pagination={{ clickable: true }}
                className="doctor-swiper"
              >
                {doctors.map((doctor) => (
                  <SwiperSlide key={doctor.id}>
                    <Card
                      h="full"
                      _hover={{ transform: 'translateY(-8px)', shadow: 'xl' }}
                      transition="all 0.3s"
                      cursor="pointer"
                      onClick={() => handleDoctorClick(doctor)}
                    >
                      <CardBody>
                        <VStack spacing={4}>
                          <Box position="relative">
                            <Image
                              src={doctor.image}
                              alt={doctor.name}
                              h="250px"
                              w="full"
                              objectFit="cover"
                              borderRadius="lg"
                            />
                            <Badge
                              position="absolute"
                              top={3}
                              right={3}
                              colorScheme="blue"
                              borderRadius="full"
                            >
                              {doctor.experience}
                            </Badge>
                          </Box>
                          
                          <VStack spacing={2} align="center" w="full">
                            <Heading size="md">{doctor.name}</Heading>
                            <Badge colorScheme="purple" variant="subtle">
                              {doctor.specialization}
                            </Badge>
                            
                            <HStack spacing={4} w="full" justify="center">
                              <HStack spacing={1}>
                                <Icon as={FiStar} color="yellow.500" />
                                <Text fontWeight="medium">{doctor.rating}</Text>
                              </HStack>
                              <HStack spacing={1}>
                                <Icon as={FiUsers} color="blue.500" />
                                <Text>{doctor.patients}+</Text>
                              </HStack>
                            </HStack>
                            
                            <Text fontSize="sm" color="gray.600" textAlign="center">
                              {doctor.department}
                            </Text>
                          </VStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Departments */}
      <Box py={20}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Badge colorScheme="green" px={4} py={1} borderRadius="full">Specialties</Badge>
              <Heading size="2xl">Our Medical Departments</Heading>
              <Text fontSize="xl" color="gray.600">
                Comprehensive healthcare services across all specialties
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
              {departments.map((dept, index) => (
                <MotionBox
                  key={dept.name}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
                    transition="all 0.3s"
                  >
                    <CardBody>
                      <HStack spacing={4}>
                        <Box
                          p={3}
                          borderRadius="lg"
                          bg={`${dept.color}.100`}
                          color={`${dept.color}.600`}
                        >
                          <Icon as={dept.icon} w={6} h={6} />
                        </Box>
                        <Box flex="1">
                          <Heading size="sm">{dept.name}</Heading>
                          <Text fontSize="sm" color="gray.600">
                            {dept.doctors} Doctors
                          </Text>
                        </Box>
                        <Button
                          size="sm"
                          variant="ghost"
                          colorScheme={dept.color}
                          rightIcon={<FiArrowRight />}
                        >
                          View
                        </Button>
                      </HStack>
                    </CardBody>
                  </Card>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Executive Management */}
      <Box py={20} bg={secondaryColor}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Badge colorScheme="red" px={4} py={1} borderRadius="full">Leadership</Badge>
              <Heading size="2xl">Executive Management</Heading>
              <Text fontSize="xl" color="gray.600">
                Experienced leadership driving healthcare excellence
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
              {executives.map((exec, index) => (
                <MotionBox
                  key={exec.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card textAlign="center">
                    <CardBody>
                      <VStack spacing={4}>
                        <Avatar
                          size="xl"
                          name={exec.name}
                          src={exec.image}
                          border="4px solid"
                          borderColor="brand.500"
                        />
                        <Box>
                          <Heading size="md">{exec.name}</Heading>
                          <Badge colorScheme="brand" mt={1}>
                            {exec.position}
                          </Badge>
                          <Text fontSize="sm" color="gray.600" mt={2}>
                            {exec.experience} experience
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {exec.education}
                          </Text>
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Our History */}
      <Box py={20}>
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={12} alignItems="center">
            <GridItem>
              <Box
                bgImage="url('https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80')"
                bgSize="cover"
                bgPosition="center"
                h="500px"
                borderRadius="2xl"
              />
            </GridItem>
            
            <GridItem>
              <VStack spacing={6} align="start">
                <Badge colorScheme="purple" px={4} py={1} borderRadius="full">Our Journey</Badge>
                <Heading size="2xl">30 Years of Healthcare Excellence</Heading>
                
                <Tabs variant="enclosed" w="full">
                  <TabList>
                    <Tab>1990s</Tab>
                    <Tab>2000s</Tab>
                    <Tab>2010s</Tab>
                    <Tab>2020s</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Text>Founded in 1994 as a small community hospital with 50 beds and 3 departments.</Text>
                    </TabPanel>
                    <TabPanel>
                      <Text>Expanded to 200 beds and added advanced surgical facilities in 2005.</Text>
                    </TabPanel>
                    <TabPanel>
                      <Text>Achieved JCI accreditation and established research center in 2015.</Text>
                    </TabPanel>
                    <TabPanel>
                      <Text>Opened new cancer center and implemented AI-driven healthcare solutions.</Text>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
                
                <SimpleGrid columns={3} spacing={4} w="full" pt={4}>
                  <VStack>
                    <Text fontSize="3xl" fontWeight="bold" color="brand.500">30+</Text>
                    <Text fontSize="sm">Years</Text>
                  </VStack>
                  <VStack>
                    <Text fontSize="3xl" fontWeight="bold" color="brand.500">500+</Text>
                    <Text fontSize="sm">Beds</Text>
                  </VStack>
                  <VStack>
                    <Text fontSize="3xl" fontWeight="bold" color="brand.500">50K+</Text>
                    <Text fontSize="sm">Patients/Year</Text>
                  </VStack>
                </SimpleGrid>
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={20} bg="brand.500" color="white">
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8} alignItems="center">
            <GridItem>
              <Heading size="2xl">Ready to Experience Exceptional Healthcare?</Heading>
              <Text fontSize="xl" mt={4} opacity={0.9}>
                Join thousands of satisfied patients who trust us with their health.
              </Text>
            </GridItem>
            
            <GridItem>
              <VStack spacing={4}>
                <Button
                  as={RouterLink}
                  to="/appointment"
                  size="lg"
                  colorScheme="white"
                  variant="outline"
                  w="full"
                  rightIcon={<FiArrowRight />}
                >
                  Patient Login
                </Button>
                <Button
                  size="lg"
                  bg="white"
                  color="brand.500"
                  w="full"
                  _hover={{ bg: 'whiteAlpha.900' }}
                >
                  Book Appointment
                </Button>
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box py={12} bg="gray.900" color="white">
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: '1fr', md: '2fr 1fr 1fr 1fr' }} gap={8}>
            <GridItem>
              <VStack align="start" spacing={4}>
                <HStack spacing={3}>
                  <Icon as={RiHospitalLine} w={8} h={8} color="white" />
                  <Box>
                    <Heading size="lg">MediCare Pro</Heading>
                    <Text fontSize="sm" opacity={0.8}>Advanced Hospital Management</Text>
                  </Box>
                </HStack>
                <Text opacity={0.8}>
                  Providing exceptional healthcare services with compassion and innovation since 1994.
                </Text>
                <HStack spacing={4}>
                  {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube].map((Icon, index) => (
                    <IconButton
                      key={index}
                      icon={<Icon />}
                      variant="ghost"
                      color="white"
                      _hover={{ bg: 'whiteAlpha.200' }}
                      aria-label="Social media"
                    />
                  ))}
                </HStack>
              </VStack>
            </GridItem>
            
            {['Quick Links', 'Departments', 'Contact'].map((section) => (
              <GridItem key={section}>
                <VStack align="start" spacing={4}>
                  <Heading size="md">{section}</Heading>
                  <VStack align="start" spacing={2}>
                    {[...Array(4)].map((_, i) => (
                      <Text key={i} opacity={0.8} cursor="pointer" _hover={{ opacity: 1 }}>
                        Link {i + 1}
                      </Text>
                    ))}
                  </VStack>
                </VStack>
              </GridItem>
            ))}
          </Grid>
          
          <Divider my={8} borderColor="whiteAlpha.300" />
          
          <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
            <Text opacity={0.8}>
              © 2024 MediCare Pro Hospital. All rights reserved.
            </Text>
            <HStack spacing={6}>
              <Text opacity={0.8} cursor="pointer" _hover={{ opacity: 1 }}>Privacy Policy</Text>
              <Text opacity={0.8} cursor="pointer" _hover={{ opacity: 1 }}>Terms of Service</Text>
              <Text opacity={0.8} cursor="pointer" _hover={{ opacity: 1 }}>Sitemap</Text>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Doctor Detail Modal */}
      <Modal isOpen={isDoctorModalOpen} onClose={onDoctorModalClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">{selectedDoctor?.name}</Heading>
            <Text color="gray.600">{selectedDoctor?.specialization}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedDoctor && (
              <VStack spacing={6} align="stretch">
                <Grid templateColumns="1fr 2fr" gap={6}>
                  <Image
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    borderRadius="lg"
                    h="200px"
                    objectFit="cover"
                  />
                  <VStack align="start" spacing={3}>
                    <Badge colorScheme="purple">{selectedDoctor.department}</Badge>
                    <HStack spacing={4}>
                      <HStack>
                        <Icon as={FiStar} color="yellow.500" />
                        <Text>{selectedDoctor.rating} Rating</Text>
                      </HStack>
                      <HStack>
                        <Icon as={FiUsers} />
                        <Text>{selectedDoctor.patients}+ Patients</Text>
                      </HStack>
                    </HStack>
                    <Text><strong>Education:</strong> {selectedDoctor.education}</Text>
                    <Text><strong>Experience:</strong> {selectedDoctor.experience}</Text>
                    <Text><strong>Availability:</strong> {selectedDoctor.availability}</Text>
                  </VStack>
                </Grid>
                
                <Box>
                  <Heading size="md" mb={3}>About Doctor</Heading>
                  <Text>{selectedDoctor.bio}</Text>
                </Box>
                
                <Button
                  colorScheme="brand"
                  size="lg"
                  w="full"
                  rightIcon={<FiArrowRight />}
                >
                  Book Appointment
                </Button>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default LandingPage;