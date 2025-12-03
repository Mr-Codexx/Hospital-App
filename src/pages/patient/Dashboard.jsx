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
  Progress,
} from '@chakra-ui/react';
import {
  FiCalendar,
  FiFileText,
  FiClock,
  FiActivity,
  FiArrowUp,
  FiArrowDown,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const PatientDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      label: 'Upcoming Appointments',
      value: '3',
      icon: FiCalendar,
      color: 'blue.500',
      change: '+1 this week',
    },
    {
      label: 'Pending Reports',
      value: '2',
      icon: FiFileText,
      color: 'orange.500',
      change: 'Waiting for results',
    },
    {
      label: 'Prescriptions',
      value: '5',
      icon: FiFileText,
      color: 'green.500',
      change: 'Active medications',
    },
    {
      label: 'Doctor Follow-up',
      value: 'In 3 days',
      icon: FiClock,
      color: 'purple.500',
      change: 'Dr. Suman Dixit',
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      date: 'Tomorrow, 10:30 AM',
      doctor: 'Dr. Suman Dixit',
      department: 'Cardiology',
      status: 'confirmed',
    },
    {
      id: 2,
      date: 'Jan 20, 2:00 PM',
      doctor: 'Dr. Syed',
      department: 'Neurology',
      status: 'pending',
    },
  ];

  const recentReports = [
    {
      id: 1,
      name: 'Blood Test Results',
      date: 'Jan 10, 2024',
      type: 'Lab Report',
      status: 'completed',
    },
    {
      id: 2,
      name: 'X-Ray Report',
      date: 'Jan 8, 2024',
      type: 'Imaging',
      status: 'pending',
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'green',
      pending: 'yellow',
      completed: 'blue',
    };
    return colors[status] || 'gray';
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading size="lg" mb={2}>
            Welcome back, {user?.name}
          </Heading>
          <Text color="gray.600">
            Here's your health summary and upcoming appointments
          </Text>
        </Box>
        <Button colorScheme="brand" size="sm">
          Book New Appointment
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
                      <Icon as={stat.change.includes('+') ? FiArrowUp : FiArrowDown} />
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

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        {/* Left Column */}
        <GridItem>
          <Card shadow="sm" mb={6}>
            <CardBody>
              <Heading size="md" mb={4}>
                Upcoming Appointments
              </Heading>
              <VStack spacing={4} align="stretch">
                {upcomingAppointments.map((apt) => (
                  <Flex
                    key={apt.id}
                    p={4}
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                    justify="space-between"
                    align="center"
                  >
                    <Box>
                      <Text fontWeight="bold">{apt.doctor}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {apt.department} • {apt.date}
                      </Text>
                    </Box>
                    <Badge colorScheme={getStatusColor(apt.status)}>
                      {apt.status}
                    </Badge>
                  </Flex>
                ))}
              </VStack>
            </CardBody>
          </Card>

          <Card shadow="sm">
            <CardBody>
              <Heading size="md" mb={4}>
                Recent Reports
              </Heading>
              <VStack spacing={4} align="stretch">
                {recentReports.map((report) => (
                  <Flex
                    key={report.id}
                    p={4}
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                    justify="space-between"
                    align="center"
                  >
                    <Box>
                      <Text fontWeight="bold">{report.name}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {report.type} • {report.date}
                      </Text>
                    </Box>
                    <Button size="sm" colorScheme="brand" variant="outline">
                      View
                    </Button>
                  </Flex>
                ))}
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        {/* Right Column */}
        <GridItem>
          <Card shadow="sm" mb={6}>
            <CardBody>
              <Heading size="md" mb={4}>
                Health Summary
              </Heading>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Flex justify="space-between" mb={1}>
                    <Text fontSize="sm">Blood Pressure</Text>
                    <Text fontSize="sm" fontWeight="bold" color="green.500">
                      120/80
                    </Text>
                  </Flex>
                  <Progress value={80} colorScheme="green" size="sm" />
                </Box>
                
                <Box>
                  <Flex justify="space-between" mb={1}>
                    <Text fontSize="sm">Blood Sugar</Text>
                    <Text fontSize="sm" fontWeight="bold" color="blue.500">
                      98 mg/dL
                    </Text>
                  </Flex>
                  <Progress value={70} colorScheme="blue" size="sm" />
                </Box>
                
                <Box>
                  <Flex justify="space-between" mb={1}>
                    <Text fontSize="sm">Cholesterol</Text>
                    <Text fontSize="sm" fontWeight="bold" color="orange.500">
                      180 mg/dL
                    </Text>
                  </Flex>
                  <Progress value={60} colorScheme="orange" size="sm" />
                </Box>
              </VStack>
            </CardBody>
          </Card>

          <Card shadow="sm">
            <CardBody>
              <Heading size="md" mb={4}>
                Quick Actions
              </Heading>
              <VStack spacing={3} align="stretch">
                <Button leftIcon={<FiCalendar />} variant="outline" size="sm">
                  Schedule Appointment
                </Button>
                <Button leftIcon={<FiFileText />} variant="outline" size="sm">
                  View All Reports
                </Button>
                <Button leftIcon={<FiActivity />} variant="outline" size="sm">
                  Health Tracking
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default PatientDashboard;