import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  SimpleGrid,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Avatar,
  Badge,
  HStack,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Icon,
  Button,
  Wrap,
  Tag,
} from "@chakra-ui/react";
import { FiSearch, FiFilter, FiStar, FiUsers } from "react-icons/fi";
import hospitalData from "../data/HospitalData.json";

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("all");
  const navigate = useNavigate();

  const doctors = hospitalData.doctors;

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = specializationFilter === "all" || 
                                 doctor.specialization === specializationFilter;
    return matchesSearch && matchesSpecialization;
  });

  const specializations = [...new Set(doctors.map(d => d.specialization))];

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center">Our Medical Specialists</Heading>
        
        {/* Search and Filter */}
        <HStack spacing={4}>
          <InputGroup flex="1">
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search doctors by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Select
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
            w="200px"
          >
            <option value="all">All Specializations</option>
            {specializations.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </Select>
        </HStack>

        {/* Doctors Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredDoctors.map(doctor => (
            <Card
              key={doctor.id}
              cursor="pointer"
              _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
              transition="all 0.3s"
              onClick={() => navigate(`/doctor/${doctor.id}`)}
            >
              <CardBody>
                <VStack spacing={4} align="center">
                  <Avatar size="xl" name={doctor.name} src={doctor.profileImage} />
                  <VStack spacing={2}>
                    <Heading size="md">{doctor.name}</Heading>
                    <Badge colorScheme="blue">{doctor.specialization}</Badge>
                    <Text color="gray.600" textAlign="center">
                      {doctor.department}
                    </Text>
                  </VStack>
                  
                  <Wrap justify="center" spacing={2}>
                    <Tag colorScheme="yellow">
                      <Icon as={FiStar} mr={1} />
                      {doctor.rating}
                    </Tag>
                    <Tag colorScheme="green">
                      <Icon as={FiUsers} mr={1} />
                      {doctor.totalPatients}
                    </Tag>
                    <Tag colorScheme="purple">
                      {doctor.experience}
                    </Tag>
                  </Wrap>
                </VStack>
              </CardBody>
              <CardFooter>
                <Button w="full" colorScheme="blue" variant="outline">
                  View Profile
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default DoctorsPage;