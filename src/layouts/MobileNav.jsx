import React, { useState } from 'react';
import {
  Flex,
  IconButton,
  Heading,
  useColorModeValue,
  HStack,
  Avatar,
  Text,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { FiMenu, FiBell, FiUser, FiSettings, FiLogOut, FiHome, FiCalendar } from 'react-icons/fi';
import { MdHealthAndSafety, MdEmergency } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import { useHospitalDataContext } from '../context/HospitalDataContext';
import { NavLink } from 'react-router-dom';

const MobileNav = ({ onOpen }) => {
  const { user, logout } = useAuth();
  const { getTodaysAppointments, getNotifications } = useHospitalDataContext();
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();
  
  const [todayAppointments, setTodayAppointments] = useState(0);
  const [notifications, setNotifications] = useState([]);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const appointments = getTodaysAppointments?.() || [];
        const notifs = getNotifications?.() || [];
        
        setTodayAppointments(appointments.length);
        setNotifications(notifs.filter(n => !n.read).slice(0, 3));
      } catch (error) {
        console.error('Error loading mobile nav data:', error);
      }
    };
    
    loadData();
  }, [getTodaysAppointments, getNotifications]);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const quickLinks = [
    { name: 'Home', icon: FiHome, path: '/' },
    { name: 'Book Appointment', icon: FiCalendar, path: '/book-appointment' },
    { name: 'Doctors', icon: FiUser, path: '/doctors' },
    { name: 'Emergency', icon: MdEmergency, path: '/emergency' },
  ];

  return (
    <>
      <Flex
        display={{ base: 'flex', md: 'none' }}
        position="sticky"
        top="0"
        zIndex="1000"
        h="16"
        px="4"
        align="center"
        bg={bgColor}
        borderBottom="1px"
        borderColor={borderColor}
        justify="space-between"
      >
        {/* Left: Menu Button and Brand */}
        <HStack spacing={3}>
          <IconButton
            variant="outline"
            onClick={onOpen}
            aria-label="Open menu"
            icon={<FiMenu />}
            size="sm"
          />
          
          <Avatar
            size="sm"
            name="MediCare"
            src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
          />
          
          <Heading size="md" color="brand.500">
            MediCare
          </Heading>
        </HStack>

        {/* Right: Notifications and User Menu */}
        <HStack spacing={3}>
          {/* Notifications */}
          <Menu>
            <MenuButton
              as={IconButton}
              variant="ghost"
              icon={
                <Box position="relative">
                  <FiBell />
                  {notifications.length > 0 && (
                    <Badge
                      position="absolute"
                      top="-1"
                      right="-1"
                      colorScheme="red"
                      borderRadius="full"
                      fontSize="0.6em"
                      px={1}
                    >
                      {notifications.length}
                    </Badge>
                  )}
                </Box>
              }
              aria-label="Notifications"
            />
            <MenuList>
              <MenuItem fontWeight="bold" isDisabled>
                Notifications ({notifications.length})
              </MenuItem>
              <MenuDivider />
              {notifications.map((notif, idx) => (
                <MenuItem key={idx} fontSize="sm">
                  {notif.message}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          {/* User Menu */}
          <Menu>
            <MenuButton>
              <Avatar
                size="sm"
                name={user?.name}
                src={`https://ui-avatars.com/api/?name=${user?.name}&background=3182CE&color=fff`}
              />
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FiUser />}>Profile</MenuItem>
              <MenuItem icon={<FiSettings />}>Settings</MenuItem>
              <MenuDivider />
              <MenuItem icon={<FiLogOut />} color="red.500" onClick={logout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {/* Quick Navigation Drawer */}
      <Drawer isOpen={isMenuOpen} placement="bottom" onClose={onMenuClose}>
        <DrawerOverlay />
        <DrawerContent borderTopRadius="lg" maxH="60vh">
          <DrawerCloseButton />
          <Box p={4}>
            <Text fontWeight="bold" mb={4}>Quick Navigation</Text>
            <VStack spacing={3} align="stretch">
              {quickLinks.map((link, idx) => (
                <Link
                  key={idx}
                  as={NavLink}
                  to={link.path}
                  style={{ textDecoration: 'none' }}
                  onClick={onMenuClose}
                >
                  <Flex
                    align="center"
                    p={3}
                    borderRadius="lg"
                    _hover={{ bg: 'gray.100' }}
                  >
                    <Icon as={link.icon} mr={3} />
                    <Text fontWeight="medium">{link.name}</Text>
                  </Flex>
                </Link>
              ))}
            </VStack>
            
            <Divider my={4} />
            
            {/* Stats */}
            <HStack justify="space-between">
              <Box textAlign="center">
                <Text fontSize="xs" color="gray.500">Today's Appointments</Text>
                <Text fontWeight="bold" color="blue.600">{todayAppointments}</Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="xs" color="gray.500">Unread Notifications</Text>
                <Text fontWeight="bold" color="red.600">{notifications.length}</Text>
              </Box>
            </HStack>
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNav;