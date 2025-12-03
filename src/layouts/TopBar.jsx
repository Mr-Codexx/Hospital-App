import React from 'react';
import {
  Flex,
  HStack,
  Avatar,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
  Badge,
  Box,
  useColorMode,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import {
  FiBell,
  FiSettings,
  FiLogOut,
  FiSun,
  FiMoon,
  FiUser,
  FiHelpCircle,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const TopBar = () => {
  const { user, logout } = useAuth();
  const { showInfo } = useNotification();
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleLogout = () => {
    logout();
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: 'red',
      doctor: 'blue',
      staff: 'green',
      patient: 'purple',
    };
    return colors[role] || 'gray';
  };

  const notifications = [
    { id: 1, message: 'New appointment scheduled for tomorrow', time: '2 min ago', read: false },
    { id: 2, message: 'Lab report ready for review', time: '1 hour ago', read: false },
    { id: 3, message: 'System maintenance scheduled', time: '2 hours ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Flex
      position="sticky"
      top={0}
      zIndex={1000}
      h="60px"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      px={4}
      align="center"
      justify="space-between"
    >
      {/* Left side - Hospital Name */}
      <Box>
        <Text fontSize="xl" fontWeight="bold" color="brand.500">
          MediCare Pro
        </Text>
      </Box>

      {/* Right side - User controls */}
      <HStack spacing={4}>
        {/* Theme Toggle */}
        <Tooltip label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}>
          <IconButton
            icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
            variant="ghost"
            aria-label="Toggle theme"
            size="sm"
          />
        </Tooltip>

        {/* Notifications */}
        <Menu>
          <MenuButton
            as={IconButton}
            icon={
              <Box position="relative">
                <FiBell />
                {unreadCount > 0 && (
                  <Badge
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    colorScheme="red"
                    borderRadius="full"
                    fontSize="0.6em"
                    minW="4"
                    h="4"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Box>
            }
            variant="ghost"
            aria-label="Notifications"
            size="sm"
          />
          <MenuList maxW="300px">
            <MenuItem fontWeight="bold" isDisabled>
              Notifications
            </MenuItem>
            <MenuDivider />
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <MenuItem
                  key={notification.id}
                  py={2}
                  _hover={{ bg: 'gray.50' }}
                  onClick={() => showInfo('Notification', notification.message)}
                >
                  <Box>
                    <Text fontSize="sm">{notification.message}</Text>
                    <Text fontSize="xs" color="gray.500">
                      {notification.time}
                    </Text>
                  </Box>
                </MenuItem>
              ))
            ) : (
              <MenuItem isDisabled>
                <Text fontSize="sm" color="gray.500">
                  No notifications
                </Text>
              </MenuItem>
            )}
            <MenuDivider />
            <MenuItem fontSize="sm" textAlign="center">
              View all notifications
            </MenuItem>
          </MenuList>
        </Menu>

        {/* Help */}
        <Tooltip label="Help & Support">
          <IconButton
            icon={<FiHelpCircle />}
            variant="ghost"
            aria-label="Help"
            size="sm"
            onClick={() => showInfo('Help', 'Contact support at support@medicare.com')}
          />
        </Tooltip>

        {/* User Menu */}
        <Menu>
          <MenuButton>
            <HStack spacing={3} cursor="pointer" _hover={{ opacity: 0.8 }}>
              <Avatar
                size="sm"
                name={user?.name}
                src={`https://ui-avatars.com/api/?name=${user?.name}&background=3182CE&color=fff`}
              />
              <Box textAlign="left" display={{ base: 'none', md: 'block' }}>
                <Text fontSize="sm" fontWeight="medium">
                  {user?.name}
                </Text>
                <Badge
                  colorScheme={getRoleBadgeColor(user?.role)}
                  fontSize="0.6em"
                  variant="subtle"
                >
                  {user?.role}
                </Badge>
              </Box>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem icon={<FiUser />}>
              My Profile
            </MenuItem>
            <MenuItem icon={<FiSettings />}>
              Settings
            </MenuItem>
            <MenuDivider />
            <MenuItem
              icon={<FiLogOut />}
              color="red.500"
              onClick={handleLogout}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default TopBar;