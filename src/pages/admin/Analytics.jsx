import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Card,
  CardBody,
  Grid,
  GridItem,
  Text,
  Select,
  HStack,
  Button,
  VStack,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Progress,
} from '@chakra-ui/react';
import {
  FiDownload,
  FiFilter,
  FiTrendingUp,
  FiTrendingDown,
  FiUsers,
  FiCalendar,
  FiDollarSign,
  FiActivity,
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

const AdminAnalytics = () => {
  const revenueData = [
    { month: 'Jul', revenue: 32000, patients: 240 },
    { month: 'Aug', revenue: 28000, patients: 210 },
    { month: 'Sep', revenue: 35000, patients: 280 },
    { month: 'Oct', revenue: 42000, patients: 320 },
    { month: 'Nov', revenue: 38000, patients: 290 },
    { month: 'Dec', revenue: 45000, patients: 350 },
    { month: 'Jan', revenue: 52000, patients: 410 },
  ];

  const departmentRevenue = [
    { name: 'Cardiology', value: 125400, color: '#3182CE' },
    { name: 'Orthopedics', value: 156800, color: '#38A169' },
    { name: 'Emergency', value: 210000, color: '#E53E3E' },
    { name: 'Neurology', value: 98750, color: '#805AD5' },
    { name: 'Pediatrics', value: 112500, color: '#DD6B20' },
  ];

  const topDoctors = [
    { name: 'Dr. Suman Dixit', department: 'Cardiology', patients: 156, revenue: '$125,400', rating: 4.8 },
    { name: 'Dr. Ashok', department: 'Orthopedics', patients: 210, revenue: '$156,800', rating: 4.9 },
    { name: 'Dr. Amanda Scott', department: 'Emergency', patients: 185, revenue: '$142,000', rating: 4.7 },
    { name: 'Dr. Syed', department: 'Neurology', patients: 128, revenue: '$98,750', rating: 4.6 },
    { name: 'Dr. Ashish Gupta', department: 'Pediatrics', patients: 180, revenue: '$112,500', rating: 4.5 },
  ];

  const kpis = [
    { label: 'Total Patients', value: '2,847', change: '+12.5%', icon: FiUsers, color: 'blue', trend: 'up' },
    { label: 'Monthly Revenue', value: '$52,000', change: '+15.2%', icon: FiDollarSign, color: 'green', trend: 'up' },
    { label: 'Avg. Occupancy', value: '82%', change: '+3.2%', icon: FiActivity, color: 'purple', trend: 'up' },
    { label: 'Appointments', value: '1,240', change: '+8.7%', icon: FiCalendar, color: 'orange', trend: 'up' },
  ];

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Analytics Dashboard</Heading>
        <HStack spacing={3}>
          <Select size="sm" width="150px" defaultValue="month">
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </Select>
          <Button leftIcon={<FiDownload />} size="sm" variant="outline">
            Export Report
          </Button>
        </HStack>
      </Flex>

      {/* KPI Cards */}
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' }} gap={4} mb={6}>
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardBody>
              <Flex align="center" justify="space-between">
                <Box>
                  <Text fontSize="sm" color="gray.600">{kpi.label}</Text>
                  <Text fontSize="2xl" fontWeight="bold">{kpi.value}</Text>
                  <HStack spacing={1} mt={1}>
                    {kpi.trend === 'up' ? (
                      <FiTrendingUp color="#38A169" />
                    ) : (
                      <FiTrendingDown color="#E53E3E" />
                    )}
                    <Text fontSize="sm" color={kpi.trend === 'up' ? 'green.500' : 'red.500'}>
                      {kpi.change}
                    </Text>
                  </HStack>
                </Box>
                <Box
                  p={3}
                  borderRadius="full"
                  bg={`${kpi.color}.100`}
                  color={`${kpi.color}.600`}
                >
                  <kpi.icon size={24} />
                </Box>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6} mb={6}>
        {/* Revenue Trend */}
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Revenue & Patients Trend</Heading>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#718096" />
                <YAxis yAxisId="left" stroke="#718096" />
                <YAxis yAxisId="right" orientation="right" stroke="#718096" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3182CE"
                  strokeWidth={2}
                  name="Revenue ($)"
                  dot={{ r: 4 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="patients"
                  stroke="#38A169"
                  strokeWidth={2}
                  name="Patients"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Department Revenue Distribution */}
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Revenue by Department</Heading>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentRevenue}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentRevenue.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </Grid>

      {/* Bottom Section */}
      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6}>
        {/* Top Doctors */}
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Top Performing Doctors</Heading>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Doctor</Th>
                  <Th>Department</Th>
                  <Th>Patients</Th>
                  <Th>Revenue</Th>
                  <Th>Rating</Th>
                </Tr>
              </Thead>
              <Tbody>
                {topDoctors.map((doctor, index) => (
                  <Tr key={index}>
                    <Td>
                      <Text fontWeight="medium">{doctor.name}</Text>
                    </Td>
                    <Td>
                      <Badge variant="subtle">{doctor.department}</Badge>
                    </Td>
                    <Td>{doctor.patients}</Td>
                    <Td>
                      <Text fontWeight="medium" color="green.500">
                        {doctor.revenue}
                      </Text>
                    </Td>
                    <Td>
                      <Flex align="center">
                        <Text fontWeight="medium" mr={2}>
                          {doctor.rating}
                        </Text>
                        <Progress value={doctor.rating * 20} size="xs" width="60px" />
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Performance Metrics</Heading>
            <VStack spacing={4} align="stretch">
              {[
                { label: 'Patient Satisfaction', value: 94, target: 95, color: 'green' },
                { label: 'Appointment Success Rate', value: 88, target: 90, color: 'blue' },
                { label: 'Revenue Growth', value: 15.2, target: 12, color: 'green' },
                { label: 'Bed Occupancy Rate', value: 82, target: 85, color: 'orange' },
                { label: 'Average Wait Time', value: 15, target: 10, color: 'red' },
              ].map((metric) => (
                <Box key={metric.label}>
                  <Flex justify="space-between" mb={1}>
                    <Text fontSize="sm">{metric.label}</Text>
                    <Text fontSize="sm" fontWeight="medium">
                      {typeof metric.value === 'number' && metric.label.includes('Growth')
                        ? `${metric.value}%`
                        : metric.label.includes('Time')
                        ? `${metric.value} mins`
                        : `${metric.value}%`}
                    </Text>
                  </Flex>
                  <Progress
                    value={metric.value}
                    max={metric.target}
                    colorScheme={metric.color}
                    size="sm"
                    borderRadius="full"
                  />
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    Target: {metric.target}%
                  </Text>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </Grid>
    </Box>
  );
};

export default AdminAnalytics;