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
  VStack,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Textarea,
  Icon,

} from '@chakra-ui/react';
import {
  FiSearch,
  FiFilter,
  FiUpload,
  FiDownload,
  FiEye,
  FiEdit2,
  FiFileText,
  FiCalendar,
  FiUser,
  FiMoreVertical
} from 'react-icons/fi';

const DoctorReports = () => {
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const reports = [
    {
      id: 1,
      patient: 'Pavan Ponnella',
      reportName: 'Blood Test Results',
      date: 'Jan 10, 2024',
      type: 'Lab Report',
      status: 'completed',
      department: 'Pathology',
      size: '2.4 MB',
    },
    {
      id: 2,
      patient: 'Emma Wilson',
      reportName: 'X-Ray Chest',
      date: 'Jan 8, 2024',
      type: 'Imaging',
      status: 'completed',
      department: 'Radiology',
      size: '5.8 MB',
    },
    {
      id: 3,
      patient: 'Robert Brown',
      reportName: 'ECG Report',
      date: 'Jan 5, 2024',
      type: 'Diagnostic',
      status: 'pending',
      department: 'Cardiology',
      size: '1.2 MB',
    },
    {
      id: 4,
      patient: 'Lisa Taylor',
      reportName: 'CT Scan Brain',
      date: 'Jan 3, 2024',
      type: 'Imaging',
      status: 'uploaded',
      department: 'Radiology',
      size: '15.6 MB',
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      completed: 'green',
      pending: 'yellow',
      uploaded: 'blue',
      processing: 'orange',
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
    const matchesSearch = report.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.reportName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      // Handle success
    }, 2000);
  };

  const handleDownload = (reportId) => {
    // Handle download logic
    console.log('Download report:', reportId);
  };

  const handleView = (reportId) => {
    // Handle view logic
    console.log('View report:', reportId);
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Reports Management</Heading>
        <Button
          leftIcon={<FiUpload />}
          colorScheme="brand"
          isLoading={isUploading}
          onClick={handleUpload}
        >
          Upload Report
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
                placeholder="Search by patient or report name..."
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
            </Select>
          </HStack>
        </CardBody>
      </Card>

      {/* Stats */}
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' }} gap={4} mb={6}>
        {[
          { label: 'Total Reports', value: '48', color: 'blue' },
          { label: 'Lab Reports', value: '22', color: 'green' },
          { label: 'Imaging', value: '18', color: 'purple' },
          { label: 'Pending Review', value: '3', color: 'yellow' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardBody>
              <Flex align="center" justify="space-between">
                <Box>
                  <Text fontSize="sm" color="gray.600">{stat.label}</Text>
                  <Text fontSize="2xl" fontWeight="bold">{stat.value}</Text>
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
                <Th>Patient</Th>
                <Th>Report Name</Th>
                <Th>Type</Th>
                <Th>Date</Th>
                <Th>Department</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredReports.map((report) => (
                <Tr key={report.id}>
                  <Td>
                    <Flex align="center">
                      <Avatar
                        size="sm"
                        name={report.patient}
                        mr={2}
                      />
                      <Text fontWeight="medium">{report.patient}</Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex align="center">
                      <Icon as={FiFileText} mr={3} color="gray.400" />
                      <Box>
                        <Text fontWeight="medium">{report.reportName}</Text>
                        <Text fontSize="xs" color="gray.500">
                          {report.size}
                        </Text>
                      </Box>
                    </Flex>
                  </Td>
                  <Td>
                    <Badge colorScheme={getTypeColor(report.type)}>
                      {report.type}
                    </Badge>
                  </Td>
                  <Td>
                    <Flex align="center">
                      <Icon as={FiCalendar} mr={2} color="gray.400" />
                      {report.date}
                    </Flex>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{report.department}</Text>
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
                          <MenuItem icon={<FiEdit2 />}>
                            Edit Report
                          </MenuItem>
                          <MenuItem icon={<FiDownload />}>
                            Download PDF
                          </MenuItem>
                          <MenuItem icon={<FiFileText />}>
                            Generate Summary
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

      {/* Upload Section */}
      <Card mt={6}>
        <CardBody>
          <Heading size="md" mb={4}>Upload New Report</Heading>
          <VStack spacing={4} align="stretch">
            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
              <FormControl>
                <FormLabel>Patient</FormLabel>
                <Select placeholder="Select patient">
                  <option>Pavan Ponnella</option>
                  <option>Emma Wilson</option>
                  <option>Robert Brown</option>
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel>Report Type</FormLabel>
                <Select placeholder="Select type">
                  <option>Lab Report</option>
                  <option>Imaging</option>
                  <option>Diagnostic</option>
                  <option>Prescription</option>
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel>Report Date</FormLabel>
                <Input type="date" />
              </FormControl>
              
              <FormControl>
                <FormLabel>Department</FormLabel>
                <Select>
                  <option>Pathology</option>
                  <option>Radiology</option>
                  <option>Cardiology</option>
                  <option>Neurology</option>
                </Select>
              </FormControl>
            </Grid>
            
            <FormControl>
              <FormLabel>Upload File</FormLabel>
              <Input type="file" p={1} />
            </FormControl>
            
            <FormControl>
              <FormLabel>Notes</FormLabel>
              <Textarea placeholder="Add any notes about the report..." rows={3} />
            </FormControl>
            
            <Button
              leftIcon={<FiUpload />}
              colorScheme="brand"
              alignSelf="flex-start"
            >
              Upload Report
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default DoctorReports;