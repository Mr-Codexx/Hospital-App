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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  GridItem,
  Icon,
} from '@chakra-ui/react';
import {
  FiSearch,
  FiCalendar,
  FiCheck,
  FiX,
  FiClock,
  FiUser,
  FiFilter,
  FiVideo,
  FiMoreVertical
} from 'react-icons/fi';

const DoctorAppointments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const todayAppointments = [
    {
      id: 1,
      patient: 'Pavan Ponnella',
      time: '09:00 AM',
      type: 'Follow-up',
      symptoms: 'Hypertension follow-up',
      status: 'confirmed',
      duration: '30 mins',
    },
    {
      id: 2,
      patient: 'Emma Wilson',
      time: '09:30 AM',
      type: 'New',
      symptoms: 'Diabetes consultation',
      status: 'confirmed',
      duration: '45 mins',
    },
    {
      id: 3,
      patient: 'Robert Brown',
      time: '10:15 AM',
      type: 'Consultation',
      symptoms: 'Arthritis pain management',
      status: 'pending',
      duration: '30 mins',
    },
    {
      id: 4,
      patient: 'Lisa Taylor',
      time: '11:00 AM',
      type: 'Follow-up',
      symptoms: 'Migraine treatment review',
      status: 'confirmed',
      duration: '30 mins',
    },
    {
      id: 5,
      patient: 'Michael Chen',
      time: '11:45 AM',
      type: 'Emergency',
      symptoms: 'Chest pain evaluation',
      status: 'urgent',
      duration: '60 mins',
    },
  ];

  const upcomingAppointments = [
    {
      id: 6,
      patient: 'Sarah Johnson',
      date: 'Jan 15, 2024',
      time: '02:00 PM',
      type: 'Follow-up',
      symptoms: 'Post-surgery check',
      status: 'confirmed',
    },
    {
      id: 7,
      patient: 'David Miller',
      date: 'Jan 16, 2024',
      time: '10:30 AM',
      type: 'New',
      symptoms: 'Annual health check',
      status: 'pending',
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'green',
      pending: 'yellow',
      urgent: 'red',
      cancelled: 'gray',
    };
    return colors[status] || 'gray';
  };

  const handleApprove = (appointmentId) => {
    // Handle approve logic
    console.log('Approve:', appointmentId);
  };

  const handleReject = (appointmentId) => {
    // Handle reject logic
    console.log('Reject:', appointmentId);
  };

  const handleStartConsultation = (appointmentId) => {
    // Handle start consultation logic
    console.log('Start consultation:', appointmentId);
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Appointments</Heading>
        <HStack spacing={3}>
          <Button leftIcon={<FiCalendar />} colorScheme="brand">
            Set Availability
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
                placeholder="Search patients..."
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
            </Select>
            
            <Select width="200px" defaultValue="today">
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </Select>
          </HStack>
        </CardBody>
      </Card>

      {/* Today's Stats */}
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' }} gap={4} mb={6}>
        {[
          { label: "Today's Appointments", value: '8', color: 'blue' },
          { label: 'Completed', value: '3', color: 'green' },
          { label: 'Pending', value: '2', color: 'yellow' },
          { label: 'No Shows', value: '0', color: 'red' },
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
          <Tab>Today's Schedule</Tab>
          <Tab>Upcoming</Tab>
          <Tab>Pending Approval</Tab>
        </TabList>

        <TabPanels>
          {/* Today's Schedule */}
          <TabPanel p={0} pt={4}>
            <Card>
              <CardBody>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Time</Th>
                      <Th>Patient</Th>
                      <Th>Type</Th>
                      <Th>Symptoms</Th>
                      <Th>Duration</Th>
                      <Th>Status</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {todayAppointments.map((apt) => (
                      <Tr key={apt.id}>
                        <Td>
                          <Flex align="center">
                            <Icon as={FiClock} mr={2} color="gray.400" />
                            {apt.time}
                          </Flex>
                        </Td>
                        <Td>
                          <Flex align="center">
                            <Avatar
                              size="xs"
                              name={apt.patient}
                              mr={2}
                            />
                            {apt.patient}
                          </Flex>
                        </Td>
                        <Td>
                          <Badge variant="subtle">{apt.type}</Badge>
                        </Td>
                        <Td>
                          <Text fontSize="sm">{apt.symptoms}</Text>
                        </Td>
                        <Td>{apt.duration}</Td>
                        <Td>
                          <Badge colorScheme={getStatusColor(apt.status)}>
                            {apt.status}
                          </Badge>
                        </Td>
                        <Td>
                          <HStack spacing={2}>
                            {apt.status === 'confirmed' && (
                              <Button
                                size="xs"
                                leftIcon={<FiVideo />}
                                colorScheme="brand"
                                onClick={() => handleStartConsultation(apt.id)}
                              >
                                Start
                              </Button>
                            )}
                            <Menu>
                              <MenuButton
                                as={IconButton}
                                icon={<FiMoreVertical />}
                                variant="ghost"
                                size="sm"
                              />
                              <MenuList>
                                <MenuItem>View Details</MenuItem>
                                <MenuItem>Reschedule</MenuItem>
                                {apt.status === 'pending' && (
                                  <>
                                    <MenuItem
                                      icon={<FiCheck />}
                                      onClick={() => handleApprove(apt.id)}
                                    >
                                      Approve
                                    </MenuItem>
                                    <MenuItem
                                      icon={<FiX />}
                                      color="red.500"
                                      onClick={() => handleReject(apt.id)}
                                    >
                                      Reject
                                    </MenuItem>
                                  </>
                                )}
                              </MenuList>
                            </Menu>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </TabPanel>

          {/* Upcoming */}
          <TabPanel p={0} pt={4}>
            <Card>
              <CardBody>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Date & Time</Th>
                      <Th>Patient</Th>
                      <Th>Type</Th>
                      <Th>Symptoms</Th>
                      <Th>Status</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {upcomingAppointments.map((apt) => (
                      <Tr key={apt.id}>
                        <Td>
                          <Text>{apt.date}</Text>
                          <Text fontSize="sm" color="gray.600">{apt.time}</Text>
                        </Td>
                        <Td>
                          <Flex align="center">
                            <Avatar
                              size="xs"
                              name={apt.patient}
                              mr={2}
                            />
                            {apt.patient}
                          </Flex>
                        </Td>
                        <Td>
                          <Badge variant="subtle">{apt.type}</Badge>
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
                          <HStack spacing={2}>
                            {apt.status === 'pending' && (
                              <>
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
                              </>
                            )}
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
                <Text color="gray.600" textAlign="center" py={8}>
                  No pending appointments for approval
                </Text>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default DoctorAppointments;