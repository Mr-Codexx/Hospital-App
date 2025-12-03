import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  Card,
  CardBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  HStack,
  Text,
  Grid,
  GridItem,
  Progress,
  VStack,
  Icon,
} from '@chakra-ui/react';
import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiEdit2,
  FiCalendar,
  FiUser,
  FiStar,
  FiMessageSquare,
  FiPhone,
  FiMail,
} from 'react-icons/fi';

const AdminDoctors = () => {
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const doctors = [
    {
      id: 'DOC001',
      name: 'Dr. Suman Dixit',
      department: 'Cardiology',
      specialization: 'Cardiologist',
      experience: '12 years',
      email: 'suman@hospital.com',
      phone: '+911234567891',
      status: 'active',
      rating: 4.8,
      patients: 156,
      availability: 'Mon-Fri, 9AM-5PM',
    },
    {
      id: 'DOC002',
      name: 'Dr. Syed',
      department: 'Neurology',
      specialization: 'Neurologist',
      experience: '8 years',
      email: 'drsyed@hospital.com',
      phone: '+911234567892',
      status: 'active',
      rating: 4.6,
      patients: 128,
      availability: 'Mon-Sat, 10AM-6PM',
    },
    {
      id: 'DOC003',
      name: 'Dr. Ashok',
      department: 'Orthopedics',
      specialization: 'Orthopedic Surgeon',
      experience: '15 years',
      email: 'ashok@hospital.com',
      phone: '+911234567893',
      status: 'active',
      rating: 4.9,
      patients: 210,
      availability: 'Tue-Thu, 8AM-4PM',
    },
    {
      id: 'DOC004',
      name: 'Dr. Surbhi Agnihotri',
      department: 'Dermatology',
      specialization: 'Dermatologist',
      experience: '6 years',
      email: 'surbhi@hospital.com',
      phone: '+911234567894',
      status: 'on-leave',
      rating: 4.7,
      patients: 95,
      availability: 'Mon-Wed-Fri, 11AM-7PM',
    },
    {
      id: 'DOC005',
      name: 'Dr. Ashish Gupta',
      department: 'Pediatrics',
      specialization: 'Pediatrician',
      experience: '10 years',
      email: 'ashish.gupta@hospital.com',
      phone: '+911234567895',
      status: 'active',
      rating: 4.5,
      patients: 180,
      availability: 'Mon-Sat, 9AM-5PM',
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: 'green',
      'on-leave': 'yellow',
      inactive: 'gray',
    };
    return colors[status] || 'gray';
  };

  const getDepartmentColor = (department) => {
    const colors = {
      Cardiology: 'red',
      Neurology: 'blue',
      Orthopedics: 'orange',
      Dermatology: 'purple',
      Pediatrics: 'green',
    };
    return colors[department] || 'gray';
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = departmentFilter === 'all' || doctor.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || doctor.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Doctors Management</Heading>
        <Button leftIcon={<FiPlus />} colorScheme="brand">
          Add New Doctor
        </Button>
      </Flex>

      {/* Filters */}
      <Card mb={6}>
        <CardBody>
          <HStack spacing={4}>
            <InputGroup flex="1">
              <InputLeftElement pointerEvents="none">
                <FiSearch color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search by name or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            
            <Select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              width="200px"
            >
              <option value="all">All Departments</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Pediatrics">Pediatrics</option>
            </Select>
            
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              width="200px"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="on-leave">On Leave</option>
              <option value="inactive">Inactive</option>
            </Select>
          </HStack>
        </CardBody>
      </Card>

      {/* Stats */}
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' }} gap={4} mb={6}>
        {[
          { label: 'Total Doctors', value: '24', color: 'blue' },
          { label: 'Active Doctors', value: '22', color: 'green' },
          { label: 'Average Rating', value: '4.7/5', color: 'yellow' },
          { label: 'Avg. Patients/Doctor', value: '154', color: 'purple' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardBody>
              <Flex align="center" justify="space-between">
                <Box>
                  <Text fontSize="sm" color="gray.600">{stat.label}</Text>
                  <Text fontSize="2xl" fontWeight="bold">{stat.value}</Text>
                </Box>
                <Icon as={FiUser} w={8} h={8} color={`${stat.color}.500`} />
              </Flex>
            </CardBody>
          </Card>
        ))}
      </Grid>

      {/* Doctors Table */}
      <Card>
        <CardBody>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Doctor</Th>
                <Th>Specialization</Th>
                <Th>Contact</Th>
                <Th>Patients</Th>
                <Th>Rating</Th>
                <Th>Availability</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredDoctors.map((doctor) => (
                <Tr key={doctor.id}>
                  <Td>
                    <Flex align="center">
                      <Avatar
                        size="sm"
                        name={doctor.name}
                        src={`https://ui-avatars.com/api/?name=${doctor.name}&background=3182CE&color=fff`}
                        mr={3}
                      />
                      <Box>
                        <Text fontWeight="medium">{doctor.name}</Text>
                        <Text fontSize="xs" color="gray.500">
                          {doctor.department} • {doctor.experience}
                        </Text>
                      </Box>
                    </Flex>
                  </Td>
                  <Td>
                    <Badge colorScheme={getDepartmentColor(doctor.department)}>
                      {doctor.specialization}
                    </Badge>
                  </Td>
                  <Td>
                    <VStack align="start" spacing={1}>
                      <HStack spacing={1}>
                        <Icon as={FiMail} color="gray.400" boxSize={3} />
                        <Text fontSize="xs">{doctor.email}</Text>
                      </HStack>
                      <HStack spacing={1}>
                        <Icon as={FiPhone} color="gray.400" boxSize={3} />
                        <Text fontSize="xs">{doctor.phone}</Text>
                      </HStack>
                    </VStack>
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight="medium">{doctor.patients}</Text>
                      <Progress value={75} size="xs" colorScheme="blue" />
                    </Box>
                  </Td>
                  <Td>
                    <Flex align="center">
                      <Icon as={FiStar} color="yellow.500" mr={1} />
                      <Text fontWeight="medium">{doctor.rating}</Text>
                      <Text fontSize="xs" color="gray.500" ml={1}>
                        /5
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{doctor.availability}</Text>
                  </Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(doctor.status)}>
                      {doctor.status}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <IconButton
                        icon={<FiEdit2 />}
                        size="sm"
                        variant="ghost"
                        aria-label="Edit"
                      />
                      <IconButton
                        icon={<FiCalendar />}
                        size="sm"
                        variant="ghost"
                        aria-label="Schedule"
                      />
                      <IconButton
                        icon={<FiMessageSquare />}
                        size="sm"
                        variant="ghost"
                        aria-label="Message"
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Box>
  );
};

export default AdminDoctors;