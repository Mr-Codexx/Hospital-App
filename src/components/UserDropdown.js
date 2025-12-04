import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Text,
  Box,
  HStack,
  VStack,
  Badge,
  IconButton,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import {
  FiUser,
  FiSettings,
  FiLogOut,
  FiCalendar,
  FiBell,
  FiMessageSquare,
  FiHelpCircle,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserDropdown = () => {
  const { user, logout, requireLogin } = useAuth();
  const navigate = useNavigate();
  const menuBg = useColorModeValue('white', 'gray.800');

  if (!user) {
    return (
      <Button
        colorScheme="blue"
        size="sm"
        leftIcon={<FiUser />}
        onClick={() => requireLogin()}
      >
        Login
      </Button>
    );
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'red';
      case 'doctor': return 'blue';
      case 'staff': return 'green';
      case 'patient': return 'purple';
      default: return 'gray';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="User menu"
        icon={
          <Avatar
            size="sm"
            name={user.name}
            src={user.avatar}
            border="2px solid"
            borderColor={`${getRoleColor(user.role)}.500`}
          />
        }
        variant="ghost"
        _hover={{ bg: 'gray.100' }}
        _active={{ bg: 'gray.200' }}
      />
      <MenuList bg={menuBg} shadow="xl" borderRadius="lg" p={2}>
        <Box px={3} py={2}>
          <HStack spacing={3}>
            <Avatar
              size="md"
              name={user.name}
              src={user.avatar}
              border="2px solid"
              borderColor={`${getRoleColor(user.role)}.500`}
            />
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold" fontSize="sm">
                {user.name}
              </Text>
              <Badge
                colorScheme={getRoleColor(user.role)}
                fontSize="xs"
                textTransform="uppercase"
              >
                {user.role}
              </Badge>
              <Text fontSize="xs" color="gray.500">
                {user.email || user.phone}
              </Text>
            </VStack>
          </HStack>
        </Box>

        <MenuDivider />

        <MenuItem icon={<FiUser />} onClick={() => navigate('/profile')}>
          My Profile
        </MenuItem>
        <MenuItem icon={<FiCalendar />} onClick={() => navigate('/appointments')}>
          My Appointments
        </MenuItem>
        <MenuItem icon={<FiBell />} onClick={() => navigate('/notifications')}>
          Notifications
          <Badge ml={2} colorScheme="red" fontSize="xs">
            3
          </Badge>
        </MenuItem>
        <MenuItem icon={<FiMessageSquare />} onClick={() => navigate('/messages')}>
          Messages
        </MenuItem>

        <MenuDivider />

        <MenuItem icon={<FiSettings />} onClick={() => navigate('/settings')}>
          Settings
        </MenuItem>
        <MenuItem icon={<FiHelpCircle />} onClick={() => navigate('/help')}>
          Help & Support
        </MenuItem>

        <MenuDivider />

        <MenuItem
          icon={<FiLogOut />}
          onClick={handleLogout}
          color="red.500"
          _hover={{ bg: 'red.50' }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserDropdown;