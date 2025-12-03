import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Box,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MobileNav from './MobileNav';

export default function MainLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // sidebar width state
  const [sidebarWidth, setSidebarWidth] = useState(240);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>

      {/* DESKTOP SIDEBAR */}
      <Sidebar
        onClose={onClose}
        display={{ base: 'none', md: 'block' }}
        onToggle={(collapsed) => setSidebarWidth(collapsed ? 70 : 240)}
      />

      {/* MOBILE SIDEBAR */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        size="full"
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* MOBILE TOP NAV */}
      <MobileNav onOpen={onOpen} />

      {/* MAIN CONTENT */}
      <Box
        ml={{ base: 0, md: `${sidebarWidth}px` }}
        transition="all 0.3s ease"
        p="2"
      >
        <TopBar />

        <Box
          bg={useColorModeValue('white', 'gray.800')}
          borderRadius="lg"
          p={6}
          mt={6}
          shadow="sm"
          minH="calc(100vh - 160px)"
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
