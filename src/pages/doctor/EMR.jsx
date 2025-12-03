import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Card,
  CardBody,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  HStack,
  Text,
  Badge,
  Avatar,
  Button,
  Textarea,
  Input,
  FormControl,
  FormLabel,
  Select,
  Grid,
  GridItem,
  Divider,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import {
  FiUser,
  FiCalendar,
  FiFileText,
  FiActivity,
  FiDownload,
  FiPrinter,
  FiPlus,
  FiEdit2,
} from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { CiPill } from "react-icons/ci";

const DoctorEMR = () => {
  const { patientId } = useParams();
  const [prescription, setPrescription] = useState('');
  const [newNote, setNewNote] = useState('');

  // Mock patient data
  const patient = {
    id: patientId,
    name: 'Pavan Ponnella',
    age: 45,
    gender: 'Male',
    bloodType: 'O+',
    height: '175 cm',
    weight: '80 kg',
    bmi: '26.1',
    allergies: 'Penicillin, Peanuts',
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    lastVisit: 'Jan 10, 2024',
    nextAppointment: 'Jan 20, 2024',
  };

  const vitals = [
    { name: 'Blood Pressure', value: '130/85', unit: 'mmHg', status: 'High' },
    { name: 'Heart Rate', value: '72', unit: 'bpm', status: 'Normal' },
    { name: 'Temperature', value: '98.6', unit: '°F', status: 'Normal' },
    { name: 'Blood Sugar', value: '145', unit: 'mg/dL', status: 'High' },
    { name: 'SpO2', value: '98', unit: '%', status: 'Normal' },
  ];

  const medicalHistory = [
    { date: 'Jan 10, 2024', diagnosis: 'Hypertension', doctor: 'Dr. Suman Dixit' },
    { date: 'Dec 15, 2023', diagnosis: 'Type 2 Diabetes', doctor: 'Dr. Syed' },
    { date: 'Nov 5, 2023', diagnosis: 'High Cholesterol', doctor: 'Dr. Suman Dixit' },
  ];

  const currentMedications = [
    { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', startDate: 'Jan 10, 2024' },
    { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: 'Dec 15, 2023' },
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: 'Jan 10, 2024' },
  ];

  const labResults = [
    { test: 'Complete Blood Count', date: 'Jan 10, 2024', status: 'Normal' },
    { test: 'Lipid Profile', date: 'Jan 10, 2024', status: 'High Cholesterol' },
    { test: 'HbA1c', date: 'Jan 10, 2024', value: '7.2%', status: 'High' },
  ];

  const notes = [
    { date: 'Jan 10, 2024', text: 'Patient complains of occasional headaches. BP slightly elevated. Adjust medication dosage.', doctor: 'Dr. Suman Dixit' },
    { date: 'Dec 15, 2023', text: 'New diagnosis of Type 2 Diabetes. Started Metformin. Advised diet and exercise.', doctor: 'Dr. Syed' },
  ];

  const handleAddPrescription = () => {
    // Handle prescription logic
    console.log('Add prescription:', prescription);
    setPrescription('');
  };

  const handleAddNote = () => {
    // Handle note logic
    console.log('Add note:', newNote);
    setNewNote('');
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Electronic Medical Record</Heading>
        <HStack spacing={3}>
          <Button leftIcon={<FiDownload />} variant="outline">
            Export EMR
          </Button>
          <Button leftIcon={<FiPrinter />} variant="outline">
            Print
          </Button>
        </HStack>
      </Flex>

      {/* Patient Info Card */}
      <Card mb={6}>
        <CardBody>
          <Grid templateColumns={{ base: '1fr', md: 'auto 1fr auto' }} gap={6} alignItems="center">
            <Avatar
              size="xl"
              name={patient.name}
              src={`https://ui-avatars.com/api/?name=${patient.name}&background=3182CE&color=fff`}
            />
            
            <Box>
              <HStack spacing={4} mb={2}>
                <Heading size="md">{patient.name}</Heading>
                <Badge colorScheme="brand">{patient.id}</Badge>
              </HStack>
              
              <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
                <Box>
                  <Text fontSize="sm" color="gray.600">Age / Gender</Text>
                  <Text fontWeight="medium">{patient.age} yrs • {patient.gender}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.600">Blood Type</Text>
                  <Badge colorScheme="red">{patient.bloodType}</Badge>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.600">Height / Weight</Text>
                  <Text fontWeight="medium">{patient.height} • {patient.weight} kg</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.600">BMI</Text>
                  <Text fontWeight="medium" color={patient.bmi > 25 ? 'red.500' : 'green.500'}>
                    {patient.bmi}
                  </Text>
                </Box>
              </Grid>
              
              <HStack spacing={4} mt={4}>
                <Box>
                  <Text fontSize="sm" color="gray.600">Allergies</Text>
                  <Text fontSize="sm">{patient.allergies}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.600">Conditions</Text>
                  <HStack spacing={2}>
                    {patient.conditions.map((condition, index) => (
                      <Badge key={index} colorScheme="blue" variant="subtle">
                        {condition}
                      </Badge>
                    ))}
                  </HStack>
                </Box>
              </HStack>
            </Box>
            
            <VStack align="stretch" spacing={3}>
              <Box>
                <Text fontSize="sm" color="gray.600">Last Visit</Text>
                <Text fontWeight="medium">{patient.lastVisit}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.600">Next Appointment</Text>
                <Badge colorScheme="green">{patient.nextAppointment}</Badge>
              </Box>
            </VStack>
          </Grid>
        </CardBody>
      </Card>

      {/* Tabs for different sections */}
      <Tabs colorScheme="brand">
        <TabList>
          <Tab>Vitals</Tab>
          <Tab>Medical History</Tab>
          <Tab>Medications</Tab>
          <Tab>Lab Results</Tab>
          <Tab>Clinical Notes</Tab>
          <Tab>Add Prescription</Tab>
        </TabList>

        <TabPanels>
          {/* Vitals Tab */}
          <TabPanel p={0} pt={4}>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4}>
              {vitals.map((vital, index) => (
                <Card key={index}>
                  <CardBody>
                    <VStack align="stretch" spacing={2}>
                      <Text fontSize="sm" color="gray.600">{vital.name}</Text>
                      <HStack justify="space-between">
                        <Text fontSize="xl" fontWeight="bold">
                          {vital.value} <Text as="span" fontSize="sm" color="gray.500">{vital.unit}</Text>
                        </Text>
                        <Badge colorScheme={vital.status === 'Normal' ? 'green' : 'red'}>
                          {vital.status}
                        </Badge>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </Grid>
          </TabPanel>

          {/* Medical History Tab */}
          <TabPanel p={0} pt={4}>
            <Card>
              <CardBody>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Date</Th>
                      <Th>Diagnosis</Th>
                      <Th>Doctor</Th>
                      <Th>Notes</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {medicalHistory.map((record, index) => (
                      <Tr key={index}>
                        <Td>{record.date}</Td>
                        <Td>
                          <Badge colorScheme="blue">{record.diagnosis}</Badge>
                        </Td>
                        <Td>{record.doctor}</Td>
                        <Td>
                          <Button size="xs" variant="outline">
                            View Details
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </TabPanel>

          {/* Medications Tab */}
          <TabPanel p={0} pt={4}>
            <Card>
              <CardBody>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Medication</Th>
                      <Th>Dosage</Th>
                      <Th>Frequency</Th>
                      <Th>Start Date</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {currentMedications.map((med, index) => (
                      <Tr key={index}>
                        <Td>
                          <Flex align="center">
                            <Icon as={CiPill} mr={2} color="blue.500" />
                            {med.name}
                          </Flex>
                        </Td>
                        <Td>{med.dosage}</Td>
                        <Td>{med.frequency}</Td>
                        <Td>{med.startDate}</Td>
                        <Td>
                          <Badge colorScheme="green">Active</Badge>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </TabPanel>

          {/* Lab Results Tab */}
          <TabPanel p={0} pt={4}>
            <Card>
              <CardBody>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Test Name</Th>
                      <Th>Date</Th>
                      <Th>Result</Th>
                      <Th>Status</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {labResults.map((test, index) => (
                      <Tr key={index}>
                        <Td>{test.test}</Td>
                        <Td>{test.date}</Td>
                        <Td>{test.value || 'See report'}</Td>
                        <Td>
                          <Badge colorScheme={test.status === 'Normal' ? 'green' : 'red'}>
                            {test.status}
                          </Badge>
                        </Td>
                        <Td>
                          <Button size="xs" variant="outline">
                            View Report
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </TabPanel>

          {/* Clinical Notes Tab */}
          <TabPanel p={0} pt={4}>
            <VStack spacing={4} align="stretch">
              {notes.map((note, index) => (
                <Card key={index}>
                  <CardBody>
                    <VStack align="stretch" spacing={3}>
                      <HStack justify="space-between">
                        <Text fontWeight="medium">{note.doctor}</Text>
                        <Text fontSize="sm" color="gray.600">{note.date}</Text>
                      </HStack>
                      <Text>{note.text}</Text>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
              
              <Card>
                <CardBody>
                  <FormControl>
                    <FormLabel>Add Clinical Note</FormLabel>
                    <Textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Enter clinical notes..."
                      rows={4}
                    />
                  </FormControl>
                  <Button
                    mt={3}
                    leftIcon={<FiPlus />}
                    colorScheme="brand"
                    onClick={handleAddNote}
                  >
                    Add Note
                  </Button>
                </CardBody>
              </Card>
            </VStack>
          </TabPanel>

          {/* Add Prescription Tab */}
          <TabPanel p={0} pt={4}>
            <Card>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                    <FormControl>
                      <FormLabel>Medication Name</FormLabel>
                      <Input placeholder="Enter medication name" />
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Dosage</FormLabel>
                      <Input placeholder="e.g., 500mg" />
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Frequency</FormLabel>
                      <Select>
                        <option>Once daily</option>
                        <option>Twice daily</option>
                        <option>Three times daily</option>
                        <option>Four times daily</option>
                        <option>As needed</option>
                      </Select>
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Duration</FormLabel>
                      <Input placeholder="e.g., 7 days" />
                    </FormControl>
                  </Grid>
                  
                  <FormControl>
                    <FormLabel>Instructions</FormLabel>
                    <Textarea
                      value={prescription}
                      onChange={(e) => setPrescription(e.target.value)}
                      placeholder="Enter prescription instructions..."
                      rows={4}
                    />
                  </FormControl>
                  
                  <Button
                    leftIcon={<FiPlus />}
                    colorScheme="brand"
                    onClick={handleAddPrescription}
                  >
                    Add Prescription
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default DoctorEMR;