// components/BreadcrumbNavigator.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Text,
  IconButton,
  HStack,
  VStack,
  Tooltip,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Badge,
  Icon,
  Collapse,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Tag,
  TagLabel,
  TagLeftIcon,
  Divider,
  Wrap,
  WrapItem,
  Portal,
  chakra,
  SimpleGrid,
  Container,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormControl,
  FormLabel,
  Select,
  FormHelperText,
  Checkbox,
} from '@chakra-ui/react';

import { FiCopy, FiX, FiCheck } from 'react-icons/fi';

import {
  FiHome,
  FiChevronRight,
  FiChevronLeft,
  FiNavigation,
  FiMap,
  FiClock,
  FiStar,
  FiUser,
  FiCalendar,
  FiFileText,
  FiDollarSign,
  FiBriefcase,
  FiHeart,
  FiBell,
  FiSettings,
  FiSearch,
  FiPlus,
  FiSave,
  FiTrash2,
  FiEdit,
  FiEye,
  FiShare2,
  FiDownload,
  FiUpload,
  FiRefreshCw,
  FiMoreVertical,
  FiGrid,
  FiLayers,
  FiTrendingUp,
  FiBarChart2,
  FiActivity,
  FiUsers,
  FiShoppingCart,
  FiPackage,
  FiTruck,
  FiShoppingBag,
  FiCreditCard,
  FiShield,
  FiHelpCircle,
  FiInfo,
  FiExternalLink,
  FiBookmark,
  FiBookOpen,
  FiMapPin,
  FiPhone,
  FiMail,
  FiGlobe,
  FiLock,
  FiUnlock,
  FiLogOut,
  FiLogIn,
  FiUserPlus,
  FiKey,
} from 'react-icons/fi';
import {
  MdHistory,
  MdDashboard,
  MdLocalHospital,
  MdHealthAndSafety,
  MdEmergency,
  MdAccessTime,
  MdDateRange,
  MdVerifiedUser,
  MdLanguage,
  MdNotifications,
  MdPayment,
  MdConfirmationNumber,
  MdSchool,
  MdWork,
  MdLocationOn,
} from 'react-icons/md';
import { useLocation, useNavigate, matchPath } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// Route configuration for breadcrumbs
const routeConfig = {
  // Dashboard
  '/': { name: 'Dashboard', icon: FiHome, color: 'blue' },
  
  // Patient routes
  '/patient/dashboard': { name: 'Patient Dashboard', icon: FiUser, color: 'green' },
  '/patient/appointments': { name: 'My Appointments', icon: FiCalendar, color: 'blue' },
  '/patient/prescriptions': { name: 'Prescriptions', icon: FiFileText, color: 'purple' },
  '/patient/reports': { name: 'Medical Reports', icon: FiFileText, color: 'orange' },
  '/patient/profile': { name: 'My Profile', icon: FiUser, color: 'teal' },
  '/patient/billing': { name: 'Billing & Payments', icon: FiDollarSign, color: 'green' },
  
  // Doctor routes
  '/doctor/dashboard': { name: 'Doctor Dashboard', icon: FiBriefcase, color: 'blue' },
  '/doctor/patients': { name: 'My Patients', icon: FiUsers, color: 'green' },
  '/doctor/appointments': { name: 'Appointments', icon: FiCalendar, color: 'purple' },
  '/doctor/reports': { name: 'Patient Reports', icon: FiFileText, color: 'orange' },
  '/doctor/schedule': { name: 'Schedule', icon: MdAccessTime, color: 'red' },
  '/doctor/consultations': { name: 'Consultations', icon: FiHeart, color: 'pink' },
  
  // Admin routes
  '/admin/dashboard': { name: 'Admin Dashboard', icon: FiGrid, color: 'red' },
  '/admin/users': { name: 'User Management', icon: FiUsers, color: 'blue' },
  '/admin/doctors': { name: 'Doctors', icon: FiBriefcase, color: 'green' },
  '/admin/appointments': { name: 'Appointments', icon: FiCalendar, color: 'purple' },
  '/admin/departments': { name: 'Departments', icon: FiLayers, color: 'orange' },
  '/admin/billing': { name: 'Billing', icon: FiDollarSign, color: 'green' },
  '/admin/analytics': { name: 'Analytics', icon: FiBarChart2, color: 'teal' },
  '/admin/settings': { name: 'System Settings', icon: FiSettings, color: 'gray' },
  
  // Staff routes
  '/staff/register-patient': { name: 'Register Patient', icon: FiUserPlus, color: 'blue' },
  '/staff/book-appointment': { name: 'Book Appointment', icon: FiCalendar, color: 'green' },
  '/staff/upload-reports': { name: 'Upload Reports', icon: FiUpload, color: 'purple' },
  
  // Common routes
  '/book-appointment': { name: 'Book Appointment', icon: FiCalendar, color: 'blue' },
  '/doctors': { name: 'Doctors Directory', icon: FiUsers, color: 'green' },
  '/departments': { name: 'Departments', icon: MdLocalHospital, color: 'purple' },
  '/services': { name: 'Services', icon: FiHeart, color: 'pink' },
  '/emergency': { name: 'Emergency', icon: MdEmergency, color: 'red' },
  '/pharmacy': { name: 'Pharmacy', icon: FiPackage, color: 'orange' },
  '/lab-tests': { name: 'Lab Tests', icon: FiActivity, color: 'teal' },
  '/billing': { name: 'Billing', icon: FiDollarSign, color: 'green' },
  
  // Dynamic routes patterns
  '/doctors/:departmentName': { 
    name: 'Doctors', 
    icon: FiUsers, 
    color: 'blue',
    dynamic: true 
  },
  '/doctor/:doctorId': { 
    name: 'Doctor Profile', 
    icon: FiUser, 
    color: 'green',
    dynamic: true 
  },
  '/patient/:patientId': { 
    name: 'Patient Profile', 
    icon: FiUser, 
    color: 'teal',
    dynamic: true 
  },
  '/appointment/:appointmentId': { 
    name: 'Appointment Details', 
    icon: FiCalendar, 
    color: 'purple',
    dynamic: true 
  },
  '/report/:reportId': { 
    name: 'Report Details', 
    icon: FiFileText, 
    color: 'orange',
    dynamic: true 
  },
  
  // Settings
  '/settings': { name: 'Settings', icon: FiSettings, color: 'gray' },
  '/settings/profile': { name: 'Profile Settings', icon: FiUser, color: 'blue' },
  '/settings/security': { name: 'Security', icon: FiShield, color: 'red' },
  '/settings/notifications': { name: 'Notifications', icon: FiBell, color: 'yellow' },
  '/settings/preferences': { name: 'Preferences', icon: FiSettings, color: 'green' },
  
  // Help & Support
  '/help': { name: 'Help Center', icon: FiHelpCircle, color: 'blue' },
  '/contact': { name: 'Contact Us', icon: FiPhone, color: 'green' },
  '/about': { name: 'About Us', icon: FiInfo, color: 'purple' },
  '/privacy': { name: 'Privacy Policy', icon: FiLock, color: 'gray' },
  '/terms': { name: 'Terms of Service', icon: FiFileText, color: 'gray' },
};

// History context for navigation tracking
const NavigationHistoryContext = React.createContext();

export const NavigationHistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Add current location to history
  useEffect(() => {
    const newEntry = {
      id: uuidv4(),
      path: location.pathname,
      name: getRouteName(location.pathname),
      icon: getRouteIcon(location.pathname),
      timestamp: new Date().toISOString(),
      params: location.state,
    };

    setHistory(prev => {
      // Remove duplicate if exists
      const filtered = prev.filter(item => item.path !== location.pathname);
      // Add new entry at beginning (most recent first)
      return [newEntry, ...filtered].slice(0, 50); // Keep last 50 entries
    });
  }, [location]);

  const addToFavorites = (route) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.path === route.path);
      if (exists) return prev;
      return [...prev, { ...route, favoriteId: uuidv4() }];
    });
  };

  const removeFromFavorites = (favoriteId) => {
    setFavorites(prev => prev.filter(fav => fav.favoriteId !== favoriteId));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const value = {
    history,
    favorites,
    addToFavorites,
    removeFromFavorites,
    clearHistory,
  };

  return (
    <NavigationHistoryContext.Provider value={value}>
      {children}
    </NavigationHistoryContext.Provider>
  );
};

export const useNavigationHistory = () => {
  const context = React.useContext(NavigationHistoryContext);
  if (!context) {
    throw new Error('useNavigationHistory must be used within NavigationHistoryProvider');
  }
  return context;
};

