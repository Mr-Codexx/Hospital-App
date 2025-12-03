import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Card,
  CardBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  HStack,
  Text,
  VStack,
  Divider,
  Avatar,
  Button,
  Icon,
} from '@chakra-ui/react';
import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiEye,
  FiCalendar,
  FiUser,
} from 'react-icons/fi';
import { CiPill } from "react-icons/ci";

const PatientPrescriptions = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const prescriptions = [
    {
      id: 1,
      doctor: 'Dr. Suman Dixit',
      date: 'Jan 10, 2024',
      medications: [
        { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily' },
        { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
      ],
      status: 'active',
      refills: 2,
      notes: 'Take with food. Avoid alcohol.',
    },
    {
      id: 2,
      doctor: 'Dr. Syed',
      date: 'Jan 5, 2024',
      medications: [
        { name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily' },
      ],
      status: 'completed',
      refills: 0,
      notes: 'Complete full course. Report any allergic reactions.',
    },
    {
      id: 3,
      doctor: 'Dr. Ashok',
      date: 'Dec 20, 2023',
      medications: [
        { name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed' },
        { name: 'Omeprazole', dosage: '20mg', frequency: 'Once daily' },
      ],
      status: 'active',
      refills: 1,
      notes: 'Take Omeprazole before breakfast.',
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: 'green',
      completed: 'blue',
      expired: 'red',
    };
    return colors[status] || 'gray';
  };

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const matchesSearch = prescription.doctor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || prescription.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">My Prescriptions</Heading>
        <Button leftIcon={<FiDownload />} colorScheme="brand">
          Export All
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
                placeholder="Search by doctor name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              width="200px"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="expired">Expired</option>
            </Select>
          </HStack>
        </CardBody>
      </Card>

      {/* Prescriptions List */}
      <VStack spacing={6} align="stretch">
        {filteredPrescriptions.map((prescription) => (
          <Card key={prescription.id} shadow="sm">
            <CardBody>
              <Flex justify="space-between" align="start" mb={4}>
                <HStack spacing={4}>
                  <Avatar
                    size="sm"
                    name={prescription.doctor}
                    src={`https://ui-avatars.com/api/?name=${prescription.doctor}&background=3182CE&color=fff`}
                  />
                  <Box>
                    <Text fontWeight="bold">{prescription.doctor}</Text>
                    <Text fontSize="sm" color="gray.600">
                      <FiCalendar style={{ display: 'inline', marginRight: '4px' }} />
                      {prescription.date}
                    </Text>
                  </Box>
                </HStack>
                <Badge colorScheme={getStatusColor(prescription.status)}>
                  {prescription.status.toUpperCase()}
                </Badge>
              </Flex>

              <Divider mb={4} />

              {/* Medications List */}
              <VStack spacing={3} align="stretch" mb={4}>
                {prescription.medications.map((med, index) => (
                  <Flex
                    key={index}
                    p={3}
                    bg="gray.50"
                    borderRadius="md"
                    justify="space-between"
                    align="center"
                  >
                    <HStack>
                      <Icon as={CiPill} color="blue.500" />
                      <Box>
                        <Text fontWeight="medium">{med.name}</Text>
                        <Text fontSize="sm" color="gray.600">
                          {med.dosage} • {med.frequency}
                        </Text>
                      </Box>
                    </HStack>
                    {prescription.status === 'active' && prescription.refills > 0 && (
                      <Badge colorScheme="blue" variant="subtle">
                        {prescription.refills} refill(s) left
                      </Badge>
                    )}
                  </Flex>
                ))}
              </VStack>

              {/* Notes and Actions */}
              <Flex justify="space-between" align="center">
                <Box>
                  {prescription.notes && (
                    <Text fontSize="sm" color="gray.600" fontStyle="italic">
                      Note: {prescription.notes}
                    </Text>
                  )}
                </Box>
                <HStack spacing={2}>
                  <Button size="sm" leftIcon={<FiEye />} variant="outline">
                    View Details
                  </Button>
                  {prescription.status === 'active' && (
                    <Button size="sm" colorScheme="brand">
                      Request Refill
                    </Button>
                  )}
                </HStack>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </VStack>
    </Box>
  );
};

export default PatientPrescriptions;