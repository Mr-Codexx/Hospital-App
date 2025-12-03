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
  Tag,
  TagLabel,
  Grid,
  Icon,
} from '@chakra-ui/react';
import {
  FiDownload,
  FiEye,
  FiFileText,
  FiFilter,
  FiSearch,
  FiCalendar,
  FiPrinter,
  FiShare2,
  FiMoreVertical,
} from 'react-icons/fi';

const PatientReports = () => {
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const reports = [
    {
      id: 1,
      name: 'Blood Test Results',
      date: 'Jan 10, 2024',
      type: 'Lab Report',
      doctor: 'Dr. Suman Dixit',
      status: 'completed',
      department: 'Pathology',
      size: '2.4 MB',
    },
    {
      id: 2,
      name: 'X-Ray Chest',
      date: 'Jan 8, 2024',
      type: 'Imaging',
      doctor: 'Dr. Syed',
      status: 'completed',
      department: 'Radiology',
      size: '5.8 MB',
    },
    {
      id: 3,
      name: 'ECG Report',
      date: 'Jan 5, 2024',
      type: 'Diagnostic',
      doctor: 'Dr. Ashok',
      status: 'completed',
      department: 'Cardiology',
      size: '1.2 MB',
    },
    {
      id: 4,
      name: 'CT Scan Brain',
      date: 'Jan 3, 2024',
      type: 'Imaging',
      doctor: 'Dr. Surbhi Agnihotri',
      status: 'pending',
      department: 'Radiology',
      size: '15.6 MB',
    },
    {
      id: 5,
      name: 'Liver Function Test',
      date: 'Dec 28, 2023',
      type: 'Lab Report',
      doctor: 'Dr. Suman Dixit',
      status: 'completed',
      department: 'Pathology',
      size: '1.8 MB',
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      completed: 'green',
      pending: 'yellow',
      processing: 'blue',
    };
    return colors[status] || 'gray';
  };

  const getTypeColor = (type) => {
    const colors = {
      'Lab Report': 'blue',
      'Imaging': 'purple',
      'Diagnostic': 'green',
    };
    return colors[type] || 'gray';
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.doctor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleView = (reportId) => {
    // Handle view logic
    console.log('View report:', reportId);
  };

  const handleDownload = (reportId) => {
    // Handle download logic
    console.log('Download report:', reportId);
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Medical Reports</Heading>
        <Button leftIcon={<FiDownload />} colorScheme="brand">
          Download All
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
                placeholder="Search reports by name or doctor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              width="200px"
            >
              <option value="all">All Types</option>
              <option value="Lab Report">Lab Reports</option>
              <option value="Imaging">Imaging</option>
              <option value="Diagnostic">Diagnostic</option>
            </Select>
            
            <Select width="200px" defaultValue="all">
              <option value="all">All Time</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </Select>
          </HStack>
        </CardBody>
      </Card>

      {/* Reports Grid */}
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }} gap={4} mb={6}>
        {[
          { label: 'Total Reports', value: '24', color: 'blue', change: '+5 this month' },
          { label: 'Lab Reports', value: '12', color: 'green', change: 'Latest: Today' },
          { label: 'Imaging Reports', value: '8', color: 'purple', change: '2 pending' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardBody>
              <Flex align="center" justify="space-between">
                <Box>
                  <Text fontSize="sm" color="gray.600">{stat.label}</Text>
                  <Text fontSize="2xl" fontWeight="bold">{stat.value}</Text>
                  <Text fontSize="xs" color="gray.500">{stat.change}</Text>
                </Box>
                <Icon as={FiFileText} w={8} h={8} color={`${stat.color}.500`} />
              </Flex>
            </CardBody>
          </Card>
        ))}
      </Grid>

      {/* Reports Table */}
      <Card>
        <CardBody>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Report Name</Th>
                <Th>Type</Th>
                <Th>Date</Th>
                <Th>Doctor</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredReports.map((report) => (
                <Tr key={report.id}>
                  <Td>
                    <Flex align="center">
                      <Icon as={FiFileText} mr={3} color="gray.400" />
                      <Box>
                        <Text fontWeight="medium">{report.name}</Text>
                        <Text fontSize="xs" color="gray.500">
                          {report.department} • {report.size}
                        </Text>
                      </Box>
                    </Flex>
                  </Td>
                  <Td>
                    <Tag size="sm" colorScheme={getTypeColor(report.type)}>
                      <TagLabel>{report.type}</TagLabel>
                    </Tag>
                  </Td>
                  <Td>
                    <Flex align="center">
                      <Icon as={FiCalendar} mr={2} color="gray.400" />
                      {report.date}
                    </Flex>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{report.doctor}</Text>
                  </Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <IconButton
                        icon={<FiEye />}
                        size="sm"
                        variant="ghost"
                        onClick={() => handleView(report.id)}
                      />
                      <IconButton
                        icon={<FiDownload />}
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDownload(report.id)}
                      />
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<FiMoreVertical />}
                          variant="ghost"
                          size="sm"
                        />
                        <MenuList>
                          <MenuItem icon={<FiPrinter />}>
                            Print Report
                          </MenuItem>
                          <MenuItem icon={<FiShare2 />}>
                            Share Report
                          </MenuItem>
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
    </Box>
  );
};

export default PatientReports;