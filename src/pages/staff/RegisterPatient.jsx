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
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { FiSave, FiUserPlus } from 'react-icons/fi';

const StaffRegisterPatient = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'Male',
    dateOfBirth: '',
    age: '',
    phone: '',
    email: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    bloodType: '',
    allergies: '',
    medicalHistory: '',
    occupation: '',
  });

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
        title: 'Patient Registered',
        description: `${formData.firstName} ${formData.lastName} has been successfully registered.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        gender: 'Male',
        dateOfBirth: '',
        age: '',
        phone: '',
        email: '',
        address: '',
        emergencyContact: '',
        emergencyPhone: '',
        bloodType: '',
        allergies: '',
        medicalHistory: '',
        occupation: '',
      });
    }, 1500);
  };

  return (
    <Box>
      <Heading size="lg" mb={6}>Register New Patient</Heading>

      <Card mb={6}>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              {/* Personal Information */}
              <Box>
                <Heading size="md" mb={4}>Personal Information</Heading>
                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                  <FormControl isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Age</FormLabel>
                    <Input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Auto-calculated from DOB"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Blood Type</FormLabel>
                    <Select
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleChange}
                    >
                      <option value="">Select blood type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="Unknown">Unknown</option>
                    </Select>
                  </FormControl>
                </Grid>
              </Box>

              {/* Contact Information */}
              <Box>
                <Heading size="md" mb={4}>Contact Information</Heading>
                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                  <FormControl isRequired>
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                    />
                  </FormControl>

                  <FormControl gridColumn={{ md: 'span 2' }}>
                    <FormLabel>Address</FormLabel>
                    <Textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter full address"
                      rows={3}
                    />
                  </FormControl>
                </Grid>
              </Box>

              {/* Emergency Contact */}
              <Box>
                <Heading size="md" mb={4}>Emergency Contact</Heading>
                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                  <FormControl>
                    <FormLabel>Emergency Contact Name</FormLabel>
                    <Input
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      placeholder="Enter contact name"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Emergency Phone</FormLabel>
                    <Input
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleChange}
                      placeholder="Enter emergency phone"
                    />
                  </FormControl>
                </Grid>
              </Box>

              {/* Medical Information */}
              <Box>
                <Heading size="md" mb={4}>Medical Information</Heading>
                <Grid templateColumns={{ base: '1fr' }} gap={4}>
                  <FormControl>
                    <FormLabel>Allergies</FormLabel>
                    <Textarea
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleChange}
                      placeholder="List any known allergies (separate by commas)"
                      rows={2}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Medical History</FormLabel>
                    <Textarea
                      name="medicalHistory"
                      value={formData.medicalHistory}
                      onChange={handleChange}
                      placeholder="Brief medical history, previous conditions, surgeries, etc."
                      rows={3}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Occupation</FormLabel>
                    <Input
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      placeholder="Enter occupation"
                    />
                  </FormControl>
                </Grid>
              </Box>

              {/* Submit Button */}
              <Flex justify="flex-end" pt={4}>
                <Button
                  type="submit"
                  colorScheme="brand"
                  leftIcon={<FiSave />}
                  size="lg"
                  isLoading={loading}
                  loadingText="Registering..."
                >
                  Register Patient
                </Button>
              </Flex>
            </VStack>
          </form>
        </CardBody>
      </Card>

      {/* Recent Registrations */}
      <Card>
        <CardBody>
          <Heading size="md" mb={4}>Recent Registrations</Heading>
          <Text color="gray.600" fontSize="sm">
            Newly registered patients will appear here. You can view and edit their profiles from the patient management section.
          </Text>
        </CardBody>
      </Card>
    </Box>
  );
};

export default StaffRegisterPatient;