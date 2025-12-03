import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Card,
  CardBody,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  HStack,
  Text,
  Textarea,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useToast,
} from '@chakra-ui/react';
import { FiCalendar, FiSearch, FiClock, FiUser } from 'react-icons/fi';

const StaffBookAppointment = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    appointmentType: 'consultation',
    symptoms: '',
    priority: 'normal',
  });

  const patients = [
    { id: 'PAT001', name: 'Pavan Ponnella', age: 45, gender: 'Male', phone: '+911234567890' },
    { id: 'PAT002', name: 'Emma Wilson', age: 32, gender: 'Female', phone: '+911234567891' },
    { id: 'PAT003', name: 'Robert Brown', age: 58, gender: 'Male', phone: '+911234567892' },
  ];

  const doctors = [
    { id: 'DOC001', name: 'Dr. Suman Dixit', department: 'Cardiology', availability: 'Mon-Fri, 9AM-5PM' },
    { id: 'DOC002', name: 'Dr. Syed', department: 'Neurology', availability: 'Mon-Sat, 10AM-6PM' },
    { id: 'DOC003', name: 'Dr. Ashok', department: 'Orthopedics', availability: 'Tue-Thu, 8AM-4PM' },
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: 'Appointment Booked',
        description: `Appointment scheduled successfully for ${formData.date} at ${formData.time}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Reset form
      setFormData({
        patientId: '',
        doctorId: '',
        date: '',
        time: '',
        appointmentType: 'consultation',
        symptoms: '',
        priority: 'normal',
      });
    }, 1500);
  };

  const handlePatientSelect = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    setFormData(prev => ({ ...prev, patientId }));
  };

  return (
    <Box>
      <Heading size="lg" mb={6}>Book Appointment</Heading>

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        {/* Appointment Form */}
        <GridItem>
          <Card mb={6}>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <VStack spacing={6} align="stretch">
                  {/* Patient Selection */}
                  <Box>
                    <FormLabel fontWeight="bold" mb={2}>Select Patient</FormLabel>
                    <HStack mb={4}>
                      <Input
                        placeholder="Search patient by name or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button leftIcon={<FiSearch />} variant="outline">
                        Search
                      </Button>
                    </HStack>
                    
                    <Table size="sm" variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Patient</Th>
                          <Th>Age/Gender</Th>
                          <Th>Contact</Th>
                          <Th>Action</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {patients.map((patient) => (
                          <Tr key={patient.id}>
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
                                <Box>
                                  <Text fontWeight="medium">{patient.name}</Text>
                                  <Text fontSize="xs" color="gray.500">ID: {patient.id}</Text>
                                </Box>
                              </Flex>
                            </Td>
                            <Td>
                              {patient.age} yrs • {patient.gender}
                            </Td>
                            <Td>
                              <Text fontSize="sm">{patient.phone}</Text>
                            </Td>
                            <Td>
                              <Button
                                size="sm"
                                variant={formData.patientId === patient.id ? 'solid' : 'outline'}
                                colorScheme={formData.patientId === patient.id ? 'brand' : 'gray'}
                                onClick={() => handlePatientSelect(patient.id)}
                              >
                                {formData.patientId === patient.id ? 'Selected' : 'Select'}
                              </Button>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>

                  {/* Appointment Details */}
                  <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                    <FormControl isRequired>
                      <FormLabel>Select Doctor</FormLabel>
                      <Select
                        name="doctorId"
                        value={formData.doctorId}
                        onChange={handleChange}
                        placeholder="Select doctor"
                      >
                        {doctors.map((doctor) => (
                          <option key={doctor.id} value={doctor.id}>
                            {doctor.name} - {doctor.department}
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Appointment Date</FormLabel>
                      <Input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Time Slot</FormLabel>
                      <Select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        placeholder="Select time"
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Appointment Type</FormLabel>
                      <Select
                        name="appointmentType"
                        value={formData.appointmentType}
                        onChange={handleChange}
                      >
                        <option value="consultation">Consultation</option>
                        <option value="followup">Follow-up</option>
                        <option value="emergency">Emergency</option>
                        <option value="checkup">Regular Checkup</option>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Priority</FormLabel>
                      <Select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                      >
                        <option value="normal">Normal</option>
                        <option value="urgent">Urgent</option>
                        <option value="emergency">Emergency</option>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Symptoms */}
                  <FormControl>
                    <FormLabel>Symptoms / Reason for Visit</FormLabel>
                    <Textarea
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleChange}
                      placeholder="Describe symptoms or reason for appointment"
                      rows={3}
                    />
                  </FormControl>

                  {/* Submit Button */}
                  <Flex justify="flex-end" pt={4}>
                    <Button
                      type="submit"
                      colorScheme="brand"
                      leftIcon={<FiCalendar />}
                      size="lg"
                      isLoading={loading}
                      loadingText="Booking..."
                      isDisabled={!formData.patientId}
                    >
                      Book Appointment
                    </Button>
                  </Flex>
                </VStack>
              </form>
            </CardBody>
          </Card>
        </GridItem>

        {/* Doctor Availability */}
        <GridItem>
          <Card>
            <CardBody>
              <Heading size="md" mb={4}>Doctor Availability</Heading>
              <VStack spacing={4} align="stretch">
                {doctors.map((doctor) => (
                  <Card key={doctor.id} size="sm">
                    <CardBody>
                      <VStack align="stretch" spacing={2}>
                        <Text fontWeight="medium">{doctor.name}</Text>
                        <Badge variant="subtle" alignSelf="flex-start">
                          {doctor.department}
                        </Badge>
                        <HStack spacing={1}>
                          <FiClock size={14} color="#718096" />
                          <Text fontSize="sm" color="gray.600">
                            {doctor.availability}
                          </Text>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </VStack>
            </CardBody>
          </Card>

          {/* Quick Stats */}
          <Card mt={6}>
            <CardBody>
              <Heading size="md" mb={4}>Today's Schedule</Heading>
              <VStack spacing={3} align="stretch">
                <Flex justify="space-between">
                  <Text fontSize="sm">Total Appointments</Text>
                  <Text fontWeight="bold">24</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text fontSize="sm">Completed</Text>
                  <Badge colorScheme="green">18</Badge>
                </Flex>
                <Flex justify="space-between">
                  <Text fontSize="sm">Pending</Text>
                  <Badge colorScheme="yellow">4</Badge>
                </Flex>
                <Flex justify="space-between">
                  <Text fontSize="sm">Cancelled</Text>
                  <Badge colorScheme="red">2</Badge>
                </Flex>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default StaffBookAppointment;