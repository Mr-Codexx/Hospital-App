import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  SimpleGrid,
  Flex,
  Heading,
  Text,
  Icon,
  Button,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stack,
  Badge,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  Avatar,
  AvatarGroup,
  IconButton,
  Tooltip,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Tag,
  TagLabel,
  Wrap,
  WrapItem,
  useToast,
  Spinner,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  ModalFooter,
} from "@chakra-ui/react";
import {
  FiHeart,
  FiActivity,
  FiUserCheck,
  FiMic,
  FiThermometer,
  FiTrendingUp,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiClock,
  FiStar,
  FiUsers,
  FiMapPin,
  FiPhone,
  FiMail,
  FiGlobe,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiPlus,
  FiDownload,
  FiShare2,
  FiBookmark,
  FiChevronRight,
} from "react-icons/fi";
import hospitalData from "../data/HospitalData.json";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedService, setSelectedService] = useState(null);
  const toast = useToast();
    const navigate = useNavigate();

  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("gray.700", "gray.200");
  const descColor = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const colorMap = {
    Cardiology: "red.500",
    Neurology: "purple.500",
    Orthopedics: "blue.500",
    "General Medicine": "green.500",
    Pediatrics: "teal.500",
    Gynecology: "pink.500",
    "Emergency Medicine": "orange.500",
    Oncology: "yellow.600",
    ENT: "cyan.500",
    Pathology: "gray.500",
  };

  const icons = {
    Cardiology: FiHeart,
    Neurology: FiActivity,
    Orthopedics: FiTrendingUp,
    "General Medicine": FiUserCheck,
    Pediatrics: FiUsers,
    Gynecology: FiHeart,
    "Emergency Medicine": FiAlertCircle,
    Oncology: FiThermometer,
    ENT: FiMic,
    Pathology: FiThermometer,
  };

  useEffect(() => {
    // Transform departments data into services format
    const transformedServices = hospitalData.departments.map(dept => ({
      id: dept.id,
      title: dept.name,
      icon: icons[dept.name] || FiActivity,
      description: dept.description,
      color: colorMap[dept.name] || "blue.500",
      headDoctorId: dept.headDoctorId,
      totalBeds: dept.totalBeds,
      occupiedBeds: dept.occupiedBeds,
      floor: dept.floor,
      extension: dept.extension,
      occupancyRate: Math.round((dept.occupiedBeds / dept.totalBeds) * 100),
    }));

    setServices(transformedServices);
    setFilteredServices(transformedServices);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = services;
    
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedFilter !== "all") {
      filtered = filtered.filter(service => 
        service.occupancyRate >= parseInt(selectedFilter)
      );
    }
    
    setFilteredServices(filtered);
  }, [searchTerm, selectedFilter, services]);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    onOpen();
  };

  const handleBookAppointment = () => {
    toast({
      title: "Appointment Requested",
      description: "We'll contact you shortly to confirm your appointment.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  const getDoctorInfo = (doctorId) => {
    return hospitalData.doctors.find(doc => doc.id === doctorId);
  };
 const handleViewDoctorProfile = (doctorId) => {
    navigate(`/doctor/${doctorId}`);
  };
  const getDepartmentStats = () => {
    const totalBeds = services.reduce((sum, service) => sum + service.totalBeds, 0);
    const occupiedBeds = services.reduce((sum, service) => sum + service.occupiedBeds, 0);
    return {
      totalBeds,
      occupiedBeds,
      occupancyRate: Math.round((occupiedBeds / totalBeds) * 100),
      totalDepartments: services.length,
    };
  };

  const stats = getDepartmentStats();

  const ServiceModal = () => (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Flex
              w={12}
              h={12}
              align="center"
              justify="center"
              color="white"
              bg={selectedService?.color}
              borderRadius="full"
            >
              <Icon as={selectedService?.icon} boxSize={6} />
            </Flex>
            <Box>
              <Heading size="lg">{selectedService?.title}</Heading>
              <Text color="gray.500" fontSize="sm">
                Department Details
              </Text>
            </Box>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {selectedService && (
            <VStack align="stretch" spacing={6}>
              <Text>{selectedService.description}</Text>
              
              <Card>
                <CardBody>
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <GridItem>
                      <Stat>
                        <StatLabel>Bed Occupancy</StatLabel>
                        <StatNumber>{selectedService.occupancyRate}%</StatNumber>
                        <Progress value={selectedService.occupancyRate} colorScheme={selectedService.color.split(".")[0]} mt={2} />
                      </Stat>
                    </GridItem>
                    <GridItem>
                      <Stat>
                        <StatLabel>Available Beds</StatLabel>
                        <StatNumber>{selectedService.totalBeds - selectedService.occupiedBeds}</StatNumber>
                        <StatHelpText>Total: {selectedService.totalBeds}</StatHelpText>
                      </Stat>
                    </GridItem>
                  </Grid>
                </CardBody>
              </Card>

              <Divider />

              <Heading size="md">Department Head</Heading>
              {(() => {
                const doctor = getDoctorInfo(selectedService.headDoctorId);
                return doctor ? (
                  <Card variant="outline">
                    <CardBody>
                      <HStack spacing={4}>
                        <Avatar size="lg" name={doctor.name} src={doctor.profileImage} />
                        <Box flex="1">
                          <Heading size="sm">{doctor.name}</Heading>
                          <Text color="gray.600" fontSize="sm">{doctor.specialization}</Text>
                          <Text fontSize="xs" color="gray.500">Experience: {doctor.experience}</Text>
                          <Wrap mt={2} spacing={1}>
                            {doctor.qualifications.map((qual, idx) => (
                              <Tag key={idx} size="sm" colorScheme="blue" variant="subtle">
                                {qual}
                              </Tag>
                            ))}
                          </Wrap>
                        </Box>
                        <IconButton
                          icon={<FiChevronRight />}
                          variant="ghost"
                          aria-label="View doctor"
                            onClick={() => handleViewDoctorProfile(doctor.id)}
                        />
                      </HStack>
                    </CardBody>
                  </Card>
                ) : (
                  <Text color="gray.500">No department head assigned</Text>
                );
              })()}

              <Divider />

              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <VStack align="start" spacing={2}>
                  <Text fontWeight="bold" fontSize="sm">Location</Text>
                  <HStack>
                    <Icon as={FiMapPin} color="gray.500" />
                    <Text fontSize="sm">{selectedService.floor}</Text>
                  </HStack>
                </VStack>
                <VStack align="start" spacing={2}>
                  <Text fontWeight="bold" fontSize="sm">Extension</Text>
                  <HStack>
                    <Icon as={FiPhone} color="gray.500" />
                    <Text fontSize="sm">{selectedService.extension}</Text>
                  </HStack>
                </VStack>
              </Grid>

              <Divider />

              <Heading size="md">Facilities</Heading>
              <Wrap>
                {hospitalData.hospitalInfo.facilities.slice(0, 5).map((facility, idx) => (
                  <Tag key={idx} colorScheme="green" size="md">
                    {facility}
                  </Tag>
                ))}
              </Wrap>
            </VStack>
          )}
        </ModalBody>
        <ModalFooter>
          <HStack spacing={3}>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme={selectedService?.color.split(".")[0]}
              onClick={handleBookAppointment}
              leftIcon={<FiCalendar />}
            >
              Book Appointment
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  if (loading) {
    return (
      <Center minH="60vh">
        <VStack spacing={4}>
          <Spinner size="xl" />
          <Text>Loading services...</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Box bg={bg} minH="100vh" py={{ base: 8, md: 12, lg: 16 }}>
      <Container maxW="full" px={{ base: 4, sm: 6, lg: 8 }}>
        {/* Header with Stats */}
        <VStack spacing={6} textAlign="center" mb={10}>
          <Box>
            <Badge colorScheme="green" fontSize="sm" px={3} py={1} borderRadius="full" mb={3}>
              {hospitalData.hospitalInfo.accreditations[0]}
            </Badge>
            <Heading
              fontSize={{ base: "2.5xl", md: "4xl", lg: "5xl" }}
              color={headingColor}
              lineHeight="shorter"
            >
              Our Medical Services
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color={descColor}
              maxW="3xl"
              mx="auto"
              mt={4}
            >
              Comprehensive healthcare services at {hospitalData.hospitalInfo.name}
            </Text>
          </Box>

          {/* Stats Grid */}
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} w="full" maxW="4xl">
            {[
              { label: "Departments", value: stats.totalDepartments, icon: FiUsers },
              { label: "Total Beds", value: stats.totalBeds, icon: FiHeart },
              { label: "Occupancy", value: `${stats.occupancyRate}%`, icon: FiActivity },
              { label: "24/7 Emergency", value: "Yes", icon: FiAlertCircle },
            ].map((stat, idx) => (
              <Card key={idx} bg={cardBg} shadow="sm" _hover={{ shadow: "md" }}>
                <CardBody>
                  <HStack spacing={3}>
                    <Flex
                      w={12}
                      h={12}
                      align="center"
                      justify="center"
                      bg={`${stat.icon === FiAlertCircle ? "orange" : "blue"}.100`}
                      color={`${stat.icon === FiAlertCircle ? "orange" : "blue"}.600`}
                      borderRadius="lg"
                    >
                      <Icon as={stat.icon} boxSize={6} />
                    </Flex>
                    <Box>
                     <Stat>
                         <StatNumber fontSize="2xl" fontWeight="bold">
                        {stat.value}
                      </StatNumber>
                      <StatLabel color="gray.600" fontSize="sm">
                        {stat.label}
                      </StatLabel>
                     </Stat>
                    </Box>
                  </HStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>

        {/* Search and Filter Bar */}
        <Card mb={10} shadow="md">
          <CardBody>
            <Stack direction={{ base: "column", md: "row" }} spacing={4} align="center">
              <InputGroup flex="1">
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiSearch} color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="lg"
                  borderRadius="lg"
                />
              </InputGroup>
              
              <HStack spacing={4} w={{ base: "full", md: "auto" }}>
                <Select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  size="lg"
                  borderRadius="lg"
                  icon={<FiFilter />}
                  w={{ base: "full", md: "200px" }}
                >
                  <option value="all">All Departments</option>
                  <option value="80">High Occupancy (80%+)</option>
                  <option value="50">Moderate Occupancy (50%+)</option>
                  <option value="0">Low Occupancy</option>
                </Select>
                
                <Button
                  colorScheme="blue"
                  leftIcon={<FiPlus />}
                  size="lg"
                  borderRadius="lg"
                  onClick={() => toast({
                    title: "Quick Appointment",
                    description: "Opening appointment form...",
                    status: "info",
                  })}
                >
                  Quick Book
                </Button>
              </HStack>
            </Stack>
          </CardBody>
        </Card>

        {/* Services Grid */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
          spacing={{ base: 6, md: 8 }}
          mb={12}
        >
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              bg={cardBg}
              border="1px"
              borderColor={borderColor}
              _hover={{
                transform: "translateY(-8px)",
                shadow: "xl",
                borderColor: service.color,
              }}
              transition="all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
              cursor="pointer"
              onClick={() => handleServiceClick(service)}
              position="relative"
              overflow="hidden"
            >
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                h="4px"
                bg={service.color}
              />
              
              <CardHeader pb={2}>
                <HStack justify="space-between" align="start">
                  <HStack spacing={3}>
                    <Flex
                      w={12}
                      h={12}
                      align="center"
                      justify="center"
                      color="white"
                      bg={service.color}
                      borderRadius="xl"
                      shadow="md"
                    >
                      <Icon as={service.icon} boxSize={6} />
                    </Flex>
                    <Box>
                      <Heading size="md">{service.title}</Heading>
                      <Text fontSize="xs" color="gray.500">
                        {service.floor}
                      </Text>
                    </Box>
                  </HStack>
                  <Badge
                    colorScheme={service.occupancyRate > 80 ? "red" : service.occupancyRate > 50 ? "orange" : "green"}
                    fontSize="xs"
                    px={2}
                    py={1}
                    borderRadius="md"
                  >
                    {service.occupiedBeds}/{service.totalBeds} Beds
                  </Badge>
                </HStack>
              </CardHeader>
              
              <CardBody pt={0}>
                <Text noOfLines={3} color={descColor} fontSize="sm">
                  {service.description}
                </Text>
                
                <VStack align="stretch" spacing={3} mt={4}>
                  <Box>
                    <HStack justify="space-between" mb={1}>
                      <Text fontSize="xs" fontWeight="medium" color="gray.600">
                        Occupancy Rate
                      </Text>
                      <Text fontSize="xs" fontWeight="bold" color="gray.700">
                        {service.occupancyRate}%
                      </Text>
                    </HStack>
                    <Progress
                      value={service.occupancyRate}
                      size="sm"
                      borderRadius="full"
                      colorScheme={service.color.split(".")[0]}
                    />
                  </Box>
                  
                  <HStack justify="space-between" fontSize="xs">
                    <HStack>
                      <Icon as={FiMapPin} color="gray.500" boxSize={3} />
                      <Text color="gray.600">{service.floor}</Text>
                    </HStack>
                    <HStack>
                      <Icon as={FiPhone} color="gray.500" boxSize={3} />
                      <Text color="gray.600">Ext: {service.extension}</Text>
                    </HStack>
                  </HStack>
                </VStack>
              </CardBody>
              
              <CardFooter pt={0}>
                <Button
                  w="full"
                  variant="ghost"
                  colorScheme={service.color.split(".")[0]}
                  rightIcon={<FiChevronRight />}
                  size="sm"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>

        {filteredServices.length === 0 && (
          <Alert status="info" borderRadius="lg" mb={8}>
            <AlertIcon />
            <Box>
              <AlertTitle>No services found</AlertTitle>
              <AlertDescription>
                Try adjusting your search or filter criteria
              </AlertDescription>
            </Box>
          </Alert>
        )}

        {/* Additional Info Tabs */}
        <Tabs colorScheme="blue" variant="enclosed" mb={12}>
          <TabList overflowX="auto" py={1}>
            <Tab fontWeight="semibold">Hospital Info</Tab>
            <Tab fontWeight="semibold">Facilities</Tab>
            <Tab fontWeight="semibold">Accreditations</Tab>
            <Tab fontWeight="semibold">Contact</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel>
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
                <Box>
                  <Heading size="md" mb={4}>Hospital Overview</Heading>
                  <Text color={descColor} mb={4}>
                    {hospitalData.hospitalInfo.name} is a premier healthcare facility 
                    located in {hospitalData.hospitalInfo.address.city}, 
                    {hospitalData.hospitalInfo.address.state}. We provide comprehensive 
                    medical services with state-of-the-art technology and expert medical staff.
                  </Text>
                  <HStack spacing={6} wrap="wrap">
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="bold" fontSize="sm">OPD Timings</Text>
                      <Text fontSize="sm" color="gray.600">
                        {hospitalData.hospitalInfo.timings.opd}
                      </Text>
                    </VStack>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="bold" fontSize="sm">Emergency</Text>
                      <Text fontSize="sm" color="gray.600">
                        {hospitalData.hospitalInfo.timings.emergency}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
                <Box>
                  <Heading size="md" mb={4}>Top Specialists</Heading>
                  <VStack spacing={3} align="stretch">
                    {hospitalData.doctors.slice(5, 8).map((doctor) => (
                      <HStack key={doctor.id} spacing={3} p={3} bg="gray.50" borderRadius="lg">
                        <Avatar size="sm" name={doctor.name} src={doctor.profileImage} />
                        <Box flex="1">
                          <Text fontWeight="medium" fontSize="sm">{doctor.name}</Text>
                          <Text fontSize="xs" color="gray.600">{doctor.specialization}</Text>
                        </Box>
                        <Badge colorScheme="green" fontSize="xs">
                          {doctor.rating} ★
                        </Badge>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              </Grid>
            </TabPanel>
            
            <TabPanel>
              <Wrap spacing={3}>
                {hospitalData.hospitalInfo.facilities.map((facility, idx) => (
                  <Tag
                    key={idx}
                    size="lg"
                    colorScheme="blue"
                    variant="subtle"
                    borderRadius="full"
                    px={4}
                    py={2}
                  >
                    {facility}
                  </Tag>
                ))}
              </Wrap>
            </TabPanel>
            
            <TabPanel>
              <VStack spacing={4} align="stretch">
                {hospitalData.hospitalInfo.accreditations.map((accreditation, idx) => (
                  <HStack key={idx} spacing={3} p={3} bg="green.50" borderRadius="lg">
                    <Icon as={FiCheckCircle} color="green.500" boxSize={5} />
                    <Text fontWeight="medium">{accreditation}</Text>
                  </HStack>
                ))}
              </VStack>
            </TabPanel>
            
            <TabPanel>
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
                <VStack align="start" spacing={4}>
                  <HStack>
                    <Icon as={FiMapPin} color="blue.500" />
                    <Box>
                      <Text fontWeight="medium">Address</Text>
                      <Text fontSize="sm" color="gray.600">
                        {hospitalData.hospitalInfo.address.street}, {hospitalData.hospitalInfo.address.area}<br />
                        {hospitalData.hospitalInfo.address.city}, {hospitalData.hospitalInfo.address.state} - {hospitalData.hospitalInfo.address.pincode}
                      </Text>
                    </Box>
                  </HStack>
                  <HStack>
                    <Icon as={FiPhone} color="blue.500" />
                    <Box>
                      <Text fontWeight="medium">Phone</Text>
                      <Text fontSize="sm" color="gray.600">
                        {hospitalData.hospitalInfo.contact.phone}<br />
                        <strong>Emergency:</strong> {hospitalData.hospitalInfo.contact.emergency}
                      </Text>
                    </Box>
                  </HStack>
                </VStack>
                <VStack align="start" spacing={4}>
                  <HStack>
                    <Icon as={FiMail} color="blue.500" />
                    <Box>
                      <Text fontWeight="medium">Email</Text>
                      <Text fontSize="sm" color="gray.600">
                        {hospitalData.hospitalInfo.contact.email}
                      </Text>
                    </Box>
                  </HStack>
                  <HStack>
                    <Icon as={FiGlobe} color="blue.500" />
                    <Box>
                      <Text fontWeight="medium">Website</Text>
                      <Text fontSize="sm" color="gray.600">
                        {hospitalData.hospitalInfo.contact.website}
                      </Text>
                    </Box>
                  </HStack>
                </VStack>
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* CTA Section */}
        <Card bgGradient="linear(to-r, blue.500, purple.600)" color="white" shadow="2xl" mb={8}>
          <CardBody>
            <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={8} alignItems="center">
              <Box>
                <Heading size="lg" mb={2}>Need Medical Assistance?</Heading>
                <Text fontSize="lg" opacity={0.9}>
                  Book an appointment with our specialists or visit our 24/7 emergency department.
                </Text>
              </Box>
              <VStack spacing={3}>
                <Button
                  colorScheme="white"
                  variant="solid"
                  size="lg"
                  w="full"
                  rightIcon={<FiCalendar />}
                  onClick={() => toast({
                    title: "Booking Appointment",
                    description: "Redirecting to appointment booking...",
                    status: "success",
                  })}
                >
                  Book Now
                </Button>
                <Button
                  colorScheme="white"
                  variant="outline"
                  size="lg"
                  w="full"
                  rightIcon={<FiPhone />}
                >
                  Call Emergency
                </Button>
              </VStack>
            </Grid>
          </CardBody>
        </Card>
      </Container>
      
      <ServiceModal />
    </Box>
  );
};

export default Services;