// Helper functions
const getRouteName = (pathname) => {
  // Try exact match first
  if (routeConfig[pathname]) {
    return routeConfig[pathname].name;
  }

  // Try pattern matching for dynamic routes
  for (const [pattern, config] of Object.entries(routeConfig)) {
    if (config.dynamic) {
      const match = matchPath(pattern, pathname);
      if (match) {
        // Customize name based on params if needed
        if (pattern === '/doctors/:departmentName') {
          const deptName = match.params.departmentName;
          return `${deptName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Doctors`;
        }
        return config.name;
      }
    }
  }

  // Fallback: convert path to readable name
  return pathname
    .split('/')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).replace('-', ' '))
    .join(' / ');
};

const getRouteIcon = (pathname) => {
  if (routeConfig[pathname]) {
    return routeConfig[pathname].icon;
  }

  // Try pattern matching for dynamic routes
  for (const [pattern, config] of Object.entries(routeConfig)) {
    if (config.dynamic) {
      const match = matchPath(pattern, pathname);
      if (match) {
        return config.icon;
      }
    }
  }

  return FiHome; // Default icon
};

const getRouteColor = (pathname) => {
  if (routeConfig[pathname]) {
    return routeConfig[pathname].color;
  }

  // Try pattern matching for dynamic routes
  for (const [pattern, config] of Object.entries(routeConfig)) {
    if (config.dynamic) {
      const match = matchPath(pattern, pathname);
      if (match) {
        return config.color;
      }
    }
  }

  return 'gray'; // Default color
};

