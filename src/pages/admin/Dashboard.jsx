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
  Button,
  VStack,
  HStack,
  Progress,
  Select,
  Badge,
} from '@chakra-ui/react';
import {
  FiUsers,
  FiUserCheck,
  FiCalendar,
  FiDollarSign,
  FiTrendingUp,
  FiActivity,
  FiDownload,
} from 'react-icons/fi';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Patients', value: '2,847', change: '+12.5%', icon: FiUsers, color: 'blue.500' },
    { label: 'Active Doctors', value: '48', change: '+2', icon: FiUserCheck, color: 'green.500' },
    { label: 'Today Appointments', value: '156', change: '+18%', icon: FiCalendar, color: 'purple.500' },
    { label: 'Monthly Revenue', value: '$284,760', change: '+8.2%', icon: FiDollarSign, color: 'orange.500' },
    { label: 'Bed Occupancy', value: '82%', change: '-3%', icon: FiActivity, color: 'red.500' },
    { label: 'Staff Online', value: '23', change: 'Active now', icon: FiUsers, color: 'teal.500' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 40000, expenses: 24000 },
    { month: 'Feb', revenue: 30000, expenses: 13980 },
    { month: 'Mar', revenue: 20000, expenses: 9800 },
    { month: 'Apr', revenue: 27800, expenses: 39080 },
    { month: 'May', revenue: 18900, expenses: 48000 },
    { month: 'Jun', revenue: 23900, expenses: 38000 },
    { month: 'Jul', revenue: 34900, expenses: 43000 },
  ];

  const departmentData = [
    { name: 'Cardiology', value: 400, color: '#3182CE' },
    { name: 'Neurology', value: 300, color: '#38A169' },
    { name: 'Orthopedics', value: 300, color: '#DD6B20' },
    { name: 'Pediatrics', value: 200, color: '#D53F8C' },
    { name: 'Oncology', value: 150, color: '#805AD5' },
  ];

  const recentActivities = [
    { time: '10:30 AM', action: 'New patient registered', user: 'Pavan Ponnella' },
    { time: '09:45 AM', action: 'Appointment booked', user: 'Emma Wilson' },
    { time: '09:15 AM', action: 'Report uploaded', user: 'Dr. Suman Dixit' },
    { time: '08:30 AM', action: 'Payment received', user: 'Robert Brown', amount: '$450' },
  ];

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Hospital Dashboard</Heading>
        <HStack>
          <Select size="sm" width="150px" defaultValue="today">
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </Select>
          <Button leftIcon={<FiDownload />} size="sm" variant="outline">
            Export
          </Button>
        </HStack>
      </Flex>

      {/* Stats Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 6 }} spacing={4} mb={6}>
        {stats.map((stat, index) => (
          <Card key={index} shadow="sm">
            <CardBody>
              <Flex align="center" justify="space-between">
                <Box>
                  <Stat>
                    <StatLabel color="gray.600" fontSize="xs">{stat.label}</StatLabel>
                    <StatNumber fontSize="lg">{stat.value}</StatNumber>
                    <StatHelpText fontSize="xs">
                      <Icon as={FiTrendingUp} />
                      {stat.change}
                    </StatHelpText>
                  </Stat>
                </Box>
                <Icon as={stat.icon} w={6} h={6} color={stat.color} />
              </Flex>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6} mb={6}>
        {/* Revenue Chart */}
        <GridItem>
          <Card shadow="sm" h="full">
            <CardBody>
              <Heading size="md" mb={4}>Revenue & Expenses</Heading>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="month" stroke="#718096" />
                  <YAxis stroke="#718096" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3182CE" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="#E53E3E" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </GridItem>

        {/* Department Distribution */}
        <GridItem>
          <Card shadow="sm" h="full">
            <CardBody>
              <Heading size="md" mb={4}>Department Distribution</Heading>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        {/* Recent Activities */}
        <GridItem>
          <Card shadow="sm">
            <CardBody>
              <Heading size="md" mb={4}>Recent Activities</Heading>
              <VStack spacing={3} align="stretch">
                {recentActivities.map((activity, index) => (
                  <Flex
                    key={index}
                    p={3}
                    border="1px"
                    borderColor="gray.100"
                    borderRadius="md"
                    justify="space-between"
                    align="center"
                  >
                    <Box>
                      <Text fontWeight="medium">{activity.action}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {activity.user} {activity.amount && `• ${activity.amount}`}
                      </Text>
                    </Box>
                    <Badge variant="subtle">{activity.time}</Badge>
                  </Flex>
                ))}
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        {/* System Status */}
        <GridItem>
          <Card shadow="sm">
            <CardBody>
              <Heading size="md" mb={4}>System Status</Heading>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Flex justify="space-between" mb={1}>
                    <Text fontSize="sm">Server Load</Text>
                    <Text fontSize="sm" fontWeight="bold" color="green.500">
                      65%
                    </Text>
                  </Flex>
                  <Progress value={65} colorScheme="green" size="sm" />
                </Box>
                
                <Box>
                  <Flex justify="space-between" mb={1}>
                    <Text fontSize="sm">Database</Text>
                    <Text fontSize="sm" fontWeight="bold" color="blue.500">
                      Normal
                    </Text>
                  </Flex>
                  <Progress value={100} colorScheme="blue" size="sm" />
                </Box>
                
                <Box>
                  <Flex justify="space-between" mb={1}>
                    <Text fontSize="sm">Uptime</Text>
                    <Text fontSize="sm" fontWeight="bold" color="purple.500">
                      99.8%
                    </Text>
                  </Flex>
                  <Progress value={99.8} colorScheme="purple" size="sm" />
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;