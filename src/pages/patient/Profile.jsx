import React, { useState } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Card,
  CardBody,
  Avatar,
  Text,
  VStack,
  HStack,
  Badge,
  Divider,
  Select,
  useToast,
} from '@chakra-ui/react';
import { FiSave, FiEdit2, FiUser, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const PatientProfile = () => {
  const { user, updateProfile } = useAuth();
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.age || '',
    gender: user?.gender || 'Male',
    bloodType: user?.bloodType || 'Unknown',
    address: user?.address || '',
    phone: user?.phone || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
      toast({
        title: 'Profile updated',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error updating profile',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">My Profile</Heading>
        <Button
          leftIcon={isEditing ? <FiSave /> : <FiEdit2 />}
          colorScheme={isEditing ? 'green' : 'brand'}
          onClick={isEditing ? handleSubmit : () => setIsEditing(true)}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </Flex>

      <Grid templateColumns={{ base: '1fr', lg: '1fr 2fr' }} gap={6}>
        {/* Left Column - Profile Card */}
        <GridItem>
          <Card>
            <CardBody>
              <VStack spacing={4} align="center">
                <Avatar
                  size="xl"
                  name={user?.name}
                  src={`https://ui-avatars.com/api/?name=${user?.name}&background=3182CE&color=fff`}
                />
                <VStack spacing={2}>
                  <Heading size="md">{user?.name}</Heading>
                  <Badge colorScheme="brand" fontSize="sm">
                    {user?.role}
                  </Badge>
                </VStack>
                
                <Divider />
                
                <VStack spacing={3} align="stretch" w="full">
                  <HStack>
                    <FiUser color="#718096" />
                    <Text fontSize="sm" color="gray.600">
                      Patient ID: {user?.id}
                    </Text>
                  </HStack>
                  <HStack>
                    <FiPhone color="#718096" />
                    <Text fontSize="sm" color="gray.600">
                      {user?.phone}
                    </Text>
                  </HStack>
                  <HStack>
                    <FiMail color="#718096" />
                    <Text fontSize="sm" color="gray.600">
                      {user?.email || 'No email provided'}
                    </Text>
                  </HStack>
                  <HStack>
                    <FiMapPin color="#718096" />
                    <Text fontSize="sm" color="gray.600">
                      {user?.address || 'No address provided'}
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        {/* Right Column - Edit Form */}
        <GridItem>
          <Card>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                  <FormControl>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      isDisabled={!isEditing}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      isDisabled={!isEditing}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Age</FormLabel>
                    <Input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      isDisabled={!isEditing}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      isDisabled={!isEditing}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Blood Type</FormLabel>
                    <Select
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleChange}
                      isDisabled={!isEditing}
                    >
                      <option value="Unknown">Unknown</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      isDisabled={!isEditing}
                    />
                  </FormControl>

                  <FormControl gridColumn={{ md: 'span 2' }}>
                    <FormLabel>Address</FormLabel>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      isDisabled={!isEditing}
                    />
                  </FormControl>
                </Grid>
              </form>
            </CardBody>
          </Card>

          {/* Emergency Contacts */}
          <Card mt={6}>
            <CardBody>
              <Heading size="md" mb={4}>Emergency Contacts</Heading>
              <Text color="gray.600" fontSize="sm" mb={4}>
                Add emergency contacts for quick access during medical emergencies
              </Text>
              <Button size="sm" colorScheme="red" variant="outline">
                Add Emergency Contact
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default PatientProfile;