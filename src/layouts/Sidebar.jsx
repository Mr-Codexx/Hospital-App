import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Icon,
  Link,
  VStack,
  Divider,
  useColorModeValue,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiHome,
  FiCalendar,
  FiUser,
  FiFileText,
  FiUsers,
  FiDollarSign,
  FiBarChart2,
  FiSettings,
  FiBriefcase,
  FiPlusCircle,
  FiUploadCloud,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

const Sidebar = ({ onClose, onToggle, ...rest }) => {
  const { user } = useAuth();

  const [collapsed, setCollapsed] = useState(false);

  // ROLE BASED LINKS
  const patientLinks = [
    { name: 'Dashboard', icon: FiHome, path: '/' },
    { name: 'Appointments', icon: FiCalendar, path: '/patient/appointments' },
    { name: 'Prescriptions', icon: FiFileText, path: '/patient/prescriptions' },
    { name: 'Reports', icon: FiFileText, path: '/patient/reports' },
    { name: 'Profile', icon: FiUser, path: '/patient/profile' },
  ];

  const doctorLinks = [
    { name: 'Dashboard', icon: FiHome, path: '/doctor/dashboard' },
    { name: 'Patients', icon: FiUsers, path: '/doctor/patients' },
    { name: 'Appointments', icon: FiCalendar, path: '/doctor/appointments' },
    { name: 'Reports', icon: FiFileText, path: '/doctor/reports' },
  ];

  const adminLinks = [
    { name: 'Dashboard', icon: FiHome, path: '/admin/dashboard' },
    { name: 'Users', icon: FiUsers, path: '/admin/users' },
    { name: 'Doctors', icon: FiBriefcase, path: '/admin/doctors' },
    { name: 'Appointments', icon: FiCalendar, path: '/admin/appointments' },
    { name: 'Departments', icon: FiSettings, path: '/admin/departments' },
    { name: 'Billing', icon: FiDollarSign, path: '/admin/billing' },
    { name: 'Analytics', icon: FiBarChart2, path: '/admin/analytics' },
  ];

  const staffLinks = [
    { name: 'Register Patient', icon: FiPlusCircle, path: '/staff/register-patient' },
    { name: 'Book Appointment', icon: FiCalendar, path: '/staff/book-appointment' },
    { name: 'Upload Reports', icon: FiUploadCloud, path: '/staff/upload-reports' },
  ];

  const getLinks = () => {
    switch (user?.role) {
      case 'admin': return adminLinks;
      case 'doctor': return doctorLinks;
      case 'staff': return staffLinks;
      case 'patient': return patientLinks;
      default: return [];
    }
  };

  // NAV ITEM
  const NavItem = ({ icon, children, path }) => (
    <Link
      as={NavLink}
      to={path}
      style={{ textDecoration: 'none' }}
      _focus={{ outline: 'none' }}
      onClick={onClose}
    >
      <Flex
        align="center"
        p="3"
        mx="3"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        transition="all 0.2s"
        _hover={{ bg: 'brand.500', color: 'white' }}
        sx={{
          '&.active': { bg: 'brand.500', color: 'white' },
        }}
      >
        <Icon as={icon} fontSize="20" />

        {!collapsed && (
          <Text ml="4" fontSize="sm" fontWeight="medium">
            {children}
          </Text>
        )}
      </Flex>
    </Link>
  );

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={collapsed ? "70px" : "240px"}
      transition="width 0.3s ease"
      pos="fixed"
      h="full"
      {...rest}
    >
      {/* HEADER */}
      <Flex h="20" align="center" mx="4" justifyContent={collapsed ? "center" : "space-between"}>
        {!collapsed && (
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color="brand.500">
            MediCare
          </Text>
        )}

        <IconButton
          icon={collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          aria-label="Collapse Sidebar"
          onClick={() => {
            const newState = !collapsed;
            setCollapsed(newState);

            // IMPORTANT: SEND STATE TO PARENT
            if (onToggle) onToggle(newState);
          }}
          size="sm"
          variant="ghost"
        />

      </Flex>

      <Divider />

      {/* LINKS */}
      <VStack spacing={1} align="stretch" mt={4}>
        {getLinks().map((link) => (
          <Tooltip
            key={link.name}
            label={collapsed ? link.name : ""}
            placement="right"
            openDelay={300}
          >
            <Box>
              <NavItem icon={link.icon} path={link.path}>
                {link.name}
              </NavItem>
            </Box>
          </Tooltip>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
