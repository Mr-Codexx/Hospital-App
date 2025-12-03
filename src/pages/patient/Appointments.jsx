import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Text,
  Card,
  CardBody,
} from '@chakra-ui/react';
import {
  FiPlus,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiCalendar,
  FiSearch,
  FiFilter,
} from 'react-icons/fi';
import { useNotification } from '../../context/NotificationContext';

const PatientAppointments = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { confirmDialog } = useNotification();
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Suman Dixit',
      department: 'Cardiology',
      date: 'Jan 15, 2024',
      time: '10:30 AM',
      status: 'confirmed',
      symptoms: 'Chest pain, shortness of breath',
    },
    {
      id: 2,
      doctor: 'Dr. Syed',
      department: 'Neurology',
      date: 'Jan 10, 2024',
      time: '2:00 PM',
      status: 'completed',
      symptoms: 'Headaches, dizziness',
    },
    {
      id: 3,
      doctor: 'Dr. Ashok',
      department: 'Orthopedics',
      date: 'Jan 20, 2024',
      time: '11:15 AM',
      status: 'pending',
      symptoms: 'Knee pain after injury',
    },
    {
      id: 4,
      doctor: 'Dr. Surbhi Agnihotri',
      department: 'Dermatology',
      date: 'Jan 5, 2024',
      time: '3:45 PM',
      status: 'cancelled',
      symptoms: 'Skin rash',
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'green',
      pending: 'yellow',
      completed: 'blue',
      cancelled: 'red',
    };
    return colors[status] || 'gray';
  };

  const handleCancel = async (id) => {
    const confirmed = await confirmDialog(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment?',
      'Yes, Cancel'
    );
    if (confirmed) {
      // Handle cancel logic
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch = apt.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">My Appointments</Heading>
        <Button leftIcon={<FiPlus />} colorScheme="brand" onClick={onOpen}>
          Book Appointment
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
                placeholder="Search by doctor or department..."
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
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </Select>
            
            <Button leftIcon={<FiFilter />} variant="outline">
              More Filters
            </Button>
          </HStack>
        </CardBody>
      </Card>

      {/* Appointments Table */}
      <Card>
        <CardBody>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Doctor</Th>
                <Th>Department</Th>
                <Th>Date & Time</Th>
                <Th>Symptoms</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredAppointments.map((apt) => (
                <Tr key={apt.id}>
                  <Td>
                    <Text fontWeight="medium">{apt.doctor}</Text>
                    <Text fontSize="sm" color="gray.600">{apt.department}</Text>
                  </Td>
                  <Td>
                    <Text>{apt.date}</Text>
                    <Text fontSize="sm" color="gray.600">{apt.time}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{apt.symptoms}</Text>
                  </Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(apt.status)}>
                      {apt.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<FiMoreVertical />}
                        variant="ghost"
                        size="sm"
                      />
                      <MenuList>
                        <MenuItem icon={<FiCalendar />}>
                          Reschedule
                        </MenuItem>
                        <MenuItem icon={<FiEdit2 />}>
                          Update Symptoms
                        </MenuItem>
                        {apt.status === 'confirmed' && (
                          <MenuItem 
                            icon={<FiTrash2 />} 
                            color="red.500"
                            onClick={() => handleCancel(apt.id)}
                          >
                            Cancel Appointment
                          </MenuItem>
                        )}
                      </MenuList>
                    </Menu>
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

export default PatientAppointments;