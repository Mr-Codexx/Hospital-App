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
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  HStack,
  Text,
  VStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import {
  FiSearch,
  FiUpload,
  FiDownload,
  FiEye,
  FiFilter,
  FiFileText,
  FiCalendar,
  FiUser,
  FiPrinter,
} from 'react-icons/fi';

const StaffReports = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadData, setUploadData] = useState({
    patientId: '',
    reportType: '',
    file: null,
    notes: '',
  });

  const reports = [
    {
      id: 'RPT-001',
      patient: 'Pavan Ponnella',
      reportName: 'Blood Test Results',
      date: 'Jan 15, 2024',
      type: 'Lab Report',
      status: 'uploaded',
      department: 'Pathology',
      uploadedBy: 'Staff User',
      size: '2.4 MB',
    },
    {
      id: 'RPT-002',
      patient: 'Emma Wilson',
      reportName: 'X-Ray Report',
      date: 'Jan 14, 2024',
      type: 'Imaging',
      status: 'pending',
      department: 'Radiology',
      uploadedBy: 'Staff User',
      size: '5.8 MB',
    },
    {
      id: 'RPT-003',
      patient: 'Robert Brown',
      reportName: 'ECG Report',
      date: 'Jan 13, 2024',
      type: 'Diagnostic',
      status: 'uploaded',
      department: 'Cardiology',
      uploadedBy: 'Staff User',
      size: '1.2 MB',
    },
    {
      id: 'RPT-004',
      patient: 'Lisa Taylor',
      reportName: 'CT Scan Results',
      date: 'Jan 12, 2024',
      type: 'Imaging',
      status: 'processing',
      department: 'Radiology',
      uploadedBy: 'Staff User',
      size: '15.6 MB',
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      uploaded: 'green',
      pending: 'yellow',
      processing: 'blue',
      error: 'red',
    };
    return colors[status] || 'gray';
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.reportName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadData(prev => ({ ...prev, file }));
    }
  };

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      onClose();
      setUploadData({
        patientId: '',
        reportType: '',
        file: null,
        notes: '',
      });
      // Show success message
    }, 2000);
  };

  const handleDownload = (reportId) => {
    // Handle download logic
    console.log('Download report:', reportId);
  };

  const handlePrint = (reportId) => {
    // Handle print logic
    console.log('Print report:', reportId);
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Reports Management</Heading>
        <Button leftIcon={<FiUpload />} colorScheme="brand" onClick={onOpen}>
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
                placeholder="Search by patient name or report ID..."
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
              <option value="uploaded">Uploaded</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
            </Select>
            
            <Select width="200px" defaultValue="week">
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </Select>
          </HStack>
        </CardBody>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardBody>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Report ID</Th>
                <Th>Patient</Th>
                <Th>Report Name</Th>
                <Th>Date</Th>
                <Th>Type</Th>
                <Th>Department</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredReports.map((report) => (
                <Tr key={report.id}>
                  <Td>
                    <Text fontWeight="medium">{report.id}</Text>
                  </Td>
                  <Td>
                    <Flex align="center">
                      <Box
                        p={2}
                        borderRadius="full"
                        bg="blue.100"
                        color="blue.600"
                        mr={3}
                      >
                        <FiUser size={16} />
                      </Box>
                      <Text fontWeight="medium">{report.patient}</Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex align="center">
                      <FiFileText color="#718096" style={{ marginRight: '8px' }} />
                      <Box>
                        <Text fontWeight="medium">{report.reportName}</Text>
                        <Text fontSize="xs" color="gray.500">
                          {report.size} • Uploaded by: {report.uploadedBy}
                        </Text>
                      </Box>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex align="center">
                      <FiCalendar color="#718096" style={{ marginRight: '8px' }} />
                      {report.date}
                    </Flex>
                  </Td>
                  <Td>
                    <Badge variant="subtle">{report.type}</Badge>
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
                        aria-label="View"
                      />
                      <IconButton
                        icon={<FiDownload />}
                        size="sm"
                        variant="ghost"
                        aria-label="Download"
                        onClick={() => handleDownload(report.id)}
                      />
                      <IconButton
                        icon={<FiPrinter />}
                        size="sm"
                        variant="ghost"
                        aria-label="Print"
                        onClick={() => handlePrint(report.id)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Upload Modal */}
      {isOpen && (
        <Card position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)" zIndex={1000} width="500px">
          <CardBody>
            <Heading size="md" mb={4}>Upload Report</Heading>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Select Patient</FormLabel>
                <Select
                  placeholder="Select patient"
                  value={uploadData.patientId}
                  onChange={(e) => setUploadData(prev => ({ ...prev, patientId: e.target.value }))}
                >
                  <option value="PAT001">Pavan Ponnella (PAT001)</option>
                  <option value="PAT002">Emma Wilson (PAT002)</option>
                  <option value="PAT003">Robert Brown (PAT003)</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Report Type</FormLabel>
                <Select
                  placeholder="Select report type"
                  value={uploadData.reportType}
                  onChange={(e) => setUploadData(prev => ({ ...prev, reportType: e.target.value }))}
                >
                  <option value="lab">Lab Report</option>
                  <option value="imaging">Imaging</option>
                  <option value="diagnostic">Diagnostic</option>
                  <option value="prescription">Prescription</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Upload File</FormLabel>
                <Input
                  type="file"
                  p={1}
                  onChange={handleFileUpload}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
                <Text fontSize="sm" color="gray.500" mt={1}>
                  Supported formats: PDF, JPG, PNG, DOC (Max 10MB)
                </Text>
              </FormControl>

              <FormControl>
                <FormLabel>Notes</FormLabel>
                <Textarea
                  placeholder="Add any notes about the report..."
                  value={uploadData.notes}
                  onChange={(e) => setUploadData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                />
              </FormControl>

              <HStack spacing={3} justify="flex-end" pt={4}>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="brand"
                  leftIcon={<FiUpload />}
                  isLoading={isUploading}
                  loadingText="Uploading..."
                  onClick={handleUpload}
                  isDisabled={!uploadData.patientId || !uploadData.reportType || !uploadData.file}
                >
                  Upload Report
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      )}
    </Box>
  );
};

export default StaffReports;