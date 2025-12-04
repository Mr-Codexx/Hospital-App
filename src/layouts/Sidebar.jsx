import React, { useState, useEffect } from 'react';
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
  Avatar,
  Badge,
  HStack,
  Collapse,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Progress,
  Spinner,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  useBreakpointValue,
  SimpleGrid,
  Wrap,
  WrapItem,
  useColorMode,
  MenuOptionGroup,
  MenuGroup,
  MenuItemOption,
} from '@chakra-ui/react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useHospitalDataContext } from '../context/HospitalDataContext';
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
  FiSearch,
  FiBell,
  FiHeart,
  FiShield,
  FiStar,
  FiMessageSquare,
  FiHelpCircle,
  FiLogOut,
  FiGlobe,
  FiMap,
  FiPackage,
  FiActivity,
  FiTrendingUp,
  FiCreditCard,
  FiShoppingCart,
  FiBook,
  FiVideo,
  FiHeadphones,
  FiShare2,
  FiDownload,
  FiLock,
  FiUnlock,
  FiRefreshCw,
  FiFilter,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import {
  MdLocalHospital,
  MdHealthAndSafety,
  MdEmergency,
  MdAccessTime,
  MdVerifiedUser,
  MdNotifications,
  MdLanguage,
  MdDashboard,
  MdScience,
  MdLocalPharmacy,
  MdSchool,
  MdWork,
  MdGasMeter,
  MdBrightnessAuto,
} from 'react-icons/md';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const Sidebar = ({ onClose, onToggle, isMobile = false, ...rest }) => {
  const { user, logout } = useAuth();
  const { getNotifications, getTodaysAppointments } = useHospitalDataContext();
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState(0);
  const [userStats, setUserStats] = useState({});

  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    if (isSmallScreen) {
      setCollapsed(true);
    }
  }, [isSmallScreen]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const notifs = getNotifications?.() || [];
        const appointments = getTodaysAppointments?.() || [];

        setNotifications(notifs.filter(n => !n.read).slice(0, 5));
        setTodayAppointments(appointments.length);

        if (user) {
          setUserStats({
            appointments: 12,
            prescriptions: 5,
            reports: 3,
            bills: 2,
          });
        }
      } catch (error) {
        console.error('Error loading sidebar data:', error);
      }
    };

    loadData();
  }, [user, getNotifications, getTodaysAppointments]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose?.();
  };

  const ROLE_BASED_LINKS = {
    patient: {
      main: [
        { name: 'Dashboard', icon: FiHome, path: '/', badge: todayAppointments },
        {
          name: 'Appointments', icon: FiCalendar, path: '/patient/appointments', submenu: [
            { name: 'Book Appointment', path: '/book-appointment' },
            { name: 'My Appointments', path: '/patient/appointments' },
            { name: 'Schedule', path: '/patient/schedule' },
          ]
        },
        { name: 'Prescriptions', icon: FiFileText, path: '/patient/prescriptions' },
        {
          name: 'Medical Records', icon: FiFileText, path: '/patient/records', submenu: [
            { name: 'Lab Reports', path: '/patient/reports' },
            { name: 'Discharge Summary', path: '/patient/discharge' },
            { name: 'Vaccination', path: '/patient/vaccination' },
          ]
        },
        { name: 'Billing', icon: FiDollarSign, path: '/patient/billing' },
        { name: 'Profile', icon: FiUser, path: '/patient/profile' },
      ],
      quick: [
        { name: 'Find Doctors', icon: FiUsers, path: '/doctors', color: 'blue' },
        { name: 'Departments', icon: MdLocalHospital, path: '/departments', color: 'green' },
        { name: 'Emergency', icon: MdEmergency, path: '/emergency', color: 'red' },
        { name: 'Pharmacy', icon: MdLocalPharmacy, path: '/pharmacy', color: 'purple' },
      ]
    },
    doctor: {
      main: [
        { name: 'Dashboard', icon: FiHome, path: '/doctor/dashboard' },
        { name: 'My Patients', icon: FiUsers, path: '/doctor/patients', badge: 45 },
        { name: 'Appointments', icon: FiCalendar, path: '/doctor/appointments', badge: todayAppointments },
        { name: 'Consultations', icon: FiMessageSquare, path: '/doctor/consultations' },
        { name: 'Medical Records', icon: FiFileText, path: '/doctor/records' },
        { name: 'Schedule', icon: MdAccessTime, path: '/doctor/schedule' },
        { name: 'Prescriptions', icon: FiFileText, path: '/doctor/prescriptions' },
        { name: 'Telemedicine', icon: FiVideo, path: '/doctor/telemedicine' },
      ],
      quick: [
        { name: 'Today\'s Schedule', icon: FiCalendar, path: '/doctor/today', color: 'blue' },
        { name: 'Urgent Cases', icon: MdEmergency, path: '/doctor/urgent', color: 'red' },
        { name: 'Patient Search', icon: FiSearch, path: '/doctor/search', color: 'green' },
        { name: 'Analytics', icon: FiTrendingUp, path: '/doctor/analytics', color: 'purple' },
      ]
    },
    admin: {
      main: [
        { name: 'Dashboard', icon: FiHome, path: '/admin/dashboard' },
        { name: 'User Management', icon: FiUsers, path: '/admin/users', badge: 3 },
        { name: 'Doctors', icon: FiBriefcase, path: '/admin/doctors' },
        { name: 'Patients', icon: FiUser, path: '/admin/patients' },
        { name: 'Appointments', icon: FiCalendar, path: '/admin/appointments' },
        { name: 'Departments', icon: MdLocalHospital, path: '/admin/departments' },
        { name: 'Billing & Finance', icon: FiDollarSign, path: '/admin/billing' },
        { name: 'Inventory', icon: FiPackage, path: '/admin/inventory' },
        { name: 'Analytics', icon: FiBarChart2, path: '/admin/analytics' },
        { name: 'System Settings', icon: FiSettings, path: '/admin/settings' },
      ],
      quick: [
        { name: 'Hospital Stats', icon: FiActivity, path: '/admin/stats', color: 'blue' },
        { name: 'Revenue', icon: FiCreditCard, path: '/admin/revenue', color: 'green' },
        { name: 'Staff Management', icon: FiUsers, path: '/admin/staff', color: 'purple' },
        { name: 'Reports', icon: FiFileText, path: '/admin/reports', color: 'orange' },
      ]
    },
    staff: {
      main: [
        { name: 'Dashboard', icon: FiHome, path: '/staff/dashboard' },
        { name: 'Register Patient', icon: FiPlusCircle, path: '/staff/register-patient' },
        { name: 'Book Appointment', icon: FiCalendar, path: '/staff/book-appointment', badge: 8 },
        { name: 'Upload Reports', icon: FiUploadCloud, path: '/staff/upload-reports' },
        { name: 'Patient Records', icon: FiFileText, path: '/staff/records' },
        { name: 'Billing', icon: FiDollarSign, path: '/staff/billing' },
        { name: 'Pharmacy', icon: MdLocalPharmacy, path: '/staff/pharmacy' },
        { name: 'Lab', icon: MdScience, path: '/staff/lab' },
      ],
      quick: [
        { name: 'Quick Registration', icon: FiUser, path: '/staff/quick-register', color: 'blue' },
        { name: 'Today\'s Queue', icon: FiUsers, path: '/staff/queue', color: 'green' },
        { name: 'Emergency', icon: MdEmergency, path: '/staff/emergency', color: 'red' },
        { name: 'Inventory', icon: FiPackage, path: '/staff/inventory', color: 'purple' },
      ]
    }
  };

  const getLinks = () => {
    const role = user?.role || 'patient';
    return ROLE_BASED_LINKS[role] || ROLE_BASED_LINKS.patient;
  };

  const NavItem = ({ item, level = 0 }) => {
    const isActive = location.pathname === item.path ||
      (item.submenu && item.submenu.some(sub => location.pathname === sub.path));

    const hasSubmenu = item.submenu && item.submenu.length > 0;

    return (
      <Box>
        <Link
          as={NavLink}
          to={hasSubmenu ? '#' : item.path}
          style={{ textDecoration: 'none' }}
          _focus={{ outline: 'none' }}
          onClick={(e) => {
            if (hasSubmenu) {
              e.preventDefault();
              setActiveSubmenu(activeSubmenu === item.name ? null : item.name);
            } else {
              onClose?.();
            }
          }}
        >
          <Flex
            align="center"
            p={collapsed ? "3" : "3"}
            mx={collapsed ? "2" : "3"}
            borderRadius="lg"
            role="group"
            cursor="pointer"
            transition="all 0.2s"
            bg={isActive ? 'brand.500' : 'transparent'}
            color={isActive ? 'white' : 'inherit'}
            _hover={{
              bg: isActive ? 'brand.600' : { bgColor },
              transform: 'translateX(4px)',
            }}
            pl={level > 0 ? (collapsed ? "3" : "8") : (collapsed ? "3" : "4")}
            position="relative"
            overflow="hidden"
          >
            <Icon
              as={item.icon}
              fontSize={collapsed ? "18" : "18"}
              mr={collapsed ? 0 : 3}
              flexShrink={0}
            />

            {!collapsed && (
              <Flex align="center" justify="space-between" flex={1}>
                <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
                  {item.name}
                </Text>

                {item.badge && (
                  <Badge
                    colorScheme="red"
                    fontSize="xs"
                    borderRadius="full"
                    px={2}
                    ml={2}
                  >
                    {item.badge}
                  </Badge>
                )}

                {hasSubmenu && (
                  <Icon
                    as={activeSubmenu === item.name ? FiChevronLeft : FiChevronRight}
                    fontSize="12"
                    ml={2}
                    transition="transform 0.2s"
                    transform={activeSubmenu === item.name ? 'rotate(-90deg)' : 'rotate(0)'}
                  />
                )}
              </Flex>
            )}

            {collapsed && item.badge && (
              <Box
                position="absolute"
                top="2"
                right="2"
                w="2"
                h="2"
                bg="red.500"
                borderRadius="full"
              />
            )}
          </Flex>
        </Link>

        {hasSubmenu && !collapsed && (
          <Collapse in={activeSubmenu === item.name}>
            <VStack spacing={1} align="stretch" ml="8" mt={1}>
              {item.submenu.map((subItem, subIndex) => (
                <NavItem key={subIndex} item={subItem} level={level + 1} />
              ))}
            </VStack>
          </Collapse>
        )}
      </Box>
    );
  };

  const links = getLinks();
  const bgColor = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={bgColor}
      borderRight="1px"
      borderRightColor={borderColor}
      w={collapsed ? (isMobile ? "100%" : "70px") : (isMobile ? "100%" : "280px")}
      h={isMobile ? "100%" : "full"}
      transition="all 0.3s ease"
      pos={isMobile ? "relative" : "fixed"}
      zIndex={1000}
      display="flex"
      flexDirection="column"
      {...rest}
    >
      {/* Header */}
      {!isMobile && (
        <Flex
          h="20"
          align="center"
          px={collapsed ? "3" : "4"}
          justify={collapsed ? "center" : "space-between"}
          borderBottom="1px"
          borderBottomColor={borderColor}
        >
          {!collapsed ? (
            <>
              <HStack spacing={3}>
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
                  boxSize="32px"
                  alt="MediCare"
                />
                <Box>
                  <Text fontSize="xl" fontWeight="bold" color="brand.500" lineHeight="1">
                    MediCare Pro
                  </Text>
                  <Text fontSize="xs" color="gray.500">Hospital Management</Text>
                </Box>
              </HStack>
              <IconButton
                icon={<FiChevronLeft />}
                aria-label="Collapse Sidebar"
                onClick={() => {
                  const newState = true;
                  setCollapsed(newState);
                  onToggle?.(newState);
                }}
                size="sm"
                variant="ghost"
                display={{ base: 'none', md: 'flex' }}
              />
            </>
          ) : (
            <Flex justifyContent="center" w="100%">
              <IconButton
                icon={<FiChevronRight />}
                aria-label="Expand Sidebar"
                onClick={() => {
                  const newState = false;
                  setCollapsed(newState);
                  onToggle?.(newState);
                }}
                size="sm"
                variant="ghost"
                display={{ base: 'none', md: 'flex' }}
              />
            </Flex>
          )}
        </Flex>
      )}

      {/* Mobile Header */}
      {isMobile && (
        <Flex h="16" align="center" px="4" justify="space-between" borderBottom="1px" borderBottomColor={borderColor}>
          <HStack spacing={3}>
            <Avatar size="sm" name={user?.name} src={`https://ui-avatars.com/api/?name=${user?.name}&background=3182CE&color=fff`} />
            <Box>
              <Text fontWeight="bold">{user?.name}</Text>
              <Badge colorScheme="blue" fontSize="xs">{user?.role}</Badge>
            </Box>
          </HStack>
          <IconButton
            icon={<FiX />}
            aria-label="Close Sidebar"
            onClick={onClose}
            size="sm"
            variant="ghost"
          />
        </Flex>
      )}

      {/* Search Bar (only when expanded) */}
      {!collapsed && !isMobile && (
        <Box px="4" py="3" borderBottom="1px" borderBottomColor={borderColor}>
          <InputGroup size="sm">
            <InputLeftElement>
              <FiSearch color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              borderRadius="lg"
            />
            {searchQuery && (
              <InputRightElement>
                <IconButton
                  icon={<FiX />}
                  size="xs"
                  variant="ghost"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                />
              </InputRightElement>
            )}
          </InputGroup>
        </Box>
      )}

      {/* User Info (only when expanded) */}
      {!collapsed && !isMobile && user && (
        <Box px="4" py="4" borderBottom="1px" borderBottomColor={borderColor}>
          <HStack spacing={3}>
            <Avatar
              size="md"
              name={user.name}
              src={`https://ui-avatars.com/api/?name=${user.name}&background=3182CE&color=fff`}
              border="2px solid"
              borderColor="brand.500"
            />
            <Box flex={1}>
              <Text fontWeight="bold" fontSize="sm">{user.name}</Text>
              <Badge colorScheme="blue" fontSize="xs">{user.role}</Badge>
              <Text fontSize="xs" color="gray.500" mt={1}>{user.email}</Text>
            </Box>
          </HStack>

          {user.role === 'patient' && (
            <SimpleGrid columns={2} spacing={2} mt={3}>
              <Box textAlign="center" p={2} bg="blue.50" borderRadius="md">
                <Text fontSize="xs" color="gray.600">Appointments</Text>
                <Text fontWeight="bold" color="blue.600">{userStats.appointments || 0}</Text>
              </Box>
              <Box textAlign="center" p={2} bg="green.50" borderRadius="md">
                <Text fontSize="xs" color="gray.600">Prescriptions</Text>
                <Text fontWeight="bold" color="green.600">{userStats.prescriptions || 0}</Text>
              </Box>
            </SimpleGrid>
          )}
        </Box>
      )}

      {/* Quick Actions (only when expanded) */}
      {!collapsed && links.quick && (
        <Box px="4" py="3" borderBottom="1px" borderBottomColor={borderColor}>
          <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={2}>QUICK ACTIONS</Text>
          <Wrap spacing={2}>
            {links.quick.map((action, idx) => (
              <WrapItem key={idx}>
                <Button
                  size="xs"
                  colorScheme={action.color}
                  variant="solid"
                  leftIcon={<action.icon />}
                  onClick={() => {
                    navigate(action.path);
                    onClose?.();
                  }}
                  w="100%"
                >
                  {action.name}
                </Button>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      )}

      {/* Main Navigation */}
      <Box
        flex={1}
        overflowY="auto"
        sx={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: useColorModeValue('gray.300', 'gray.600'),
            borderRadius: '24px',
          },
        }}
      >
        <VStack spacing={1} align="stretch" p={collapsed ? 2 : 4}>
          <Text
            fontSize="xs"
            fontWeight="bold"
            color="gray.500"
            px={collapsed ? 2 : 3}
            display={collapsed ? 'none' : 'block'}
          >
            MAIN NAVIGATION
          </Text>

          {links.main.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
        </VStack>
      </Box>

      {/* Footer */}
      {!collapsed && !isMobile && (
        <Box p="4" borderTop="1px" borderTopColor={borderColor}>
          <VStack spacing={3} align="stretch">
            <HStack justify="space-between">
              <HStack spacing={2}>
                <FiBell color="gray.500" />
                <Text fontSize="sm">Notifications</Text>
              </HStack>
              <Badge colorScheme="red" fontSize="xs">
                {notifications.length}
              </Badge>
            </HStack>

            <Menu>
              <MenuButton
                as={Button}
                size="sm"
                variant="ghost"
                leftIcon={<FiSettings />}
              >
                Settings
              </MenuButton>

              <MenuList>

                {/* Profile */}
                <MenuItem icon={<FiUser />}>Profile</MenuItem>

                {/* THEME SUB-MENU */}
                 <MenuGroup title="Theme Settings">
          <MenuOptionGroup
            type="radio"
            defaultValue={colorMode}
            onChange={(val) => setColorMode(val)}
          >
            <MenuItemOption value="light" icon={<SunIcon />}>
              Light
            </MenuItemOption>

            <MenuItemOption value="dark" icon={<MoonIcon />}>
              Dark
            </MenuItemOption>

            <MenuItemOption value="system" icon={<MdBrightnessAuto />}>
              System
            </MenuItemOption>
          </MenuOptionGroup>
        </MenuGroup>

                {/* Preferences */}
                <MenuItem icon={<FiSettings />}>Preferences</MenuItem>

                {/* Language */}
                <MenuItem icon={<FiGlobe />}>Language</MenuItem>

                <MenuDivider />

                {/* Logout */}
                <MenuItem
                  icon={<FiLogOut />}
                  color="red.500"
                  onClick={handleLogout}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </VStack>
        </Box>
      )}

      {/* Collapsed Footer */}
      {collapsed && !isMobile && (
        <Box p="2" borderTop="1px" borderTopColor={borderColor}>
          <VStack spacing={2}>
            <Tooltip label="Notifications" placement="right">
              <IconButton
                icon={<FiBell />}
                aria-label="Notifications"
                size="sm"
                variant="ghost"
                position="relative"
              >
                {notifications.length > 0 && (
                  <Box
                    position="absolute"
                    top="1"
                    right="1"
                    w="2"
                    h="2"
                    bg="red.500"
                    borderRadius="full"
                  />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip label="Settings" placement="right">
              <Menu>
                <MenuButton as={IconButton} icon={<FiSettings />} size="sm" variant="ghost" />
                <MenuList>
                  <MenuItem icon={<FiLogOut />} onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Tooltip>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;