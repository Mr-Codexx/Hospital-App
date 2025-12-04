import React, { useState, useEffect } from 'react';
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
  Input,
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
  useToast,
  VStack,
  Divider,
  Progress,
  Button,
  SimpleGrid,
  Switch,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FiBell,
  FiSettings,
  FiLogOut,
  FiSun,
  FiMoon,
  FiUser,
  FiHelpCircle,
  FiSearch,
  FiHome,
  FiCalendar,
  FiMessageSquare,
  FiShield,
  FiGlobe,
  FiDownload,
  FiUpload,
  FiRefreshCw,
  FiEye,
  FiEyeOff,
  FiLock,
  FiUnlock,
  FiCheck,
  FiX,
  FiPlus,
  FiFilter,
  FiStar,
  FiActivity,
  FiTrendingUp,
  FiBarChart2,
  FiCreditCard,
  FiShoppingCart,
  FiPackage,
  FiTruck,
  FiBook,
  FiVideo,
  FiHeadphones,
  FiShare2,
  FiCopy,
  FiEdit,
  FiTrash2,
  FiSave,
  FiPrinter,
} from 'react-icons/fi';
import {
  MdHealthAndSafety,
  MdDashboard,
  MdLocalHospital,
  MdEmergency,
  MdAccessTime,
  MdVerifiedUser,
  MdNotifications,
  MdLanguage,
  MdPayment,
  MdConfirmationNumber,
  MdSchool,
  MdWork,
  MdLocationOn,
} from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import { useHospitalDataContext } from '../context/HospitalDataContext';

