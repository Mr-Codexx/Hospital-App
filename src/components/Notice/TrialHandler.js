import React, { useState, useEffect, useRef } from 'react';
import {
  Modal, ModalBody, ModalContent, ModalOverlay,
  Button, Box, Text, Heading, Avatar, VStack, HStack, 
  Badge, Divider, Alert, AlertIcon, AlertTitle, AlertDescription,
  useColorModeValue, useToast, Portal
} from "@chakra-ui/react";
import { FiPhone, FiExternalLink, FiMessageSquare, FiCopy, FiCheck, FiClock, FiX } from "react-icons/fi";
import { SiWhatsapp, SiGmail } from "react-icons/si";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const TrialHandler = ({ children }) => {
  const [trialState, setTrialState] = useState('checking');
  const [timeLeft, setTimeLeft] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [showFloatingModal, setShowFloatingModal] = useState(false);
  const [hasCopiedWhatsapp, setHasCopiedWhatsapp] = useState(false);
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false);
  const [circlePosition, setCirclePosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const circleRef = useRef(null);
  const toast = useToast();
  
  // Use hooks at the top level
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const floatingCircleBg = useColorModeValue('red.500', 'red.600');
  const floatingCircleColor = useColorModeValue('white', 'gray.100');
  
  // Trial end time (8 PM today)
  const trialEndTime = new Date();
  trialEndTime.setHours(23, 59, 0, 0); // 8 PM today
  
  // Admin information
  const adminInfo = {
    name: "Sachin Sharma",
    role: "Full Stack Developer",
    availability: "Available 24/7",
    whatsapp: "7906310812",
    email: "mrsachinsharma.dev@gmail.com",
    avatar: "/assets/Sachin.png"
  };

  // Animations
  const rotateAnimation = {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Calculate time left
  const calculateTimeLeft = () => {
    const now = new Date();
    const diff = trialEndTime - now;

    if (diff <= 0) {
      setTrialState('expired');
      setTimeLeft('00:00:00');
      return;
    }

    const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
    const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

    setTimeLeft(`${hours}:${minutes}:${seconds}`);
    
    // Auto-show warning modal if less than 1 hour remaining
    if (diff < 3600000 && !localStorage.getItem('trial_warning_shown')) {
      setShowWarning(true);
      localStorage.setItem('trial_warning_shown', 'true');
    }
  };

  // Handle contact methods
  const handleContactAdmin = (method) => {
    switch(method) {
      case 'whatsapp':
        window.open(`https://wa.me/${adminInfo.whatsapp}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:${adminInfo.email}`, '_blank');
        break;
      case 'call':
        window.open(`tel:${adminInfo.whatsapp}`, '_blank');
        break;
      default:
        break;
    }
  };

  // Copy functions
  const onCopyWhatsapp = () => {
    navigator.clipboard.writeText(adminInfo.whatsapp);
    setHasCopiedWhatsapp(true);
    setTimeout(() => setHasCopiedWhatsapp(false), 2000);
  };

  const onCopyEmail = () => {
    navigator.clipboard.writeText(adminInfo.email);
    setHasCopiedEmail(true);
    setTimeout(() => setHasCopiedEmail(false), 2000);
  };

  // Dragging handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const rect = circleRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const x = e.clientX - dragOffset.x;
    const y = e.clientY - dragOffset.y;
    
    // Keep within viewport bounds
    const maxX = window.innerWidth - 60;
    const maxY = window.innerHeight - 60;
    
    setCirclePosition({
      x: Math.max(10, Math.min(x, maxX)),
      y: Math.max(10, Math.min(y, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Initialize trial state
  useEffect(() => {
    // Check if trial has expired
    const now = new Date();
    if (now > trialEndTime) {
      setTrialState('expired');
      return;
    }

    // Check if notice was shown before
    const noticeSeen = localStorage.getItem("trial_notice_seen");
    if (!noticeSeen) {
      setTrialState('notice');
    } else {
      setTrialState('active');
    }

    // Start countdown timer
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    // Add event listeners for dragging
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      clearInterval(timer);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Loading state while checking
  if (trialState === 'checking') {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Text>Loading trial information...</Text>
      </Box>
    );
  }

  // If trial expired, show only the expired page
  if (trialState === 'expired') {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" p={4}>
        <Box
          bg={cardBg}
          borderRadius="2xl"
          p={8}
          boxShadow="2xl"
          borderWidth="1px"
          borderColor={borderColor}
          position="relative"
          overflow="hidden"
          maxW="500px"
          w="100%"
        >
          <MotionBox
            position="absolute"
            top="-50px"
            right="-50px"
            w="200px"
            h="200px"
            borderRadius="full"
            bg="rgba(66, 153, 225, 0.05)"
            animate={rotateAnimation}
          />

          <VStack spacing={6} align="stretch" position="relative" zIndex="1">
            <Box textAlign="center">
              <MotionBox animate={floatingAnimation}>
                <Avatar size="2xl" src={adminInfo.avatar} />
              </MotionBox>
              <Heading size="xl" mb={2} color="red.500">
                ⚠️ Trial Expired
              </Heading>
              <Text fontSize="lg" color="gray.500" fontWeight="medium">
                This trial period has ended
              </Text>
              <Badge colorScheme="red" mt={2} px={3} py={1}>
                Contact to Continue
              </Badge>
            </Box>

            <Divider />

            <Text textAlign="center">
              To continue using this website, please contact <b>Sachin Sharma</b>.
              All features are temporarily disabled until the trial is renewed.
            </Text>

            <Box>
              <Heading size="md" mb={4}>
                <HStack>
                  <FiMessageSquare />
                  <Text>Contact for Immediate Support</Text>
                </HStack>
              </Heading>

              <VStack spacing={4} align="stretch">
                <MotionButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  colorScheme="green"
                  leftIcon={<SiWhatsapp />}
                  rightIcon={<FiExternalLink />}
                  size="lg"
                  onClick={() => handleContactAdmin('whatsapp')}
                  justifyContent="space-between"
                  px={6}
                >
                  <HStack spacing={3} flex="1" justify="space-between">
                    <Text>WhatsApp</Text>
                    <HStack spacing={2}>
                      <Text fontSize="sm" opacity={0.8}>
                        {adminInfo.whatsapp}
                      </Text>
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCopyWhatsapp();
                          toast({
                            title: 'Copied!',
                            description: 'Phone number copied to clipboard',
                            status: 'success',
                            duration: 2000,
                          });
                        }}
                      >
                        {hasCopiedWhatsapp ? <FiCheck /> : <FiCopy />}
                      </Button>
                    </HStack>
                  </HStack>
                </MotionButton>

                <MotionButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  colorScheme="red"
                  leftIcon={<SiGmail />}
                  rightIcon={<FiExternalLink />}
                  size="lg"
                  onClick={() => handleContactAdmin('email')}
                  justifyContent="space-between"
                  px={6}
                >
                  <HStack spacing={3} flex="1" justify="space-between">
                    <Text>Email</Text>
                    <HStack spacing={2}>
                      <Text fontSize="sm" opacity={0.8} isTruncated>
                        {adminInfo.email}
                      </Text>
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCopyEmail();
                          toast({
                            title: 'Copied!',
                            description: 'Email copied to clipboard',
                            status: 'success',
                            duration: 2000,
                          });
                        }}
                      >
                        {hasCopiedEmail ? <FiCheck /> : <FiCopy />}
                      </Button>
                    </HStack>
                  </HStack>
                </MotionButton>

                <MotionButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  colorScheme="blue"
                  leftIcon={<FiPhone />}
                  rightIcon={<FiExternalLink />}
                  size="lg"
                  onClick={() => handleContactAdmin('call')}
                  px={6}
                >
                  <HStack spacing={3} flex="1" justify="space-between">
                    <Text>Direct Call</Text>
                    <Text fontSize="sm" opacity={0.8}>
                      {adminInfo.whatsapp}
                    </Text>
                  </HStack>
                </MotionButton>
              </VStack>
            </Box>

            <Divider />

            <Alert
              status="info"
              variant="subtle"
              borderRadius="lg"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
            >
              <AlertIcon />
              <AlertTitle mb={2}>Estimated Response Time</AlertTitle>
              <AlertDescription>
                <Text fontSize="2xl" fontWeight="bold">
                  15-30 minutes
                </Text>
                <Text fontSize="sm" opacity={0.8}>
                  Average time to respond and renew trial
                </Text>
              </AlertDescription>
            </Alert>
          </VStack>
        </Box>
      </Box>
    );
  }

  // Format time for display in circle
  const formatTimeForCircle = () => {
    if (!timeLeft) return "00:00";
    const [hours, minutes] = timeLeft.split(':');
    return `${hours}:${minutes}`;
  };

  return (
    <>
      {/* Notice Modal for first visit */}
      <Modal isOpen={trialState === 'notice'} onClose={() => setTrialState('active')} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="2xl" p={4} mx={4}>
          <ModalBody>
            <VStack spacing={5}>
              <MotionBox animate={floatingAnimation}>
                <Avatar size="2xl" src={adminInfo.avatar} />
              </MotionBox>

              <Heading size="lg" textAlign="center">
                ⚠️ Trial Website Notice
              </Heading>

              <Text textAlign="center" fontSize="md">
                This is a <b>trial website</b> developed by <b>Sachin Sharma</b>.
                You can explore the features, but the trial will end at 11:59 PM today.
              </Text>

              <Box textAlign="center">
                <Text fontSize="lg" color="red.500" fontWeight="bold">
                  Time Remaining: {timeLeft}
                </Text>
              </Box>

              <Divider />

              <Heading size="md">Contact Developer</Heading>

              <VStack w="100%">
                <Button
                  colorScheme="green"
                  leftIcon={<SiWhatsapp />}
                  rightIcon={<FiExternalLink />}
                  w="100%"
                  onClick={() => handleContactAdmin('whatsapp')}
                >
                  WhatsApp
                </Button>

                <Button
                  colorScheme="red"
                  leftIcon={<SiGmail />}
                  rightIcon={<FiExternalLink />}
                  w="100%"
                  onClick={() => handleContactAdmin('email')}
                >
                  Email
                </Button>

                <Button
                  colorScheme="blue"
                  leftIcon={<FiPhone />}
                  rightIcon={<FiExternalLink />}
                  w="100%"
                  onClick={() => handleContactAdmin('call')}
                >
                  Call
                </Button>
              </VStack>

              <Button 
                colorScheme="blue" 
                onClick={() => {
                  localStorage.setItem("trial_notice_seen", "true");
                  setTrialState('active');
                }}
                w="100%"
              >
                Continue to Website
              </Button>

              <Text fontSize="xs" opacity={0.7} textAlign="center">
                A floating timer will appear in the corner. Click it to see this information again.
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Warning Modal for last hour */}
      <Modal isOpen={showWarning} onClose={() => setShowWarning(false)} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="2xl" p={4} mx={4}>
          <ModalBody>
            <VStack spacing={4} textAlign="center">
              <Heading size="lg" color="orange.500">
                ⏰ Trial Ending Soon!
              </Heading>
              <Text>
                Your trial period ends in less than 1 hour ({timeLeft} remaining).
                Contact the developer to extend your access.
              </Text>
              <Button 
                colorScheme="orange" 
                onClick={() => setShowWarning(false)}
                w="100%"
              >
                Understood
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Floating Modal (from circle click) */}
      <Modal isOpen={showFloatingModal} onClose={() => setShowFloatingModal(false)} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="2xl" p={4} mx={4}>
          <ModalBody>
            <VStack spacing={4}>
              <HStack justify="space-between" w="100%">
                <Heading size="md">Trial Information</Heading>
                <Button size="sm" variant="ghost" onClick={() => setShowFloatingModal(false)}>
                  <FiX />
                </Button>
              </HStack>
              
              <Box textAlign="center" p={4} bg="red.50" borderRadius="lg" w="100%">
                <Text fontSize="sm" color="gray.600">Time Remaining</Text>
                <Text fontSize="2xl" fontWeight="bold" color="red.600">
                  {timeLeft}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Trial ends today at 8:00 PM
                </Text>
              </Box>

              <Divider />

              <VStack w="100%" spacing={3}>
                <Button
                  colorScheme="green"
                  leftIcon={<SiWhatsapp />}
                  w="100%"
                  onClick={() => handleContactAdmin('whatsapp')}
                >
                  Contact via WhatsApp
                </Button>

                <Button
                  colorScheme="red"
                  leftIcon={<SiGmail />}
                  w="100%"
                  onClick={() => handleContactAdmin('email')}
                >
                  Contact via Email
                </Button>

                <Button
                  colorScheme="blue"
                  leftIcon={<FiPhone />}
                  w="100%"
                  onClick={() => handleContactAdmin('call')}
                >
                  Contact via Call
                </Button>
              </VStack>

              <Text fontSize="xs" opacity={0.7} textAlign="center">
                Developed by Sachin Sharma • Drag the timer circle to move it
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Render children (your main website) */}
      {children}

      {/* Draggable Floating Circle */}
      <Portal>
        <MotionBox
          ref={circleRef}
          position="fixed"
          left={`${circlePosition.x}px`}
          top={`${circlePosition.y}px`}
          w="60px"
          h="60px"
          borderRadius="full"
          bg={floatingCircleBg}
          color={floatingCircleColor}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="2xl"
          cursor={isDragging ? "grabbing" : "grab"}
          zIndex="9999"
          onMouseDown={handleMouseDown}
          animate={pulseAnimation}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => !isDragging && setShowFloatingModal(true)}
          style={{
            userSelect: 'none',
            touchAction: 'none'
          }}
        >
          <VStack spacing={0}>
            <FiClock size={20} />
            <Text fontSize="xs" fontWeight="bold">
              {formatTimeForCircle()}
            </Text>
          </VStack>
          
          {/* Small drag handle indicator */}
          <Box
            position="absolute"
            bottom="2px"
            width="20px"
            height="3px"
            bg="rgba(255,255,255,0.5)"
            borderRadius="full"
          />
        </MotionBox>
      </Portal>
    </>
  );
};

export default TrialHandler;