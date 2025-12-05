import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useColorModeValue,
  useDisclosure,
  useBreakpointValue,
  IconButton,
  Flex,
  Text,
  HStack,
  Badge,
  Progress,
  Tooltip,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import { FiMenu, FiBell, FiUser, FiSettings, FiLogOut, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';

import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { useHospitalDataContext } from '../context/HospitalDataContext';
import BreadcrumbNavigator from '../components/BreadcrumbNavigator';
import TopBar from './TopBar';

export default function MainLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout } = useAuth();
  const { getTodaysAppointments, getNotifications } = useHospitalDataContext();
  const location = useLocation();
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [todayAppointments, setTodayAppointments] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const [notifications, setNotifications] = useState([]);

  const isMobile = useBreakpointValue({ base: true, md: false });
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false });

  // Set initial sidebar state based on screen size
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
    } else if (isTablet) {
      setSidebarCollapsed(true);
    } else {
      setSidebarCollapsed(true);
    }
  }, [isMobile, isTablet]);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const appointments = getTodaysAppointments?.() || [];
        const notificationData = getNotifications?.() || [];
        
        setTodayAppointments(appointments.length);
        const unread = notificationData.filter(n => !n.read);
        setUnreadNotifications(unread.length);
        setNotifications(notificationData.slice(0, 5));
      } catch (error) {
        console.error('Error loading layout data:', error);
      }
    };
    
    loadData();
  }, [getTodaysAppointments, getNotifications]);

  // Set page title based on route
  useEffect(() => {
    const path = location.pathname;
    const titles = {
      '/': 'Dashboard',
      '/patient/dashboard': 'Patient Dashboard',
      '/patient/appointments': 'My Appointments',
      '/book-appointment': 'Book Appointment',
      '/doctors': 'Doctors Directory',
      '/departments': 'Departments',
      '/emergency': 'Emergency',
      '/admin/dashboard': 'Admin Dashboard',
      '/doctor/dashboard': 'Doctor Dashboard',
      '/staff/dashboard': 'Staff Dashboard',
      '/patient/prescriptions': 'My Prescriptions',
      '/patient/reports': 'Medical Reports',
      '/patient/profile': 'My Profile',
      '/doctor/patients': 'My Patients',
      '/doctor/appointments': 'Doctor Appointments',
      '/doctor/reports': 'Patient Reports',
      '/admin/users': 'User Management',
      '/admin/doctors': 'Doctor Management',
      '/admin/appointments': 'Appointment Management',
      '/admin/departments': 'Department Management',
      '/admin/billing': 'Billing Management',
      '/admin/analytics': 'Analytics Dashboard',
      '/staff/register-patient': 'Register Patient',
      '/staff/book-appointment': 'Book Appointment',
      '/staff/upload-reports': 'Upload Reports',
    };
    
    setPageTitle(titles[path] || 'MediCare Pro');
  }, [location]);

  // Handle sidebar toggle
  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
console.log(sidebarCollapsed);

  // Calculate sidebar width
  const sidebarWidth = sidebarCollapsed ? 70 : 280;
  const mainContentMargin = isMobile ? 0 : sidebarWidth;

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const contentBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box minH="100vh" bg={bgColor} display="flex">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sidebar
          onClose={onClose}
          collapsed={sidebarCollapsed}
          onToggle={handleToggleSidebar}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent maxW="280px">
          <DrawerCloseButton />
          <Sidebar isMobile onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* Main Content Area */}
      <Box
        flex={1}
        ml={{ base: 0, md: `${mainContentMargin}px` }}
        transition="all 0.3s ease"
        minH="100vh"
        display="flex"
        flexDirection="column"
      >
     <TopBar/>
<BreadcrumbNavigator />
        {/* Main Content */}
        <Box
          flex={1}
          px={{ base: 4, md: 6 }}
          py={{ base: 4, md: 6 }}
          overflow="auto"
        >
          <Box
            bg={contentBg}
            borderRadius="lg"
            p={{ base: 4, md: 6 }}
            shadow="sm"
            minH={{ base: 'calc(100vh - 140px)', md: 'calc(100vh - 140px)' }}
          >
            <Outlet />
          </Box>
        </Box>

        {/* Footer */}
        <Box
          borderTop="1px"
          borderColor={borderColor}
          px={{ base: 4, md: 6 }}
          py={3}
          bg={contentBg}
        >
          <Flex align="center" justify="space-between">
            <Text fontSize="sm" color="gray.500">
              © 2024 MediCare Pro Hospital. All rights reserved.
            </Text>
            <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
              <Text fontSize="sm" color="gray.500">v2.1.0</Text>
              <Progress value={65} size="xs" w="100px" colorScheme="blue" />
            </HStack>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}