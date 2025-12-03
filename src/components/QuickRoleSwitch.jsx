import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Badge,
  HStack,
  Text,
  Avatar,
  VStack,
  Divider,
  Box,
} from '@chakra-ui/react';
import { FiUsers, FiLogIn } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const QuickRoleSwitch = () => {
  const { user, switchUser } = useAuth();
  
  const testUsers = [
    { phone: '+911234567890', name: 'Pavan Ponnella', role: 'patient', color: 'purple' },
    { phone: '+911234567891', name: 'Dr. Suman Dixit', role: 'doctor', color: 'blue' },
    { phone: '+911234567892', name: 'Admin User', role: 'admin', color: 'red' },
    { phone: '+911234567893', name: 'Reception Staff', role: 'staff', color: 'green' },
  ];

  if (!user) return null;

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<FiUsers />}
        variant="ghost"
        size="sm"
        aria-label="Switch Role"
        title="Quick Role Switch (Testing)"
      />
      <MenuList maxW="300px">
        <MenuItem fontWeight="bold" isDisabled>
          Quick Role Switch
        </MenuItem>
        <Text fontSize="xs" color="gray.500" px={3} py={2}>
          Switch between test accounts instantly
        </Text>
        <Divider />
        
        <VStack spacing={2} py={2} align="stretch">
          {testUsers.map((testUser) => (
            <MenuItem
              key={testUser.phone}
              onClick={() => switchUser(testUser.phone)}
              isDisabled={user.phone === testUser.phone}
            >
              <HStack spacing={3} w="full">
                <Avatar
                  size="sm"
                  name={testUser.name}
                  src={`https://ui-avatars.com/api/?name=${testUser.name}&background=${testUser.color === 'red' ? 'E53E3E' : testUser.color === 'blue' ? '3182CE' : testUser.color === 'green' ? '38A169' : '805AD5'}&color=fff`}
                />
                <VStack align="start" spacing={0} flex="1">
                  <Text fontSize="sm" fontWeight="medium">
                    {testUser.name}
                  </Text>
                  <Badge
                    colorScheme={testUser.color}
                    fontSize="0.6em"
                    variant="subtle"
                  >
                    {testUser.role}
                  </Badge>
                </VStack>
                {user.phone === testUser.phone && (
                  <Badge colorScheme="green" fontSize="0.6em">
                    Current
                  </Badge>
                )}
              </HStack>
            </MenuItem>
          ))}
        </VStack>
        
        <Divider />
        <MenuItem
          icon={<FiLogIn />}
          onClick={() => {
            localStorage.removeItem('hms_user');
            window.location.href = '/login';
          }}
        >
          Go to Login Page
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default QuickRoleSwitch;