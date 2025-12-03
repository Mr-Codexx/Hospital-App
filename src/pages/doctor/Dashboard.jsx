import React from 'react';
import {
  Grid,
  GridItem,
  Box,
  Flex,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  SimpleGrid,
  Card,
  CardBody,
  Avatar,
  Badge,
  Button,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import {
  FiCalendar,
  FiUsers,
  FiClock,
  FiActivity,
  FiArrowUp,
  FiAlertCircle,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const DoctorDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      label: "Today's Appointments",
      value: '12',
      icon: FiCalendar,
      color: 'blue.500',
      change: '+3 from yesterday',
    },
    {
      label: 'Total Patients',
      value: '156',
      icon: FiUsers,
      color: 'green.500',
      change: 'Active: 48',
    },
    {
      label: 'Waiting Time',
      value: '15 mins',
      icon: FiClock,
      color: 'orange.500',
      change: 'Average per patient',
    },
    {
      label: 'Prescriptions',
      value: '24',
      icon: FiActivity,
      color: 'purple.500',
      change: 'This week',
    },
  ];

  const todaysSchedule = [
    { time: '09:00 AM', patient: 'Pavan Ponnella', type: 'Follow-up', status: 'confirmed' },
    { time: '09:30 AM', patient: 'Emma Wilson', type: 'New', status: 'confirmed' },
    { time: '10:15 AM', patient: 'Robert Brown', type: 'Consultation', status: 'waiting' },
    { time: '11:00 AM', patient: 'Lisa Taylor', type: 'Follow-up', status: 'confirmed' },
    { time: '11:45 AM', patient: 'Michael Chen', type: 'Emergency', status: 'urgent' },
  ];

  const criticalPatients = [
    { name: 'Sarah Johnson', condition: 'Hypertension', room: 'ICU-102', time: '2h ago' },
    { name: 'David Miller', condition: 'Cardiac Arrest', room: 'ICU-101', time: '1h ago' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'green',
      waiting: 'yellow',
      urgent: 'red',
    };
    return colors[status] || 'gray';
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading size="lg" mb={2}>
            Dr. {user?.name}
          </Heading>
          <Text color="gray.600">
            Department: {user?.department} • Today: {new Date().toLocaleDateString()}
          </Text>
        </Box>
        <Button colorScheme="brand" leftIcon={<FiCalendar />}>
          Set Availability
        </Button>
      </Flex>

      {/* Stats Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mb={6}>
        {stats.map((stat, index) => (
          <Card key={index} shadow="sm">
            <CardBody>
              <Flex align="center" justify="space-between">
                <Box>
                  <Stat>
                    <StatLabel color="gray.600">{stat.label}</StatLabel>
                    <StatNumber fontSize="2xl">{stat.value}</StatNumber>
                    <StatHelpText>
                      <Icon as={FiArrowUp} />
                      {stat.change}
                    </StatHelpText>
                  </Stat>
                </Box>
                <Icon as={stat.icon} w={8} h={8} color={stat.color} />
              </Flex>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      <Grid templateColumns={{ base: '1fr', lg: '3fr 2fr' }} gap={6}>
        {/* Left Column */}
        <GridItem>
          <Card shadow="sm" mb={6}>
            <CardBody>
              <Heading size="md" mb={4}>
                Today's Schedule
              </Heading>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Time</Th>
                    <Th>Patient</Th>
                    <Th>Type</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {todaysSchedule.map((apt, index) => (
                    <Tr key={index}>
                      <Td fontWeight="medium">{apt.time}</Td>
                      <Td>
                        <Flex align="center">
                          <Avatar size="xs" name={apt.patient} mr={2} />
                          {apt.patient}
                        </Flex>
                      </Td>
                      <Td>
                        <Badge variant="subtle">{apt.type}</Badge>
                      </Td>
                      <Td>
                        <Badge colorScheme={getStatusColor(apt.status)}>
                          {apt.status}
                        </Badge>
                      </Td>
                      <Td>
                        <Button size="xs" colorScheme="brand">
                          Start
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </CardBody>
          </Card>
        </GridItem>

        {/* Right Column */}
        <GridItem>
          <Card shadow="sm" mb={6}>
            <CardBody>
              <Flex align="center" mb={4}>
                <Icon as={FiAlertCircle} color="red.500" mr={2} />
                <Heading size="md">Critical Patients</Heading>
              </Flex>
              <VStack spacing={4} align="stretch">
                {criticalPatients.map((patient, index) => (
                  <Flex
                    key={index}
                    p={4}
                    bg="red.50"
                    border="1px"
                    borderColor="red.200"
                    borderRadius="md"
                    justify="space-between"
                    align="center"
                  >
                    <Box>
                      <Text fontWeight="bold">{patient.name}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {patient.condition} • Room {patient.room}
                      </Text>
                    </Box>
                    <Badge colorScheme="red">{patient.time}</Badge>
                  </Flex>
                ))}
              </VStack>
            </CardBody>
          </Card>

          <Card shadow="sm">
            <CardBody>
              <Heading size="md" mb={4}>
                Quick Actions
              </Heading>
              <VStack spacing={3} align="stretch">
                <Button leftIcon={<FiUsers />} colorScheme="brand" size="sm">
                  View All Patients
                </Button>
                <Button leftIcon={<FiCalendar />} variant="outline" size="sm">
                  Manage Appointments
                </Button>
                <Button leftIcon={<FiActivity />} variant="outline" size="sm">
                  Write Prescription
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default DoctorDashboard;