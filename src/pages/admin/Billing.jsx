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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  VStack,
  Icon
} from '@chakra-ui/react';
import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiPrinter,
  FiDollarSign,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiPlus,
  FiEye,
  
} from 'react-icons/fi';

const AdminBilling = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const bills = [
    {
      id: 'INV-2024-001',
      patient: 'Pavan Ponnella',
      date: 'Jan 15, 2024',
      amount: '$1,250.00',
      status: 'paid',
      dueDate: 'Jan 30, 2024',
      items: ['Consultation', 'Lab Tests', 'Medication'],
      paymentMethod: 'Credit Card',
    },
    {
      id: 'INV-2024-002',
      patient: 'Emma Wilson',
      date: 'Jan 14, 2024',
      amount: '$850.00',
      status: 'pending',
      dueDate: 'Jan 29, 2024',
      items: ['Consultation', 'X-Ray'],
      paymentMethod: 'Insurance',
    },
    {
      id: 'INV-2024-003',
      patient: 'Robert Brown',
      date: 'Jan 13, 2024',
      amount: '$2,100.00',
      status: 'partial',
      dueDate: 'Jan 28, 2024',
      items: ['Surgery', 'Medication', 'Room Charges'],
      paymentMethod: 'Cash',
    },
    {
      id: 'INV-2024-004',
      patient: 'Lisa Taylor',
      date: 'Jan 12, 2024',
      amount: '$450.00',
      status: 'overdue',
      dueDate: 'Jan 27, 2024',
      items: ['Consultation', 'Lab Tests'],
      paymentMethod: null,
    },
    {
      id: 'INV-2024-005',
      patient: 'Michael Chen',
      date: 'Jan 11, 2024',
      amount: '$1,750.00',
      status: 'paid',
      dueDate: 'Jan 26, 2024',
      items: ['Emergency', 'Medication', 'Tests'],
      paymentMethod: 'Insurance',
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      paid: 'green',
      pending: 'yellow',
      partial: 'orange',
      overdue: 'red',
    };
    return colors[status] || 'gray';
  };

  const filteredBills = bills.filter((bill) => {
    const matchesSearch = bill.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bill.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bill.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleGenerateBill = () => {
    // Handle generate bill logic
    console.log('Generate new bill');
  };

  const handleViewBill = (billId) => {
    // Handle view bill logic
    console.log('View bill:', billId);
  };

  const handlePrintBill = (billId) => {
    // Handle print bill logic
    console.log('Print bill:', billId);
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Billing & Invoicing</Heading>
        <Button leftIcon={<FiPlus />} colorScheme="brand" onClick={handleGenerateBill}>
          Generate Bill
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
                placeholder="Search by patient name or invoice ID..."
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
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="partial">Partial</option>
              <option value="overdue">Overdue</option>
            </Select>
            
            <Select width="200px" defaultValue="month">
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </Select>
          </HStack>
        </CardBody>
      </Card>

      {/* Stats */}
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' }} gap={4} mb={6}>
        {[
          { label: 'Total Revenue', value: '$48,250', icon: FiDollarSign, color: 'green', change: '+12.5%' },
          { label: 'Pending Payments', value: '$8,400', icon: FiClock, color: 'yellow', change: '3 invoices' },
          { label: 'Overdue', value: '$2,150', icon: FiAlertCircle, color: 'red', change: '2 invoices' },
          { label: 'This Month', value: '$12,800', icon: FiCheckCircle, color: 'blue', change: '15 invoices' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardBody>
              <Flex align="center" justify="space-between">
                <Box>
                  <Stat>
                    <StatLabel color="gray.600">{stat.label}</StatLabel>
                    <StatNumber fontSize="lg">{stat.value}</StatNumber>
                    <StatHelpText fontSize="xs">
                      {stat.change}
                    </StatHelpText>
                  </Stat>
                </Box>
                <Icon as={stat.icon} w={8} h={8} color={`${stat.color}.500`} />
              </Flex>
            </CardBody>
          </Card>
        ))}
      </Grid>

      {/* Tabs */}
      <Tabs colorScheme="brand" mb={6}>
        <TabList>
          <Tab>All Invoices</Tab>
          <Tab>Pending Payments</Tab>
          <Tab>Overdue</Tab>
          <Tab>Payment Reports</Tab>
        </TabList>

        <TabPanels>
          {/* All Invoices */}
          <TabPanel p={0} pt={4}>
            <Card>
              <CardBody>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Invoice ID</Th>
                      <Th>Patient</Th>
                      <Th>Date</Th>
                      <Th>Amount</Th>
                      <Th>Due Date</Th>
                      <Th>Status</Th>
                      <Th>Payment Method</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredBills.map((bill) => (
                      <Tr key={bill.id}>
                        <Td>
                          <Text fontWeight="medium">{bill.id}</Text>
                        </Td>
                        <Td>
                          <Flex align="center">
                            <Avatar
                              size="xs"
                              name={bill.patient}
                              mr={2}
                            />
                            {bill.patient}
                          </Flex>
                        </Td>
                        <Td>
                          <Text fontSize="sm">{bill.date}</Text>
                        </Td>
                        <Td>
                          <Text fontWeight="bold" color="green.500">
                            {bill.amount}
                          </Text>
                        </Td>
                        <Td>
                          <Text fontSize="sm">{bill.dueDate}</Text>
                        </Td>
                        <Td>
                          <Badge colorScheme={getStatusColor(bill.status)}>
                            {bill.status}
                          </Badge>
                        </Td>
                        <Td>
                          <Text fontSize="sm">{bill.paymentMethod || 'Not specified'}</Text>
                        </Td>
                        <Td>
                          <HStack spacing={2}>
                            <IconButton
                              icon={<FiEye />}
                              size="sm"
                              variant="ghost"
                              onClick={() => handleViewBill(bill.id)}
                            />
                            <IconButton
                              icon={<FiPrinter />}
                              size="sm"
                              variant="ghost"
                              onClick={() => handlePrintBill(bill.id)}
                            />
                            <IconButton
                              icon={<FiDownload />}
                              size="sm"
                              variant="ghost"
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

          {/* Pending Payments */}
          <TabPanel p={0} pt={4}>
            <Card>
              <CardBody>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Invoice ID</Th>
                      <Th>Patient</Th>
                      <Th>Amount</Th>
                      <Th>Due Date</Th>
                      <Th>Days Left</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {bills
                      .filter(bill => bill.status === 'pending' || bill.status === 'partial')
                      .map((bill) => (
                        <Tr key={bill.id}>
                          <Td>{bill.id}</Td>
                          <Td>{bill.patient}</Td>
                          <Td>
                            <Text fontWeight="bold" color="orange.500">
                              {bill.amount}
                            </Text>
                          </Td>
                          <Td>{bill.dueDate}</Td>
                          <Td>
                            <Badge colorScheme="yellow">7 days</Badge>
                          </Td>
                          <Td>
                            <Button size="xs" colorScheme="brand">
                              Send Reminder
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </TabPanel>

          {/* Overdue */}
          <TabPanel p={0} pt={4}>
            <Card>
              <CardBody>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Invoice ID</Th>
                      <Th>Patient</Th>
                      <Th>Amount</Th>
                      <Th>Due Date</Th>
                      <Th>Overdue By</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {bills
                      .filter(bill => bill.status === 'overdue')
                      .map((bill) => (
                        <Tr key={bill.id}>
                          <Td>{bill.id}</Td>
                          <Td>{bill.patient}</Td>
                          <Td>
                            <Text fontWeight="bold" color="red.500">
                              {bill.amount}
                            </Text>
                          </Td>
                          <Td>{bill.dueDate}</Td>
                          <Td>
                            <Badge colorScheme="red">3 days</Badge>
                          </Td>
                          <Td>
                            <Button size="xs" colorScheme="red">
                              Escalate
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </TabPanel>

          {/* Payment Reports */}
          <TabPanel p={0} pt={4}>
            <Card>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between">
                    <Heading size="md">Payment Reports</Heading>
                    <Button leftIcon={<FiDownload />} colorScheme="brand">
                      Export Report
                    </Button>
                  </HStack>
                  
                  <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                    <Card>
                      <CardBody>
                        <Stat>
                          <StatLabel>Monthly Revenue</StatLabel>
                          <StatNumber>$12,800</StatNumber>
                          <StatHelpText>
                            <Text color="green.500">↑ 12.5% from last month</Text>
                          </StatHelpText>
                        </Stat>
                      </CardBody>
                    </Card>
                    
                    <Card>
                      <CardBody>
                        <Stat>
                          <StatLabel>Payment Success Rate</StatLabel>
                          <StatNumber>94.2%</StatNumber>
                          <StatHelpText>
                            <Text color="green.500">↑ 2.1% from last month</Text>
                          </StatHelpText>
                        </Stat>
                      </CardBody>
                    </Card>
                  </Grid>
                </VStack>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AdminBilling;