const TopBar = () => {
  const { user, logout } = useAuth();
  const { getNotifications, getTodaysAppointments } = useHospitalDataContext();
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const { isOpen: isNotificationsOpen, onOpen: onNotificationsOpen, onClose: onNotificationsClose } = useDisclosure();
  const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure();
  
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false });
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.700');
  
  const [notifications, setNotifications] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [systemStatus, setSystemStatus] = useState({
    online: true,
    maintenance: false,
    load: 45,
    uptime: '99.8%',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const notifs = getNotifications?.() || [];
        const appointments = getTodaysAppointments?.() || [];
        
        const unread = notifs.filter(n => !n.read);
        setNotifications(notifs.slice(0, 10));
        setUnreadCount(unread.length);
        setTodayAppointments(appointments.length);
      } catch (error) {
        console.error('Error loading topbar data:', error);
      }
    };
    
    loadData();
    const interval = setInterval(loadData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [getNotifications, getTodaysAppointments]);

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out',
      status: 'info',
      duration: 3000,
    });
  };

  const handleNotificationClick = (notification) => {
    toast({
      title: notification.title || 'Notification',
      description: notification.message,
      status: 'info',
      duration: 3000,
    });
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
    toast({
      title: 'Marked as Read',
      description: 'All notifications marked as read',
      status: 'success',
      duration: 2000,
    });
  };

  const handleClearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
    toast({
      title: 'Cleared',
      description: 'All notifications cleared',
      status: 'success',
      duration: 2000,
    });
  };

  const quickActions = [
    { icon: FiHome, label: 'Dashboard', path: '/', color: 'blue' },
    { icon: FiCalendar, label: 'Book Appointment', path: '/book-appointment', color: 'green' },
    { icon: FiUser, label: 'Doctors', path: '/doctors', color: 'purple' },
    { icon: MdLocalHospital, label: 'Departments', path: '/departments', color: 'orange' },
    { icon: FiActivity, label: 'Activity', path: '/activity', color: 'teal' },
  ];

  const systemStats = [
    { label: 'CPU Usage', value: '45%', color: 'green' },
    { label: 'Memory', value: '68%', color: 'blue' },
    { label: 'Storage', value: '82%', color: 'orange' },
    { label: 'Network', value: '1.2 Gbps', color: 'purple' },
  ];

  if (isMobile) return null;

  return (
    <>
      <Flex
        position="sticky"
        top="0"
        zIndex="1000"
        h="16"
        bg={bgColor}
        borderBottom="1px solid"
        borderColor={borderColor}
        px={6}
        align="center"
        justify="space-between"
        backdropFilter="blur(10px)"
        _dark={{ bg: 'rgba(26, 32, 44, 0.8)' }}
        _light={{ bg: 'rgba(255, 255, 255, 0.8)' }}
      >
        {/* Left Section */}
        <HStack spacing={6} flex={1}>
          {/* Search */}
          <InputGroup maxW="400px" size="sm">
            <InputLeftElement>
              <FiSearch color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search patients, doctors, reports, appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              borderRadius="lg"
            />
            {searchQuery && (
              <Button
                position="absolute"
                right="1"
                top="1"
                size="xs"
                onClick={() => setSearchQuery('')}
              >
                Clear
              </Button>
            )}
          </InputGroup>

          {/* Quick Actions */}
          <HStack spacing={2} display={{ base: 'none', lg: 'flex' }}>
            {quickActions.slice(0, 3).map((action, idx) => (
              <Tooltip key={idx} label={action.label}>
                <Button
                  leftIcon={<action.icon />}
                  size="xs"
                  colorScheme={action.color}
                  variant="ghost"
                  onClick={() => window.location.href = action.path}
                >
                  {action.label}
                </Button>
              </Tooltip>
            ))}
          </HStack>
        </HStack>

        {/* Right Section */}
        <HStack spacing={4}>
          {/* System Status */}
          <Tooltip label={`System Status: ${systemStatus.online ? 'Online' : 'Offline'} (Uptime: ${systemStatus.uptime})`}>
            <Box position="relative">
              <Box
                w="8px"
                h="8px"
                borderRadius="full"
                bg={systemStatus.online ? 'green.500' : 'red.500'}
                animation={systemStatus.online ? 'pulse 2s infinite' : 'none'}
              />
            </Box>
          </Tooltip>

          {/* Theme Toggle */}
          <Tooltip label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}>
            <IconButton
              icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
              aria-label="Toggle theme"
            />
          </Tooltip>

          {/* Notifications Button */}
          <Menu>
            <MenuButton
              as={IconButton}
              variant="ghost"
              size="sm"
              aria-label="Notifications"
              position="relative"
            >
              <FiBell />
              {unreadCount > 0 && (
                <Badge
                  position="absolute"
                  top="0"
                  right="0"
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
            </MenuButton>
            <MenuList maxW="400px" p={0}>
              <Box p={3} borderBottom="1px" borderColor="gray.200">
                <Flex justify="space-between" align="center">
                  <Text fontWeight="bold">Notifications ({unreadCount})</Text>
                  <HStack spacing={2}>
                    <Button size="xs" onClick={handleMarkAllAsRead}>
                      Mark All Read
                    </Button>
                    <Button size="xs" variant="ghost" onClick={handleClearAll}>
                      Clear All
                    </Button>
                  </HStack>
                </Flex>
              </Box>
              <Box maxH="400px" overflowY="auto">
                {notifications.length > 0 ? (
                  notifications.map((notification, idx) => (
                    <MenuItem
                      key={idx}
                      py={3}
                      px={4}
                      borderBottom="1px"
                      borderColor="gray.100"
                      _last={{ borderBottom: 'none' }}
                      onClick={() => handleNotificationClick(notification)}
                      bg={!notification.read ? 'blue.50' : 'transparent'}
                      _dark={{ bg: !notification.read ? 'blue.900' : 'transparent' }}
                    >
                      <VStack align="start" spacing={1} w="100%">
                        <HStack justify="space-between" w="100%">
                          <Text fontWeight="medium" fontSize="sm">
                            {notification.title || 'Notification'}
                          </Text>
                          {!notification.read && (
                            <Box w="2" h="2" bg="blue.500" borderRadius="full" />
                          )}
                        </HStack>
                        <Text fontSize="xs" color="gray.600" noOfLines={2}>
                          {notification.message}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {notification.time || 'Just now'}
                        </Text>
                      </VStack>
                    </MenuItem>
                  ))
                ) : (
                  <Box p={6} textAlign="center">
                    <FiBell size={24} color="gray.400" />
                    <Text mt={2} color="gray.500">No notifications</Text>
                  </Box>
                )}
              </Box>
              <Box p={3} borderTop="1px" borderColor="gray.200">
                <Button
                  size="sm"
                  w="100%"
                  onClick={onNotificationsOpen}
                  variant="outline"
                >
                  View All Notifications
                </Button>
              </Box>
            </MenuList>
          </Menu>

          {/* Help */}
          <Tooltip label="Help & Support">
            <IconButton
              icon={<FiHelpCircle />}
              variant="ghost"
              size="sm"
              onClick={() => {
                toast({
                  title: 'Help & Support',
                  description: 'Contact support at support@medicarepro.com or call +1 (555) 123-4567',
                  status: 'info',
                  duration: 5000,
                });
              }}
            />
          </Tooltip>

          {/* User Menu */}
          <Menu>
            <MenuButton>
              <HStack spacing={2} cursor="pointer">
                <Avatar
                  size="sm"
                  name={user?.name}
                  src={`https://ui-avatars.com/api/?name=${user?.name}&background=3182CE&color=fff`}
                  border="2px solid"
                  borderColor="brand.500"
                />
                <Box display={{ base: 'none', lg: 'block' }}>
                  <Text fontSize="sm" fontWeight="medium">{user?.name}</Text>
                  <Badge
                    colorScheme="blue"
                    fontSize="0.6em"
                    variant="subtle"
                  >
                    {user?.role}
                  </Badge>
                </Box>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FiUser />}>My Profile</MenuItem>
              <MenuItem icon={<FiSettings />} onClick={onSettingsOpen}>
                Settings
              </MenuItem>
              <MenuItem icon={<FiShield />}>Security</MenuItem>
              <MenuItem icon={<FiGlobe />}>Language</MenuItem>
              <MenuDivider />
              <MenuItem icon={<FiLogOut />} color="red.500" onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {/* Notifications Drawer */}
      <Drawer isOpen={isNotificationsOpen} onClose={onNotificationsClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <HStack justify="space-between">
              <Text>Notifications</Text>
              <Badge colorScheme="blue">{notifications.length}</Badge>
            </HStack>
          </DrawerHeader>
          <DrawerBody p={0}>
            <VStack spacing={0} align="stretch">
              {notifications.map((notification, idx) => (
                <Box
                  key={idx}
                  p={4}
                  borderBottom="1px"
                  borderColor="gray.100"
                  _hover={{ bg: 'gray.50' }}
                  cursor="pointer"
                  onClick={() => {
                    handleNotificationClick(notification);
                    onNotificationsClose();
                  }}
                >
                  <HStack justify="space-between">
                    <Text fontWeight="medium">{notification.title}</Text>
                    <Text fontSize="xs" color="gray.500">{notification.time}</Text>
                  </HStack>
                  <Text fontSize="sm" color="gray.600" mt={1}>{notification.message}</Text>
                </Box>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Settings Drawer */}
      <Drawer isOpen={isSettingsOpen} onClose={onSettingsClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Settings</DrawerHeader>
          <DrawerBody>
            <VStack spacing={6} align="stretch">
              {/* Appearance */}
              <Box>
                <Text fontWeight="medium" mb={3}>Appearance</Text>
                <HStack justify="space-between">
                  <Text>Dark Mode</Text>
                  <Switch
                    isChecked={colorMode === 'dark'}
                    onChange={toggleColorMode}
                    colorScheme="blue"
                  />
                </HStack>
              </Box>

              <Divider />

              {/* Notifications */}
              <Box>
                <Text fontWeight="medium" mb={3}>Notifications</Text>
                <VStack spacing={3} align="stretch">
                  <HStack justify="space-between">
                    <Text>Email Notifications</Text>
                    <Switch defaultChecked colorScheme="blue" />
                  </HStack>
                  <HStack justify="space-between">
                    <Text>Push Notifications</Text>
                    <Switch defaultChecked colorScheme="blue" />
                  </HStack>
                  <HStack justify="space-between">
                    <Text>SMS Notifications</Text>
                    <Switch colorScheme="blue" />
                  </HStack>
                </VStack>
              </Box>

              <Divider />

              {/* System Stats */}
              <Box>
                <Text fontWeight="medium" mb={3}>System Status</Text>
                <SimpleGrid columns={2} spacing={4}>
                  {systemStats.map((stat, idx) => (
                    <Box key={idx} p={3} bg="gray.50" borderRadius="md">
                      <Text fontSize="xs" color="gray.600">{stat.label}</Text>
                      <Text fontWeight="bold" color={`${stat.color}.600`}>{stat.value}</Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>

              <Divider />

              {/* Actions */}
              <VStack spacing={3}>
                <Button w="100%" leftIcon={<FiDownload />}>
                  Export Data
                </Button>
                <Button w="100%" leftIcon={<FiUpload />} variant="outline">
                  Import Data
                </Button>
                <Button w="100%" leftIcon={<FiRefreshCw />} variant="ghost">
                  Refresh System
                </Button>
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
};

export default TopBar;