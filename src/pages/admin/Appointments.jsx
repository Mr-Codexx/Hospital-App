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
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  HStack,
  Text,
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import {
  FiSearch,
  FiFilter,
  FiCalendar,
  FiUser,
  FiCheck,
  FiX,
  FiEdit2,
  FiClock,
} from 'react-icons/fi';

const AdminAppointments = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState('day');

  const appointments = [
    {
      id: 1,
      patient: 'Pavan Ponnella',
      doctor: 'Dr. Suman Dixit',
      date: 'Jan 15, 2024',
      time: '10:30 AM',
      department: 'Cardiology',
      type: 'Consultation',
      status: 'confirmed',
      symptoms: 'Chest pain, shortness of breath',
    },
    {
      id: 2,
      patient: 'Emma Wilson',
      doctor: 'Dr. Syed',
      date: 'Jan 15, 2024',
      time: '02:00 PM',
      department: 'Neurology',
      type: 'Follow-up',
      status: 'pending',
      symptoms: 'Headaches, dizziness',
    },
    {
      id: 3,
      patient: 'Robert Brown',
      doctor: 'Dr. Ashok',
      date: 'Jan 16, 2024',
      time: '11:15 AM',
      department: 'Orthopedics',
      type: 'Consultation',
      status: 'confirmed',
      symptoms: 'Knee pain after injury',
    },
    {
      id: 4,
      patient: 'Lisa Taylor',
      doctor: 'Dr. Surbhi Agnihotri',
      date: 'Jan 16, 2024',
      time: '03:45 PM',
      department: 'Dermatology',
      type: 'Follow-up',
      status: 'cancelled',
      symptoms: 'Skin rash',
    },
    {
      id: 5,
      patient: 'Michael Chen',
      doctor: 'Dr. Suman Dixit',
      date: 'Jan 17, 2024',
      time: '09:00 AM',
      department: 'Cardiology',
      type: 'Emergency',
      status: 'urgent',
      symptoms: 'Severe chest pain',
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'green',
      pending: 'yellow',
      urgent: 'red',
      cancelled: 'gray',
      completed: 'blue',
    };
    return colors[status] || 'gray';
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch = apt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.doctor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (appointmentId) => {
    // Handle approve logic
    console.log('Approve:', appointmentId);
  };

  const handleReject = (appointmentId) => {
    // Handle reject logic
    console.log('Reject:', appointmentId);
  };

  const handleReschedule = (appointmentId) => {
    // Handle reschedule logic
    console.log('Reschedule:', appointmentId);
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Appointments Management</Heading>
        <HStack spacing={3}>
          <Button leftIcon={<FiCalendar />} colorScheme="brand">
            Create Appointment
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
                placeholder="Search by patient or doctor name..."
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
              <option value="urgent">Urgent</option>
              <option value="cancelled">Cancelled</option>
            </Select>
            
            <Select
              value={viewType}
              onChange={(e) => setViewType(e.target.value)}
              width="200px"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </Select>
          </HStack>
        </CardBody>
      </Card>

      {/* Stats */}
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' }} gap={4} mb={6}>
        {[
          { label: "Today's Appointments", value: '12', color: 'blue' },
          { label: 'Pending Approval', value: '3', color: 'yellow' },
          { label: 'Confirmed', value: '8', color: 'green' },
          { label: 'Cancelled', value: '1', color: 'red' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardBody>
              <Flex align="center" justify="space-between">
                <Box>
                  <Text fontSize="sm" color="gray.600">{stat.label}</Text>
                  <Text fontSize="2xl" fontWeight="bold">{stat.value}</Text>
                </Box>
                <Icon as={FiCalendar} w={8} h={8} color={`${stat.color}.500`} />
              </Flex>
            </CardBody>
          </Card>
        ))}
      </Grid>

      {/* Tabs */}
      <Tabs colorScheme="brand" mb={6}>
        <TabList>
          <Tab>All Appointments</Tab>
          <Tab>Pending Approval</Tab>
          <Tab>Urgent Cases</Tab>
        </TabList>

        <TabPanels>
          {/* All Appointments */}
          <TabPanel p={0} pt={4}>
            <Card>
              <CardBody>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Patient</Th>
                      <Th>Doctor</Th>
                      <Th>Date & Time</Th>
                      <Th>Department</Th>
                      <Th>Type</Th>
                      <Th>Status</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredAppointments.map((apt) => (
                      <Tr key={apt.id}>
                        <Td>
                          <Flex align="center">
                            <Avatar
                              size="xs"
                              name={apt.patient}
                              mr={2}
                            />
                            <Text fontWeight="medium">{apt.patient}</Text>
                          </Flex>
                        </Td>
                        <Td>
                          <Flex align="center">
                            <Avatar
                              size="xs"
                              name={apt.doctor}
                              mr={2}
                            />
                            <Text fontSize="sm">{apt.doctor}</Text>
                          </Flex>
                        </Td>
                        <Td>
                          <Text>{apt.date}</Text>
                          <Text fontSize="sm" color="gray.600">
                            <FiClock style={{ display: 'inline', marginRight: '4px' }} />
                            {apt.time}
                          </Text>
                        </Td>
                        <Td>
                          <Badge variant="subtle">{apt.department}</Badge>
                        </Td>
                        <Td>
                          <Badge variant="subtle" colorScheme={apt.type === 'Emergency' ? 'red' : 'blue'}>
                            {apt.type}
                          </Badge>
                        </Td>
                        <Td>
                          <Badge colorScheme={getStatusColor(apt.status)}>
                            {apt.status}
                          </Badge>
                        </Td>
                        <Td>
                          <HStack spacing={2}>
                            {apt.status === 'pending' && (
                              <>
                                <IconButton
                                  icon={<FiCheck />}
                                  size="sm"
                                  colorScheme="green"
                                  variant="ghost"
                                  onClick={() => handleApprove(apt.id)}
                                />
                                <IconButton
                                  icon={<FiX />}
                                  size="sm"
                                  colorScheme="red"
                                  variant="ghost"
                                  onClick={() => handleReject(apt.id)}
                                />
                              </>
                            )}
                            <IconButton
                              icon={<FiEdit2 />}
                              size="sm"
                              variant="ghost"
                              onClick={() => handleReschedule(apt.id)}
                            />
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </TabPanel>

          {/* Pending Approval */}
          <TabPanel p={0} pt={4}>
            <Card>
              <CardBody>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Patient</Th>
                      <Th>Doctor</Th>
                      <Th>Date & Time</Th>
                      <Th>Symptoms</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {appointments
                      .filter(apt => apt.status === 'pending')
                      .map((apt) => (
                        <Tr key={apt.id}>
                          <Td>
                            <Flex align="center">
                              <Avatar size="xs" name={apt.patient} mr={2} />
                              {apt.patient}
                            </Flex>
                          </Td>
                          <Td>{apt.doctor}</Td>
                          <Td>
                            <Text>{apt.date}</Text>
                            <Text fontSize="sm" color="gray.600">{apt.time}</Text>
                          </Td>
                          <Td>
                            <Text fontSize="sm">{apt.symptoms}</Text>
                          </Td>
                          <Td>
                            <HStack spacing={2}>
                              <Button
                                size="xs"
                                leftIcon={<FiCheck />}
                                colorScheme="green"
                                onClick={() => handleApprove(apt.id)}
                              >
                                Approve
                              </Button>
                              <Button
                                size="xs"
                                leftIcon={<FiX />}
                                variant="outline"
                                onClick={() => handleReject(apt.id)}
                              >
                                Reject
                              </Button>
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </TabPanel>

          {/* Urgent Cases */}
          <TabPanel p={0} pt={4}>
            <Card>
              <CardBody>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Patient</Th>
                      <Th>Doctor</Th>
                      <Th>Date & Time</Th>
                      <Th>Symptoms</Th>
                      <Th>Priority</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {appointments
                      .filter(apt => apt.status === 'urgent')
                      .map((apt) => (
                        <Tr key={apt.id}>
                          <Td>
                            <Flex align="center">
                              <Avatar size="xs" name={apt.patient} mr={2} />
                              {apt.patient}
                            </Flex>
                          </Td>
                          <Td>{apt.doctor}</Td>
                          <Td>
                            <Text>{apt.date}</Text>
                            <Text fontSize="sm" color="gray.600">{apt.time}</Text>
                          </Td>
                          <Td>
                            <Text fontSize="sm">{apt.symptoms}</Text>
                          </Td>
                          <Td>
                            <Badge colorScheme="red">High Priority</Badge>
                          </Td>
                          <Td>
                            <Button size="xs" colorScheme="red">
                              Assign Emergency
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AdminAppointments;