// Main Breadcrumb Component
const BreadcrumbNavigator = ({ showHistory = true, showFavorites = true }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { history, favorites, addToFavorites, removeFromFavorites, clearHistory } = useNavigationHistory();
  const { isOpen: isHistoryOpen, onOpen: onHistoryOpen, onClose: onHistoryClose } = useDisclosure();
  const { isOpen: isFavoritesOpen, onOpen: onFavoritesOpen, onClose: onFavoritesClose } = useDisclosure();
  const { isOpen: isSearchOpen, onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState(false);

  // Generate breadcrumb items from current path
  const breadcrumbItems = useCallback(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const items = [{ path: '/', name: 'Home', icon: FiHome, color: 'blue' }];

    let currentPath = '';
    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      currentPath += `/${segment}`;
      
      const name = getRouteName(currentPath);
      const icon = getRouteIcon(currentPath);
      const color = getRouteColor(currentPath);
      
      items.push({
        path: currentPath,
        name,
        icon,
        color,
        isLast: i === pathSegments.length - 1,
      });
    }

    return items;
  }, [location.pathname]);

  // Search through routes
  const searchResults = Object.entries(routeConfig)
    .filter(([path, config]) => 
      config.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 10);

  // Quick navigation actions
  const quickActions = [
    { icon: FiHome, label: 'Dashboard', path: '/', color: 'blue' },
    { icon: FiCalendar, label: 'Book Appointment', path: '/book-appointment', color: 'green' },
    { icon: FiUsers, label: 'Doctors', path: '/doctors', color: 'purple' },
    { icon: MdLocalHospital, label: 'Departments', path: '/departments', color: 'orange' },
    { icon: FiBell, label: 'Notifications', path: '/notifications', color: 'yellow' },
    { icon: FiSettings, label: 'Settings', path: '/settings', color: 'gray' },
  ];

  const handleQuickAction = (path) => {
    navigate(path);
  };

  const handleAddToFavorites = () => {
    const currentRoute = {
      path: location.pathname,
      name: getRouteName(location.pathname),
      icon: getRouteIcon(location.pathname),
      color: getRouteColor(location.pathname),
    };
    
    addToFavorites(currentRoute);
    toast({
      title: 'Added to Favorites',
      description: `${currentRoute.name} added to your favorites`,
      status: 'success',
      duration: 3000,
    });
  };

  const handleCopyPath = () => {
    navigator.clipboard.writeText(location.pathname);
    toast({
      title: 'Path Copied',
      description: 'Current path copied to clipboard',
      status: 'info',
      duration: 2000,
    });
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: 'Link Copied',
      description: 'Page URL copied to clipboard',
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <>
      {/* Main Breadcrumb Bar */}
      <Card
        position="sticky"
        top="0"
        zIndex="1000"
        borderRadius="lg"
        m={1}
      >
        <CardBody p={3}>
          <HStack spacing={4} justify="space-between">
            {/* Left: Breadcrumb */}
            <Box flex={1}>
              <Breadcrumb separator={<FiChevronRight color="gray.400" />} fontSize="sm">
                {breadcrumbItems().map((item, index) => (
                  <BreadcrumbItem key={index} isCurrentPage={item.isLast}>
                    <BreadcrumbLink
                      as={item.isLast ? 'span' : 'a'}
                      href={item.isLast ? undefined : item.path}
                      onClick={(e) => {
                        if (!item.isLast) {
                          e.preventDefault();
                          navigate(item.path);
                        }
                      }}
                      color={item.isLast ? 'blue.600' : 'gray.600'}
                      fontWeight={item.isLast ? 'semibold' : 'normal'}
                    >
                      <HStack spacing={2}>
                        <Icon as={item.icon} color={`${item.color}.500`} />
                        <Text>{item.name}</Text>
                      </HStack>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                ))}
              </Breadcrumb>
            </Box>

            {/* Right: Actions */}
            <HStack spacing={2}>
              {/* Back Button */}
              <Tooltip label="Go Back">
                <IconButton
                  icon={<FiChevronLeft />}
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate(-1)}
                  aria-label="Go back"
                />
              </Tooltip>

              {/* Forward Button */}
              <Tooltip label="Go Forward">
                <IconButton
                  icon={<FiChevronRight />}
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate(1)}
                  aria-label="Go forward"
                />
              </Tooltip>

              {/* History Button */}
              {showHistory && (
                <Tooltip label="Navigation History">
                  <IconButton
                    icon={<MdHistory />}
                    size="sm"
                    variant="ghost"
                    onClick={onHistoryOpen}
                    aria-label="Navigation history"
                  />
                </Tooltip>
              )}

              {/* Favorites Button */}
              {showFavorites && (
                <Tooltip label="Favorites">
                  <IconButton
                    icon={<FiStar />}
                    size="sm"
                    variant="ghost"
                    onClick={onFavoritesOpen}
                    color={favorites.some(fav => fav.path === location.pathname) ? 'yellow.500' : 'gray.500'}
                    aria-label="Favorites"
                  />
                </Tooltip>
              )}

              {/* Search Button */}
              <Tooltip label="Quick Navigation">
                <IconButton
                  icon={<FiSearch />}
                  size="sm"
                  variant="ghost"
                  onClick={onSearchOpen}
                  aria-label="Quick navigation"
                />
              </Tooltip>

              {/* More Actions Menu */}
              <Menu>
                <Tooltip label="More Actions">
                  <MenuButton
                    as={IconButton}
                    icon={<FiMoreVertical />}
                    size="sm"
                    variant="ghost"
                    aria-label="More actions"
                  />
                </Tooltip>
                <MenuList>
                  <MenuItem icon={<FiStar />} onClick={handleAddToFavorites}>
                    Add to Favorites
                  </MenuItem>
                  <MenuItem icon={<FiShare2 />} onClick={handleShare}>
                    Share Page
                  </MenuItem>
                  <MenuItem icon={<FiCopy />} onClick={handleCopyPath}>
                    Copy Path
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem icon={<FiRefreshCw />} onClick={() => window.location.reload()}>
                    Refresh Page
                  </MenuItem>
                  <MenuItem icon={<FiHome />} onClick={() => navigate('/')}>
                    Go to Home
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </HStack>

          {/* Quick Actions Row */}
          <Collapse in={expanded}>
            <Box mt={3} pt={3} borderTopWidth="1px">
              <Wrap spacing={2}>
                {quickActions.map((action, idx) => (
                  <WrapItem key={idx}>
                    <Button
                      size="xs"
                      leftIcon={<action.icon />}
                      colorScheme={action.color}
                      variant="outline"
                      onClick={() => handleQuickAction(action.path)}
                    >
                      {action.label}
                    </Button>
                  </WrapItem>
                ))}
              </Wrap>
            </Box>
          </Collapse>
        </CardBody>
      </Card>

      {/* Navigation History Modal */}
      <Modal isOpen={isHistoryOpen} onClose={onHistoryClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack spacing={3}>
              <MdHistory />
              <Text>Navigation History</Text>
              <Badge colorScheme="blue">{history.length} visits</Badge>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {history.length === 0 ? (
              <Alert status="info" borderRadius="lg">
                <AlertIcon />
                <AlertTitle>No History</AlertTitle>
                <AlertDescription>
                  Your navigation history will appear here as you browse the app.
                </AlertDescription>
              </Alert>
            ) : (
              <TableContainer>
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Page</Th>
                      <Th>Time</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {history.slice(0, 20).map((item) => (
                      <Tr key={item.id} _hover={{ bg: 'gray.50' }}>
                        <Td>
                          <HStack spacing={2}>
                            <Icon as={item.icon} color="blue.500" />
                            <VStack align="start" spacing={0}>
                              <Text fontWeight="medium">{item.name}</Text>
                              <Text fontSize="xs" color="gray.500">{item.path}</Text>
                            </VStack>
                          </HStack>
                        </Td>
                        <Td>
                          <Text fontSize="sm">
                            {new Date(item.timestamp).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </Text>
                        </Td>
                        <Td>
                          <HStack spacing={1}>
                            <IconButton
                              icon={<FiNavigation />}
                              size="xs"
                              onClick={() => {
                                navigate(item.path);
                                onHistoryClose();
                              }}
                              aria-label="Go to page"
                            />
                            <IconButton
                              icon={<FiStar />}
                              size="xs"
                              onClick={() => addToFavorites(item)}
                              color={favorites.some(fav => fav.path === item.path) ? 'yellow.500' : 'gray.500'}
                              aria-label="Add to favorites"
                            />
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </ModalBody>
          <ModalFooter>
            <HStack spacing={3}>
              <Button
                variant="outline"
                leftIcon={<FiTrash2 />}
                onClick={clearHistory}
                isDisabled={history.length === 0}
              >
                Clear History
              </Button>
              <Button colorScheme="blue" onClick={onHistoryClose}>
                Close
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Favorites Modal */}
      <Modal isOpen={isFavoritesOpen} onClose={onFavoritesClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack spacing={3}>
              <FiStar />
              <Text>Favorite Pages</Text>
              <Badge colorScheme="yellow">{favorites.length} favorites</Badge>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {favorites.length === 0 ? (
              <Alert status="info" borderRadius="lg">
                <AlertIcon />
                <AlertTitle>No Favorites</AlertTitle>
                <AlertDescription>
                  Add pages to favorites by clicking the star icon on any page.
                </AlertDescription>
              </Alert>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {favorites.map((fav) => (
                  <Card key={fav.favoriteId} variant="outline">
                    <CardBody>
                      <HStack justify="space-between">
                        <HStack spacing={3}>
                          <Icon as={fav.icon} color={`${fav.color}.500`} boxSize={5} />
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="medium">{fav.name}</Text>
                            <Text fontSize="xs" color="gray.500">{fav.path}</Text>
                          </VStack>
                        </HStack>
                        <HStack spacing={1}>
                          <IconButton
                            icon={<FiNavigation />}
                            size="xs"
                            onClick={() => {
                              navigate(fav.path);
                              onFavoritesClose();
                            }}
                            aria-label="Go to page"
                          />
                          <IconButton
                            icon={<FiTrash2 />}
                            size="xs"
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => removeFromFavorites(fav.favoriteId)}
                            aria-label="Remove from favorites"
                          />
                        </HStack>
                      </HStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onFavoritesClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Quick Navigation Search Modal */}
      <Modal isOpen={isSearchOpen} onClose={onSearchClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack spacing={3}>
              <FiSearch />
              <Text>Quick Navigation</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup mb={4}>
              <InputLeftElement>
                <FiSearch color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search pages by name or path..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <InputRightElement>
                  <IconButton
                    icon={<FiX />}
                    size="sm"
                    variant="ghost"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  />
                </InputRightElement>
              )}
            </InputGroup>

            {searchQuery ? (
              searchResults.length > 0 ? (
                <VStack spacing={2} align="stretch">
                  {searchResults.map(([path, config]) => (
                    <Button
                      key={path}
                      variant="ghost"
                      justifyContent="start"
                      leftIcon={<config.icon />}
                      onClick={() => {
                        navigate(path);
                        onSearchClose();
                      }}
                    >
                      <VStack align="start" spacing={0} flex={1}>
                        <Text fontWeight="medium">{config.name}</Text>
                        <Text fontSize="xs" color="gray.500">{path}</Text>
                      </VStack>
                    </Button>
                  ))}
                </VStack>
              ) : (
                <Alert status="info" borderRadius="lg">
                  <AlertIcon />
                  <AlertTitle>No Results</AlertTitle>
                  <AlertDescription>
                    No pages found matching "{searchQuery}"
                  </AlertDescription>
                </Alert>
              )
            ) : (
              <>
                <Text mb={3} fontWeight="medium" color="gray.600">
                  Quick Access
                </Text>
                <Wrap spacing={2}>
                  {quickActions.map((action, idx) => (
                    <WrapItem key={idx}>
                      <Button
                        size="sm"
                        leftIcon={<action.icon />}
                        colorScheme={action.color}
                        variant="outline"
                        onClick={() => {
                          handleQuickAction(action.path);
                          onSearchClose();
                        }}
                      >
                        {action.label}
                      </Button>
                    </WrapItem>
                  ))}
                </Wrap>

                <Divider my={4} />

                <Text mb={3} fontWeight="medium" color="gray.600">
                  Recent History
                </Text>
                {history.slice(0, 5).map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    justifyContent="start"
                    leftIcon={<item.icon />}
                    onClick={() => {
                      navigate(item.path);
                      onSearchClose();
                    }}
                    mb={2}
                    w="100%"
                  >
                    <VStack align="start" spacing={0} flex={1}>
                      <Text>{item.name}</Text>
                      <Text fontSize="xs" color="gray.500">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Text>
                    </VStack>
                  </Button>
                ))}
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

// Standalone Breadcrumb Page for Full Navigation
export const BreadcrumbNavigationPage = () => {
  const { history, favorites, clearHistory } = useNavigationHistory();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('history');

  const stats = {
    totalVisits: history.length,
    uniquePages: new Set(history.map(h => h.path)).size,
    favoritePages: favorites.length,
    mostVisited: history.reduce((acc, curr) => {
      acc[curr.path] = (acc[curr.path] || 0) + 1;
      return acc;
    }, {}),
  };

  const mostVisitedPages = Object.entries(stats.mostVisited)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([path, count]) => ({
      path,
      count,
      ...history.find(h => h.path === path),
    }));

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box>
          <Heading size="xl" mb={2}>Navigation Center</Heading>
          <Text color="gray.600">Manage your browsing history, favorites, and quick navigation</Text>
        </Box>

        {/* Stats Cards */}
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Total Visits</StatLabel>
                <StatNumber>{stats.totalVisits}</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Unique Pages</StatLabel>
                <StatNumber>{stats.uniquePages}</StatNumber>
                <StatHelpText>Across the app</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Favorites</StatLabel>
                <StatNumber>{stats.favoritePages}</StatNumber>
                <StatHelpText>Saved pages</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Most Active</StatLabel>
                <StatNumber>{mostVisitedPages[0]?.count || 0}</StatNumber>
                <StatHelpText>Top page visits</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Tabs */}
        <Tabs>
          <TabList>
            <Tab>
              <HStack spacing={2}>
                <MdHistory />
                <Text>History</Text>
                <Badge colorScheme="blue">{history.length}</Badge>
              </HStack>
            </Tab>
            <Tab>
              <HStack spacing={2}>
                <FiStar />
                <Text>Favorites</Text>
                <Badge colorScheme="yellow">{favorites.length}</Badge>
              </HStack>
            </Tab>
            <Tab>
              <HStack spacing={2}>
                <FiTrendingUp />
                <Text>Analytics</Text>
              </HStack>
            </Tab>
            <Tab>
              <HStack spacing={2}>
                <FiSettings />
                <Text>Settings</Text>
              </HStack>
            </Tab>
          </TabList>

          <TabPanels>
            {/* History Tab */}
            <TabPanel>
              <Card>
                <CardHeader>
                  <HStack justify="space-between">
                    <Heading size="md">Browsing History</Heading>
                    <Button
                      leftIcon={<FiTrash2 />}
                      variant="outline"
                      colorScheme="red"
                      onClick={clearHistory}
                      isDisabled={history.length === 0}
                    >
                      Clear All History
                    </Button>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Page</Th>
                          <Th>Last Visited</Th>
                          <Th>Visit Count</Th>
                          <Th>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {history.slice(0, 20).map((item) => (
                          <Tr key={item.id}>
                            <Td>
                              <HStack spacing={3}>
                                <Icon as={item.icon} color="blue.500" />
                                <VStack align="start" spacing={0}>
                                  <Text fontWeight="medium">{item.name}</Text>
                                  <Text fontSize="sm" color="gray.500">{item.path}</Text>
                                </VStack>
                              </HStack>
                            </Td>
                            <Td>
                              <Text>{new Date(item.timestamp).toLocaleDateString()}</Text>
                              <Text fontSize="sm" color="gray.500">
                                {new Date(item.timestamp).toLocaleTimeString()}
                              </Text>
                            </Td>
                            <Td>
                              <Badge colorScheme="blue">
                                {stats.mostVisited[item.path] || 1}
                              </Badge>
                            </Td>
                            <Td>
                              <HStack spacing={2}>
                                <IconButton
                                  icon={<FiNavigation />}
                                  size="sm"
                                  onClick={() => navigate(item.path)}
                                  aria-label="Navigate"
                                />
                                <IconButton
                                  icon={<FiEye />}
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => window.open(item.path, '_blank')}
                                  aria-label="Open in new tab"
                                />
                              </HStack>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </CardBody>
              </Card>
            </TabPanel>

            {/* Favorites Tab */}
            <TabPanel>
              <Card>
                <CardHeader>
                  <Heading size="md">Favorite Pages</Heading>
                </CardHeader>
                <CardBody>
                  {favorites.length === 0 ? (
                    <Alert status="info" borderRadius="lg">
                      <AlertIcon />
                      <AlertTitle>No Favorites Yet</AlertTitle>
                      <AlertDescription>
                        Add pages to favorites by clicking the star icon on any page.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                      {favorites.map((fav) => (
                        <Card key={fav.favoriteId} variant="outline">
                          <CardBody>
                            <VStack spacing={3} align="start">
                              <HStack spacing={3}>
                                <Icon as={fav.icon} color={`${fav.color}.500`} boxSize={6} />
                                <Box>
                                  <Text fontWeight="bold">{fav.name}</Text>
                                  <Text fontSize="sm" color="gray.500">{fav.path}</Text>
                                </Box>
                              </HStack>
                              <HStack spacing={2} w="100%">
                                <Button
                                  size="sm"
                                  leftIcon={<FiNavigation />}
                                  flex={1}
                                  onClick={() => navigate(fav.path)}
                                >
                                  Navigate
                                </Button>
                                <IconButton
                                  icon={<FiTrash2 />}
                                  size="sm"
                                  colorScheme="red"
                                  variant="outline"
                                //   onClick={() => removeFromFavorites(fav.favoriteId)}
                                />
                              </HStack>
                            </VStack>
                          </CardBody>
                        </Card>
                      ))}
                    </SimpleGrid>
                  )}
                </CardBody>
              </Card>
            </TabPanel>

            {/* Analytics Tab */}
            <TabPanel>
              <Card>
                <CardHeader>
                  <Heading size="md">Navigation Analytics</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={6} align="stretch">
                    <Box>
                      <Text fontWeight="medium" mb={3}>Most Visited Pages</Text>
                      {mostVisitedPages.map((page, idx) => (
                        <HStack key={idx} justify="space-between" p={3} bg="gray.50" borderRadius="md" mb={2}>
                          <HStack spacing={3}>
                            <Icon as={page.icon} color="blue.500" />
                            <Box>
                              <Text fontWeight="medium">{page.name}</Text>
                              <Text fontSize="sm" color="gray.500">{page.path}</Text>
                            </Box>
                          </HStack>
                          <Badge colorScheme="blue" fontSize="lg">{page.count} visits</Badge>
                        </HStack>
                      ))}
                    </Box>

                    <Box>
                      <Text fontWeight="medium" mb={3}>Recent Activity Timeline</Text>
                      <VStack align="stretch" spacing={2}>
                        {history.slice(0, 10).map((item, idx) => (
                          <HStack key={item.id} justify="space-between" p={2} borderBottomWidth="1px">
                            <HStack spacing={3}>
                              <Icon as={item.icon} color="gray.500" boxSize={4} />
                              <Text fontSize="sm">{item.name}</Text>
                            </HStack>
                            <Text fontSize="sm" color="gray.500">
                              {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Text>
                          </HStack>
                        ))}
                      </VStack>
                    </Box>
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>

            {/* Settings Tab */}
            <TabPanel>
              <Card>
                <CardHeader>
                  <Heading size="md">Breadcrumb Settings</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={6} align="stretch">
                    <FormControl>
                      <FormLabel>History Retention</FormLabel>
                      <Select defaultValue="50">
                        <option value="25">Last 25 pages</option>
                        <option value="50">Last 50 pages</option>
                        <option value="100">Last 100 pages</option>
                        <option value="unlimited">Unlimited</option>
                      </Select>
                      <FormHelperText>How many pages to keep in history</FormHelperText>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Breadcrumb Style</FormLabel>
                      <Select defaultValue="default">
                        <option value="default">Default (Chakra UI)</option>
                        <option value="compact">Compact</option>
                        <option value="detailed">Detailed with icons</option>
                        <option value="minimal">Minimal</option>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <Checkbox defaultChecked>Show history button</Checkbox>
                    </FormControl>

                    <FormControl>
                      <Checkbox defaultChecked>Show favorites button</Checkbox>
                    </FormControl>

                    <FormControl>
                      <Checkbox defaultChecked>Enable quick navigation</Checkbox>
                    </FormControl>

                    <Button colorScheme="blue" leftIcon={<FiSave />}>
                      Save Settings
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

// Usage instructions component
export const BreadcrumbUsage = () => (
  <Card variant="outline" mt={8}>
    <CardHeader>
      <Heading size="md">How to Use Breadcrumb Navigator</Heading>
    </CardHeader>
    <CardBody>
      <VStack spacing={4} align="start">
        <Text>
          The Breadcrumb Navigator provides advanced navigation features for your hospital management app.
        </Text>
        <Box>
          <Text fontWeight="bold" mb={2}>Features:</Text>
          <VStack align="start" spacing={1}>
            <HStack><FiCheck color="green" /><Text>Dynamic breadcrumbs showing current location</Text></HStack>
            <HStack><FiCheck color="green" /><Text>Navigation history tracking</Text></HStack>
            <HStack><FiCheck color="green" /><Text>Favorite pages bookmarking</Text></HStack>
            <HStack><FiCheck color="green" /><Text>Quick navigation search</Text></HStack>
            <HStack><FiCheck color="green" /><Text>Back/Forward navigation buttons</Text></HStack>
            <HStack><FiCheck color="green" /><Text>Page sharing and copying</Text></HStack>
          </VStack>
        </Box>
        <Box>
          <Text fontWeight="bold" mb={2}>Integration:</Text>
          <Text>1. Wrap your app with NavigationHistoryProvider</Text>
          <Text>2. Add BreadcrumbNavigator to your main layout</Text>
          <Text>3. Customize routeConfig for your specific routes</Text>
        </Box>
      </VStack>
    </CardBody>
  </Card>
);

export default BreadcrumbNavigator;