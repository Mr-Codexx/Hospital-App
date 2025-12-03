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
  useDisclosure,
  Grid,
  GridItem,
  VStack,
  Icon,
} from '@chakra-ui/react';
import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiUser,
  FiUserCheck,
  FiUserX,
  FiMail,
  FiPhone,
  FiMoreVertical
} from 'react-icons/fi';
import { useNotification } from '../../context/NotificationContext';

const AdminUsers = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { confirmDialog } = useNotification();
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    {
      id: 'ADM001',
      name: 'Admin User',
      email: 'admin@hospital.com',
      phone: '+911234567890',
      role: 'admin',
      department: 'Administration',
      status: 'active',
      joinDate: '2024-01-01',
    },
    {
      id: 'DOC001',
      name: 'Dr. Suman Dixit',
      email: 'suman@hospital.com',
      phone: '+911234567891',
      role: 'doctor',
      department: 'Cardiology',
      status: 'active',
      joinDate: '2024-01-01',
    },
    {
      id: 'DOC002',
      name: 'Dr. Syed',
      email: 'drsyed@hospital.com',
      phone: '+911234567892',
      role: 'doctor',
      department: 'Neurology',
      status: 'active',
      joinDate: '2024-01-05',
    },
    {
      id: 'STA001',
      name: 'Reception Staff',
      email: 'staff@hospital.com',
      phone: '+911234567893',
      role: 'staff',
      department: 'Reception',
      status: 'active',
      joinDate: '2024-01-10',
    },
    {
      id: 'PAT001',
      name: 'Pavan Ponnella',
      email: 'john@email.com',
      phone: '+911234567894',
      role: 'patient',
      department: null,
      status: 'active',
      joinDate: '2024-01-15',
    },
    {
      id: 'PAT002',
      name: 'Emma Wilson',
      email: 'emma@email.com',
      phone: '+911234567895',
      role: 'patient',
      department: null,
      status: 'inactive',
      joinDate: '2024-01-08',
    },
  ];

  const getRoleColor = (role) => {
    const colors = {
      admin: 'red',
      doctor: 'blue',
      staff: 'green',
      patient: 'purple',
    };
    return colors[role] || 'gray';
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'green',
      inactive: 'gray',
      suspended: 'red',
    };
    return colors[status] || 'gray';
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.phone.includes(searchQuery);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDeleteUser = async (userId) => {
    const confirmed = await confirmDialog(
      'Delete User',
      'Are you sure you want to delete this user? This action cannot be undone.',
      'Delete User'
    );
    if (confirmed) {
      // Handle delete logic
      console.log('Delete user:', userId);
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    const action = currentStatus === 'active' ? 'deactivate' : 'activate';
    const confirmed = await confirmDialog(
      `${action.charAt(0).toUpperCase() + action.slice(1)} User`,
      `Are you sure you want to ${action} this user?`,
      `Yes, ${action}`
    );
    if (confirmed) {
      // Handle toggle status logic
      console.log(`${action} user:`, userId);
    }
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">User Management</Heading>
        <Button leftIcon={<FiPlus />} colorScheme="brand" onClick={onOpen}>
          Add New User
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
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            
            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              width="150px"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="staff">Staff</option>
              <option value="patient">Patient</option>
            </Select>
            
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              width="150px"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </Select>
          </HStack>
        </CardBody>
      </Card>

      {/* Stats */}
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' }} gap={4} mb={6}>
        {[
          { label: 'Total Users', value: '156', color: 'blue', icon: FiUser },
          { label: 'Doctors', value: '24', color: 'green', icon: FiUserCheck },
          { label: 'Patients', value: '120', color: 'purple', icon: FiUser },
          { label: 'Active Users', value: '148', color: 'teal', icon: FiUserCheck },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardBody>
              <Flex align="center" justify="space-between">
                <Box>
                  <Text fontSize="sm" color="gray.600">{stat.label}</Text>
                  <Text fontSize="2xl" fontWeight="bold">{stat.value}</Text>
                </Box>
                <Icon as={stat.icon} w={8} h={8} color={`${stat.color}.500`} />
              </Flex>
            </CardBody>
          </Card>
        ))}
      </Grid>

      {/* Users Table */}
      <Card>
        <CardBody>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>User</Th>
                <Th>Contact</Th>
                <Th>Role</Th>
                <Th>Department</Th>
                <Th>Status</Th>
                <Th>Join Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredUsers.map((user) => (
                <Tr key={user.id}>
                  <Td>
                    <Flex align="center">
                      <Avatar
                        size="sm"
                        name={user.name}
                        src={`https://ui-avatars.com/api/?name=${user.name}&background=3182CE&color=fff`}
                        mr={3}
                      />
                      <Box>
                        <Text fontWeight="medium">{user.name}</Text>
                        <Text fontSize="xs" color="gray.500">
                          ID: {user.id}
                        </Text>
                      </Box>
                    </Flex>
                  </Td>
                  <Td>
                    <VStack align="start" spacing={1}>
                      <HStack spacing={1}>
                        <Icon as={FiMail} color="gray.400" boxSize={3} />
                        <Text fontSize="xs">{user.email}</Text>
                      </HStack>
                      <HStack spacing={1}>
                        <Icon as={FiPhone} color="gray.400" boxSize={3} />
                        <Text fontSize="xs">{user.phone}</Text>
                      </HStack>
                    </VStack>
                  </Td>
                  <Td>
                    <Badge colorScheme={getRoleColor(user.role)}>
                      {user.role}
                    </Badge>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{user.department || 'N/A'}</Text>
                  </Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{user.joinDate}</Text>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <IconButton
                        icon={<FiEdit2 />}
                        size="sm"
                        variant="ghost"
                        aria-label="Edit"
                      />
                      <IconButton
                        icon={user.status === 'active' ? <FiUserX /> : <FiUserCheck />}
                        size="sm"
                        variant="ghost"
                        aria-label="Toggle Status"
                        color={user.status === 'active' ? 'red.500' : 'green.500'}
                        onClick={() => handleToggleStatus(user.id, user.status)}
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
                            Edit User
                          </MenuItem>
                          <MenuItem icon={<FiMail />}>
                            Send Email
                          </MenuItem>
                          <MenuItem
                            icon={<FiTrash2 />}
                            color="red.500"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Delete User
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

export default AdminUsers;