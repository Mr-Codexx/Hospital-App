// pages/DoctorsListingPage.js
import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  CardFooter,
  Button,
  VStack,
  HStack,
  Badge,
  Icon,
  useColorModeValue,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { FiSearch, FiUser, FiCalendar, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { MdLocalHospital, MdAccessTime, MdVerifiedUser } from 'react-icons/md';
import { Link as RouterLink } from 'react-router-dom';
import { useHospitalDataContext } from '../context/HospitalDataContext';

const DoctorsListingPage = () => {
  const { getDepartments, loading } = useHospitalDataContext();
  const [departments, setDepartments] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedFilter, setSelectedFilter] = React.useState('all');

  React.useEffect(() => {
    const depts = getDepartments();
    setDepartments(depts || []);
  }, [getDepartments]);

  const filteredDepartments = departments.filter(dept => 
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container maxW="container.xl" py={10}>
      {/* Hero Section */}
      <VStack spacing={6} mb={10} textAlign="center">
        <Heading size="2xl" bgGradient="linear(to-r, blue.500, teal.400)" bgClip="text">
          Our Medical Departments
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="2xl">
          Choose from our specialized departments staffed with experienced doctors and equipped with advanced medical technology.
        </Text>
      </VStack>

      {/* Search and Filter */}
      <Card mb={8}>
        <CardBody>
          <Grid templateColumns={{ base: '1fr', md: '1fr 300px' }} gap={6}>
            <GridItem>
              <InputGroup>
                <InputLeftElement>
                  <FiSearch color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search departments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
            </GridItem>
            <GridItem>
              <Select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Departments</option>
                <option value="busy">High Occupancy</option>
                <option value="available">More Available</option>
              </Select>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>

      {/* Departments Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {filteredDepartments.map((dept) => (
          <Card
            key={dept.id}
            _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
            transition="all 0.3s"
          >
            <CardBody>
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <Badge colorScheme="blue">{dept.name}</Badge>
                  <Badge colorScheme={dept.occupiedBeds > dept.totalBeds * 0.8 ? 'red' : 'green'}>
                    {Math.round((dept.occupiedBeds / dept.totalBeds) * 100)}% Occupied
                  </Badge>
                </HStack>
                
                <Text noOfLines={3}>{dept.description}</Text>
                
                <VStack spacing={2} align="start">
                  <HStack>
                    <MdAccessTime color="gray.500" />
                    <Text fontSize="sm">Floor: {dept.floor}</Text>
                  </HStack>
                  <HStack>
                    <FiMapPin color="gray.500" />
                    <Text fontSize="sm">Extension: {dept.extension}</Text>
                  </HStack>
                </VStack>
              </VStack>
            </CardBody>
            
            <CardFooter>
              <Button
                as={RouterLink}
                to={`/doctors/${dept.name.toLowerCase().replace(/\s+/g, '-')}`}
                colorScheme="blue"
                w="100%"
                rightIcon={<FiUser />}
              >
                View Doctors
              </Button>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>

      {/* Call to Action */}
      <Card mt={10} bgGradient="linear(to-r, blue.50, teal.50)" textAlign="center">
        <CardBody py={10}>
          <VStack spacing={4}>
            <Heading size="lg">Can't Find Your Department?</Heading>
            <Text fontSize="lg" color="gray.600">
              Contact our reception for assistance or book a general consultation.
            </Text>
            <HStack spacing={4}>
              <Button
                colorScheme="blue"
                leftIcon={<FiPhone />}
                onClick={() => window.location.href = 'tel:+911123456789'}
              >
                Call Now
              </Button>
              <Button
                as={RouterLink}
                to="/appointment"
                variant="outline"
                leftIcon={<FiCalendar />}
              >
                Book Appointment
              </Button>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
};

export default DoctorsListingPage;