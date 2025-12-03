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
  Tag,
  TagLabel,
  Grid,
  Icon,
} from '@chakra-ui/react';
import {
  FiSearch,
  FiFilter,
  FiEye,
  FiEdit2,
  FiMessageSquare,
  FiPlus,
  FiUser,
  FiCalendar,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const DoctorPatients = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const patients = [
    {
      id: 1,
      name: 'Pavan Ponnella',
      age: 45,
      gender: 'Male',
      bloodType: 'O+',
      lastVisit: 'Jan 10, 2024',
      nextAppointment: 'Jan 20, 2024',
      status: 'active',
      condition: 'Hypertension',
    },
    {
      id: 2,
      name: 'Emma Wilson',
      age: 32,
      gender: 'Female',
      bloodType: 'A+',
      lastVisit: 'Jan 8, 2024',
      nextAppointment: 'Feb 1, 2024',
      status: 'active',
      condition: 'Diabetes Type 2',
    },
    {
      id: 3,
      name: 'Robert Brown',
      age: 58,
      gender: 'Male',
      bloodType: 'B+',
      lastVisit: 'Jan 5, 2024',
      nextAppointment: null,
      status: 'inactive',
      condition: 'Arthritis',
    },
    {
      id: 4,
      name: 'Lisa Taylor',
      age: 29,
      gender: 'Female',
      bloodType: 'AB+',
      lastVisit: 'Jan 3, 2024',
      nextAppointment: 'Jan 17, 2024',
      status: 'active',
      condition: 'Migraine',
    },
    {
      id: 5,
      name: 'Michael Chen',
      age: 65,
      gender: 'Male',
      bloodType: 'O-',
      lastVisit: 'Dec 28, 2023',
      nextAppointment: 'Jan 15, 2024',
      status: 'critical',
      condition: 'Heart Disease',
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: 'green',
      inactive: 'gray',
      critical: 'red',
    };
    return colors[status] || 'gray';
  };

  const getConditionColor = (condition) => {
    if (condition.includes('Heart') || condition.includes('critical')) return 'red';
    if (condition.includes('Diabetes')) return 'orange';
    if (condition.includes('Hypertension')) return 'blue';
    return 'gray';
  };

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">My Patients</Heading>
        <HStack spacing={3}>
          <Button leftIcon={<FiPlus />} colorScheme="brand">
            Add New Patient
          </Button>
        </HStack>
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
                placeholder="Search patients by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              width="200px"
            >
              <option value="all">All Patients</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="critical">Critical</option>
            </Select>
            
            <Select width="200px" defaultValue="all">
              <option value="all">All Conditions</option>
              <option value="hypertension">Hypertension</option>
              <option value="diabetes">Diabetes</option>
              <option value="heart">Heart Disease</option>
            </Select>
          </HStack>
        </CardBody>
      </Card>

      {/* Stats */}
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' }} gap={4} mb={6}>
        {[
          { label: 'Total Patients', value: '156', color: 'blue' },
          { label: 'Active Patients', value: '48', color: 'green' },
          { label: 'Critical Cases', value: '3', color: 'red' },
          { label: 'Avg. Visits/Month', value: '2.4', color: 'purple' },
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

      {/* Patients Table */}
      <Card>
        <CardBody>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Patient</Th>
                <Th>Age/Gender</Th>
                <Th>Blood Type</Th>
                <Th>Condition</Th>
                <Th>Last Visit</Th>
                <Th>Next Appointment</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredPatients.map((patient) => (
                <Tr key={patient.id}>
                  <Td>
                    <Flex align="center">
                      <Avatar
                        size="sm"
                        name={patient.name}
                        src={`https://ui-avatars.com/api/?name=${patient.name}&background=3182CE&color=fff`}
                        mr={3}
                      />
                      <Text fontWeight="medium">{patient.name}</Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Text fontSize="sm">
                      {patient.age} yrs • {patient.gender}
                    </Text>
                  </Td>
                  <Td>
                    <Badge variant="subtle" colorScheme="red">
                      {patient.bloodType}
                    </Badge>
                  </Td>
                  <Td>
                    <Tag size="sm" colorScheme={getConditionColor(patient.condition)}>
                      <TagLabel>{patient.condition}</TagLabel>
                    </Tag>
                  </Td>
                  <Td>
                    <Flex align="center">
                      <Icon as={FiCalendar} mr={2} color="gray.400" />
                      {patient.lastVisit}
                    </Flex>
                  </Td>
                  <Td>
                    {patient.nextAppointment ? (
                      <Badge colorScheme="green" variant="subtle">
                        {patient.nextAppointment}
                      </Badge>
                    ) : (
                      <Text fontSize="sm" color="gray.500">Not scheduled</Text>
                    )}
                  </Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(patient.status)}>
                      {patient.status}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <Link to={`/doctor/emr/${patient.id}`}>
                        <IconButton
                          icon={<FiEye />}
                          size="sm"
                          variant="ghost"
                          aria-label="View EMR"
                        />
                      </Link>
                      <IconButton
                        icon={<FiEdit2 />}
                        size="sm"
                        variant="ghost"
                        aria-label="Edit"
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

export default DoctorPatients;