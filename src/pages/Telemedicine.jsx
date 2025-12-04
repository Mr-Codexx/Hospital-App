import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Badge,
  Avatar,
  IconButton,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Select,
  Textarea,
  Divider,
  Flex,
  Spinner,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  WrapItem,
  Tooltip,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Image,
  AspectRatio,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Radio,
  RadioGroup,
  Stack,
  Checkbox,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Tag,
  TagLabel,
  TagLeftIcon,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  InputGroup,
    InputLeftElement,
} from '@chakra-ui/react';
import {
  FiVideo,
  FiPhone,
  FiMessageSquare,
  FiCalendar,
  FiClock,
  FiUser,
  FiStar,
  FiMapPin,
  FiMail,
  FiFilter,
  FiSearch,
  FiCheck,
  FiX,
  FiChevronRight,
  FiChevronLeft,
  FiDollarSign,
  FiBriefcase,
  FiHeart,
  FiShield,
  FiLock,
  FiLogIn,
  FiUserPlus,
  FiDownload,
  FiShare2,
  FiArrowLeft,
  FiHome,
  FiActivity,
  FiUsers,
  FiAward,
  FiFileText,
  FiGlobe,
  FiBookOpen,
  FiCamera,
  FiMic,
  FiMicOff,
  FiVideoOff,
  FiUpload,
  FiPaperclip,
  FiCopy,
  FiEdit,
  FiTrash2,
  FiEye,
  FiBell,
  FiSettings,
  FiHelpCircle,
  FiRotateCcw,
  FiPause,
  FiStopCircle,
  FiMaximize2,
  FiMinimize2,
  FiMoreVertical,
  FiHeadphones,
  FiWifi,
  FiBattery,
  FiVolume2,
  FiVolumeX,
  FiGrid,
  FiList,
  FiThumbsUp,
} from 'react-icons/fi';
import {
  MdAccessTime,
  MdDateRange,
  MdLocalHospital,
  MdHealthAndSafety,
  MdEmergency,
  MdPayment,
  MdVerifiedUser,
  MdSchool,
  MdWork,
  MdLanguage,
  MdLocationOn,
  MdScreenShare,
  MdRecordVoiceOver,
  MdVideocam,
  MdVideocamOff,
  MdCall,
  MdCallEnd,
  MdChat,
  MdAttachFile,
  MdEmojiEmotions,
  MdSend,
  MdNotifications,
  MdPeople,
  MdHistory,
  MdSchedule,
  MdCheckCircle,
  MdCancel,
  MdPending,
} from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import { useHospitalDataContext } from '../context/HospitalDataContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, addDays, isToday, isTomorrow } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

// Video call component
const VideoCallComponent = ({ isActive, onEndCall, doctor }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callQuality, setCallQuality] = useState('good'); // good, average, poor
  const [networkStatus, setNetworkStatus] = useState({
    latency: 45,
    jitter: 12,
    packetLoss: 0.2,
    bandwidth: '5.2 Mbps'
  });

  const bgColor = useColorModeValue('gray.900', 'gray.800');
  const controlBg = useColorModeValue('rgba(0,0,0,0.7)', 'rgba(26,32,44,0.9)');
  const textColor = useColorModeValue('white', 'gray.100');

  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
        
        // Simulate network changes
        setNetworkStatus(prev => ({
          latency: Math.max(20, Math.min(120, prev.latency + (Math.random() - 0.5) * 10)),
          jitter: Math.max(5, Math.min(30, prev.jitter + (Math.random() - 0.5) * 5)),
          packetLoss: Math.max(0, Math.min(5, prev.packetLoss + (Math.random() - 0.5) * 0.5)),
          bandwidth: `${(4 + Math.random() * 2).toFixed(1)} Mbps`
        }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getQualityColor = () => {
    switch(callQuality) {
      case 'good': return 'green.500';
      case 'average': return 'yellow.500';
      case 'poor': return 'red.500';
      default: return 'gray.500';
    }
  };

  return (
    <Box 
      position="relative" 
      bg={bgColor} 
      borderRadius="xl" 
      overflow="hidden"
      h="500px"
    >
      {/* Doctor Video */}
      <AspectRatio ratio={16/9} h="100%">
        <Box 
          bg="gray.800" 
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* Doctor Info */}
          <VStack spacing={3} zIndex={2}>
            <Avatar
              size="2xl"
              name={doctor?.name}
              src={doctor?.profileImage}
              border="4px solid"
              borderColor="blue.500"
            />
            <VStack spacing={1}>
              <Heading size="lg" color="white">{doctor?.name}</Heading>
              <Text color="blue.300">{doctor?.specialization}</Text>
              <Badge colorScheme="green" fontSize="md">LIVE</Badge>
            </VStack>
          </VStack>

          {/* Network Status Overlay */}
          <Box
            position="absolute"
            top="4"
            left="4"
            bg={controlBg}
            color="white"
            p={2}
            borderRadius="md"
            fontSize="xs"
          >
            <HStack spacing={3}>
              <Tooltip label="Network Latency">
                <HStack spacing={1}>
                  <FiWifi />
                  <Text>{networkStatus.latency}ms</Text>
                </HStack>
              </Tooltip>
              <Tooltip label="Bandwidth">
                <HStack spacing={1}>
                  <FiActivity />
                  <Text>{networkStatus.bandwidth}</Text>
                </HStack>
              </Tooltip>
            </HStack>
          </Box>

          {/* Call Duration */}
          <Box
            position="absolute"
            top="4"
            right="4"
            bg={controlBg}
            color="white"
            p={2}
            borderRadius="md"
            fontSize="lg"
            fontWeight="bold"
          >
            {formatDuration(callDuration)}
          </Box>

          {/* Quality Indicator */}
          <Box
            position="absolute"
            bottom="4"
            left="4"
            bg={controlBg}
            color="white"
            p={2}
            borderRadius="md"
          >
            <HStack spacing={2}>
              <Box w="3" h="3" borderRadius="full" bg={getQualityColor()} />
              <Text fontSize="sm">Connection {callQuality}</Text>
            </HStack>
          </Box>
        </Box>
      </AspectRatio>

      {/* Self View */}
      <Box
        position="absolute"
        bottom="20"
        right="4"
        w="160px"
        h="120px"
        bg="gray.700"
        borderRadius="lg"
        overflow="hidden"
        border="2px solid"
        borderColor="blue.500"
      >
        <Box position="relative" w="100%" h="100%">
          <Box
            w="100%"
            h="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="gray.800"
          >
            <VStack spacing={2}>
              <Avatar size="md" name="You" />
              <Text fontSize="xs" color="white">You</Text>
            </VStack>
          </Box>
          {isVideoOff && (
            <Badge 
              position="absolute" 
              top="2" 
              left="2" 
              colorScheme="red"
            >
              Video Off
            </Badge>
          )}
        </Box>
      </Box>

      {/* Call Controls */}
      <Box
        position="absolute"
        bottom="4"
        left="0"
        right="0"
        bg={controlBg}
        p={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <HStack spacing={6}>
          {/* Mute/Unmute */}
          <Tooltip label={isMuted ? "Unmute" : "Mute"}>
            <IconButton
              icon={isMuted ? <FiMicOff /> : <FiMic />}
              aria-label={isMuted ? "Unmute" : "Mute"}
              colorScheme={isMuted ? "red" : "gray"}
              isRound
              size="lg"
              onClick={() => setIsMuted(!isMuted)}
            />
          </Tooltip>

          {/* Video On/Off */}
          <Tooltip label={isVideoOff ? "Turn Video On" : "Turn Video Off"}>
            <IconButton
              icon={isVideoOff ? <MdVideocamOff /> : <MdVideocam />}
              aria-label={isVideoOff ? "Turn Video On" : "Turn Video Off"}
              colorScheme={isVideoOff ? "red" : "gray"}
              isRound
              size="lg"
              onClick={() => setIsVideoOff(!isVideoOff)}
            />
          </Tooltip>

          {/* Screen Share */}
          <Tooltip label={isScreenSharing ? "Stop Sharing" : "Share Screen"}>
            <IconButton
              icon={<MdScreenShare />}
              aria-label="Share Screen"
              colorScheme={isScreenSharing ? "blue" : "gray"}
              isRound
              size="lg"
              onClick={() => setIsScreenSharing(!isScreenSharing)}
            />
          </Tooltip>

          {/* Record */}
          <Tooltip label={isRecording ? "Stop Recording" : "Start Recording"}>
            <IconButton
              icon={isRecording ? <FiStopCircle /> : <MdRecordVoiceOver />}
              aria-label={isRecording ? "Stop Recording" : "Start Recording"}
              colorScheme={isRecording ? "red" : "gray"}
              isRound
              size="lg"
              onClick={() => setIsRecording(!isRecording)}
            />
          </Tooltip>

          {/* End Call */}
          <Tooltip label="End Call">
            <IconButton
              icon={<MdCallEnd />}
              aria-label="End Call"
              colorScheme="red"
              isRound
              size="lg"
              onClick={onEndCall}
            />
          </Tooltip>

          {/* Fullscreen */}
          <Tooltip label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
            <IconButton
              icon={isFullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
              aria-label="Fullscreen"
              colorScheme="gray"
              isRound
              size="lg"
              onClick={() => setIsFullscreen(!isFullscreen)}
            />
          </Tooltip>
        </HStack>
      </Box>
    </Box>
  );
};

// Chat Component
const ChatComponent = ({ doctor, isActive }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: 'doctor', time: '10:00 AM' },
    { id: 2, text: "I'm having headache and fever since yesterday", sender: 'patient', time: '10:01 AM' },
    { id: 3, text: "Any other symptoms?", sender: 'doctor', time: '10:02 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef(null);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const messageBg = useColorModeValue('blue.50', 'blue.900');
  const patientMessageBg = useColorModeValue('green.50', 'green.900');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'patient',
      time: format(new Date(), 'hh:mm a')
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate doctor typing and response
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        "I understand. How severe is the pain on a scale of 1-10?",
        "Have you taken any medication?",
        "Any history of migraines?",
        "Let me prescribe something for your symptoms."
      ];
      
      const doctorMessage = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'doctor',
        time: format(new Date(), 'hh:mm a')
      };

      setMessages(prev => [...prev, doctorMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: `File: ${file.name}`,
          sender: 'patient',
          time: format(new Date(), 'hh:mm a'),
          file: file
        }
      ]);
    }
  };

  return (
    <Card h="100%" display="flex" flexDirection="column">
      <CardHeader borderBottom="1px" borderColor={borderColor}>
        <HStack justify="space-between">
          <HStack spacing={3}>
            <Avatar size="sm" name={doctor?.name} src={doctor?.profileImage} />
            <Box>
              <Text fontWeight="bold">{doctor?.name}</Text>
              <Badge colorScheme="green" fontSize="xs">Online</Badge>
            </Box>
          </HStack>
          <IconButton icon={<FiMoreVertical />} size="sm" variant="ghost" />
        </HStack>
      </CardHeader>

      <CardBody flex={1} overflowY="auto">
        <VStack spacing={3} align="stretch">
          {messages.map((message) => (
            <Box
              key={message.id}
              alignSelf={message.sender === 'patient' ? 'flex-end' : 'flex-start'}
              maxW="80%"
            >
              <Box
                bg={message.sender === 'patient' ? patientMessageBg : messageBg}
                p={3}
                borderRadius="lg"
                borderTopLeftRadius={message.sender === 'patient' ? 'lg' : '0'}
                borderTopRightRadius={message.sender === 'patient' ? '0' : 'lg'}
              >
                <Text>{message.text}</Text>
                {message.file && (
                  <Box mt={2} p={2} bg="white" borderRadius="md">
                    <HStack>
                      <FiPaperclip />
                      <Text fontSize="sm">{message.file.name}</Text>
                    </HStack>
                  </Box>
                )}
                <Text fontSize="xs" color="gray.500" mt={1}>
                  {message.time}
                </Text>
              </Box>
            </Box>
          ))}
          
          {isTyping && (
            <Box alignSelf="flex-start">
              <HStack spacing={2} p={3} bg={messageBg} borderRadius="lg">
                <Box w="2" h="2" bg="blue.500" borderRadius="full" opacity={0.6} animation="pulse 1s infinite" />
                <Box w="2" h="2" bg="blue.500" borderRadius="full" opacity={0.6} animation="pulse 1s infinite" animationDelay="0.2s" />
                <Box w="2" h="2" bg="blue.500" borderRadius="full" opacity={0.6} animation="pulse 1s infinite" animationDelay="0.4s" />
              </HStack>
            </Box>
          )}
        </VStack>
      </CardBody>

      <CardFooter borderTop="1px" borderColor={borderColor}>
        <VStack spacing={2} w="100%">
          <HStack w="100%" spacing={2}>
            <IconButton
              icon={<MdEmojiEmotions />}
              size="sm"
              variant="ghost"
              aria-label="Emoji"
            />
            <IconButton
              icon={<MdAttachFile />}
              size="sm"
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Attach file"
            />
            <Input
              flex={1}
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              size="sm"
            />
            <IconButton
              icon={<MdSend />}
              colorScheme="blue"
              size="sm"
              onClick={handleSendMessage}
              aria-label="Send"
            />
          </HStack>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <Text fontSize="xs" color="gray.500">
            You can share prescriptions, reports, and images
          </Text>
        </VStack>
      </CardFooter>
    </Card>
  );
};

// Telemedicine Doctor Card
const TelemedicineDoctorCard = ({ doctor, onBookAppointment }) => {
  const { user, requireLogin } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleBookClick = () => {
    if (!user) {
      requireLogin(() => onBookAppointment(doctor));
      return;
    }
    onBookAppointment(doctor);
  };

  return (
    <Card
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
    >
      <CardBody>
        <VStack spacing={4} align="stretch">
          {/* Doctor Header */}
          <HStack spacing={4}>
            <Avatar
              size="lg"
              name={doctor.name}
              src={doctor.profileImage}
              border="4px solid"
              borderColor="blue.100"
            />
            <Box flex={1}>
              <Heading size="md">{doctor.name}</Heading>
              <Badge colorScheme="blue" mt={1}>{doctor.specialization}</Badge>
              <HStack mt={2} spacing={2}>
                <Tag size="sm" colorScheme="green">
                  <TagLeftIcon as={FiStar} />
                  <TagLabel>{doctor.rating || 4.5}</TagLabel>
                </Tag>
                <Tag size="sm" colorScheme="purple">
                  <TagLeftIcon as={MdWork} />
                  <TagLabel>{doctor.experience}</TagLabel>
                </Tag>
              </HStack>
            </Box>
          </HStack>

          {/* Availability */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={1}>
              Telemedicine Availability:
            </Text>
            <SimpleGrid columns={2} spacing={2}>
              <HStack>
                <FiVideo color="green.500" />
                <Text fontSize="sm">Video Consult</Text>
              </HStack>
              <HStack>
                <FiPhone color="blue.500" />
                <Text fontSize="sm">Audio Call</Text>
              </HStack>
              <HStack>
                <FiMessageSquare color="purple.500" />
                <Text fontSize="sm">Chat</Text>
              </HStack>
              <HStack>
                <MdSchedule color="orange.500" />
                <Text fontSize="sm">24/7 Available</Text>
              </HStack>
            </SimpleGrid>
          </Box>

          {/* Languages */}
          {doctor.languages && (
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={1}>
                Speaks:
              </Text>
              <Wrap spacing={1}>
                {doctor.languages.slice(0, 3).map((lang, idx) => (
                  <Tag key={idx} size="sm" variant="subtle" colorScheme="gray">
                    {lang}
                  </Tag>
                ))}
              </Wrap>
            </Box>
          )}

          {/* Telemedicine Stats */}
          <SimpleGrid columns={2} spacing={3}>
            <Box textAlign="center" p={2} bg="blue.50" borderRadius="md">
              <Text fontSize="xs" color="gray.600">Consultations</Text>
              <Text fontWeight="bold" color="blue.600">1.2k+</Text>
            </Box>
            <Box textAlign="center" p={2} bg="green.50" borderRadius="md">
              <Text fontSize="xs" color="gray.600">Satisfaction</Text>
              <Text fontWeight="bold" color="green.600">98%</Text>
            </Box>
          </SimpleGrid>
        </VStack>
      </CardBody>

      <CardFooter borderTop="1px" borderColor={borderColor}>
        <HStack justify="space-between" w="100%">
          <VStack align="start" spacing={0}>
            <Text fontSize="sm" color="gray.500">Consultation Fee</Text>
            <Text fontSize="xl" fontWeight="bold" color="green.600">
              {doctor.availability?.consultationFee || '₹800'}
            </Text>
          </VStack>
          <Button
            colorScheme="blue"
            leftIcon={<FiVideo />}
            onClick={handleBookClick}
          >
            Book Teleconsult
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  );
};

// Main Telemedicine Page
const TelemedicinePage = () => {
  const { user, requireLogin } = useAuth();
  const { getDoctors } = useHospitalDataContext();
  const toast = useToast();
  
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCall, setActiveCall] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [activeTab, setActiveTab] = useState('doctors');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([500, 3000]);

  // Modal states
  const { isOpen: isBookingOpen, onOpen: onBookingOpen, onClose: onBookingClose } = useDisclosure();
  const { isOpen: isCallOpen, onOpen: onCallOpen, onClose: onCallClose } = useDisclosure();
  const { isOpen: isChatOpen, onOpen: onChatOpen, onClose: onChatClose } = useDisclosure();

  // Load doctors
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);
        const doctorsData = getDoctors?.() || [];
        
        // Filter doctors who offer telemedicine (simulate)
        const telemedicineDoctors = doctorsData.filter(doctor => 
          ['Cardiologist', 'General Physician', 'Pediatrician', 'Neurologist'].includes(doctor.specialization)
        ).map(doctor => ({
          ...doctor,
          telemedicine: true,
          videoConsult: true,
          audioCall: true,
          chatSupport: true,
          waitingTime: '5-10 mins'
        }));
        
        setDoctors(telemedicineDoctors);
        setFilteredDoctors(telemedicineDoctors);
      } catch (error) {
        console.error('Error loading doctors:', error);
        toast({
          title: 'Error',
          description: 'Failed to load doctors',
          status: 'error',
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, [getDoctors, toast]);

  // Filter doctors
  useEffect(() => {
    let filtered = [...doctors];
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(doctor =>
        doctor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialization?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Specialization filter
    if (selectedSpecialization !== 'all') {
      filtered = filtered.filter(doctor => doctor.specialization === selectedSpecialization);
    }
    
    // Price filter
    filtered = filtered.filter(doctor => {
      const fee = parseInt(doctor.availability?.consultationFee?.replace(/[^0-9]/g, '') || 800);
      return fee >= priceRange[0] && fee <= priceRange[1];
    });
    
    setFilteredDoctors(filtered);
  }, [searchQuery, selectedSpecialization, priceRange, doctors]);

  const specializations = Array.from(new Set(doctors.map(d => d.specialization)));

  const handleBookAppointment = (doctor) => {
    if (!user) {
      requireLogin(() => {
        setSelectedDoctor(doctor);
        onBookingOpen();
      });
      return;
    }
    setSelectedDoctor(doctor);
    onBookingOpen();
  };

  const handleStartCall = () => {
    if (!user) {
      requireLogin(() => onCallOpen());
      return;
    }
    onCallOpen();
  };

  const handleStartChat = () => {
    if (!user) {
      requireLogin(() => onChatOpen());
      return;
    }
    onChatOpen();
  };

  const handleEndCall = () => {
    setActiveCall(false);
    onCallClose();
    toast({
      title: 'Call Ended',
      description: 'Teleconsultation completed successfully',
      status: 'info',
      duration: 3000,
    });
  };

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const contentBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Container maxW="container.xl" py={8}>
      {/* Header */}
      <VStack spacing={6} mb={8} textAlign="center">
        <Heading size="2xl" bgGradient="linear(to-r, blue.500, teal.400)" bgClip="text">
          Telemedicine Services
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="2xl">
          Connect with doctors instantly through video, audio, or chat consultations from the comfort of your home.
        </Text>
        
        {!user && (
          <Alert status="info" borderRadius="lg" maxW="2xl">
            <AlertIcon />
            <AlertTitle>Login Required</AlertTitle>
            <AlertDescription>
              Please login to book teleconsultations and access all features.
            </AlertDescription>
          </Alert>
        )}
      </VStack>

      {/* Quick Stats */}
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mb={8}>
        <Card bg="blue.50" _dark={{ bg: 'blue.900' }}>
          <CardBody textAlign="center">
            <Stat>
              <StatLabel>Active Doctors</StatLabel>
              <StatNumber>{filteredDoctors.length}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                12% from last month
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        
        <Card bg="green.50" _dark={{ bg: 'green.900' }}>
          <CardBody textAlign="center">
            <Stat>
              <StatLabel>Avg. Wait Time</StatLabel>
              <StatNumber>8 mins</StatNumber>
              <StatHelpText>For video consult</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        
        <Card bg="purple.50" _dark={{ bg: 'purple.900' }}>
          <CardBody textAlign="center">
            <Stat>
              <StatLabel>Satisfaction</StatLabel>
              <StatNumber>96%</StatNumber>
              <StatHelpText>Patient rating</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        
        <Card bg="orange.50" _dark={{ bg: 'orange.900' }}>
          <CardBody textAlign="center">
            <Stat>
              <StatLabel>24/7 Available</StatLabel>
              <StatNumber>18</StatNumber>
              <StatHelpText>Doctors available</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Main Content Tabs */}
      <Tabs colorScheme="blue" mb={8}>
        <TabList>
          <Tab>
            <HStack spacing={2}>
              <FiUsers />
              <Text>Find Doctors</Text>
            </HStack>
          </Tab>
          <Tab>
            <HStack spacing={2}>
              <MdHistory />
              <Text>My Consultations</Text>
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
          {/* Find Doctors Tab */}
          <TabPanel p={0} pt={6}>
            {/* Filters */}
            <Card mb={6}>
              <CardBody>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                  <FormControl>
                    <FormLabel>Search Doctors</FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <FiSearch color="gray.400" />
                      </InputLeftElement>
                      <Input
                        placeholder="Search by name or specialization..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Specialization</FormLabel>
                    <Select
                      value={selectedSpecialization}
                      onChange={(e) => setSelectedSpecialization(e.target.value)}
                    >
                      <option value="all">All Specializations</option>
                      {specializations.map((spec, idx) => (
                        <option key={idx} value={spec}>{spec}</option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</FormLabel>
                    <RangeSlider
                      aria-label={['min', 'max']}
                      min={500}
                      max={5000}
                      step={500}
                      value={priceRange}
                      onChange={setPriceRange}
                    >
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} />
                      <RangeSliderThumb index={1} />
                    </RangeSlider>
                  </FormControl>
                </SimpleGrid>
              </CardBody>
            </Card>

            {/* Doctors Grid */}
            {loading ? (
              <Flex justify="center" py={20}>
                <Spinner size="xl" color="blue.500" />
              </Flex>
            ) : filteredDoctors.length === 0 ? (
              <Card>
                <CardBody py={20} textAlign="center">
                  <FiUsers size={48} color="gray.400" />
                  <Heading size="md" color="gray.600" mt={4}>
                    No Doctors Found
                  </Heading>
                  <Text color="gray.500" mt={2}>
                    Try adjusting your search filters
                  </Text>
                </CardBody>
              </Card>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {filteredDoctors.map((doctor) => (
                  <TelemedicineDoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onBookAppointment={handleBookAppointment}
                  />
                ))}
              </SimpleGrid>
            )}
          </TabPanel>

          {/* My Consultations Tab */}
          <TabPanel>
            <Card>
              <CardHeader>
                <Heading size="md">Consultation History</Heading>
              </CardHeader>
              <CardBody>
                {user ? (
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Doctor</Th>
                          <Th>Date & Time</Th>
                          <Th>Type</Th>
                          <Th>Status</Th>
                          <Th>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>
                            <HStack spacing={3}>
                              <Avatar size="sm" name="Dr. Rajesh Sharma" />
                              <Text>Dr. Rajesh Sharma</Text>
                            </HStack>
                          </Td>
                          <Td>Today, 10:30 AM</Td>
                          <Td><Badge colorScheme="blue">Video</Badge></Td>
                          <Td><Badge colorScheme="green">Completed</Badge></Td>
                          <Td>
                            <HStack spacing={2}>
                              <IconButton icon={<FiEye />} size="sm" aria-label="View" />
                              <IconButton icon={<FiDownload />} size="sm" aria-label="Download" />
                            </HStack>
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Alert status="info">
                    <AlertIcon />
                    <AlertTitle>Login Required</AlertTitle>
                    <AlertDescription>
                      Please login to view your consultation history.
                    </AlertDescription>
                  </Alert>
                )}
              </CardBody>
            </Card>
          </TabPanel>

          {/* Settings Tab */}
          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Card>
                <CardHeader>
                  <Heading size="md">Telemedicine Settings</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <FormControl>
                      <FormLabel>Video Quality</FormLabel>
                      <Select defaultValue="auto">
                        <option value="auto">Auto (Recommended)</option>
                        <option value="hd">HD 720p</option>
                        <option value="fullhd">Full HD 1080p</option>
                        <option value="low">Low Bandwidth</option>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Audio Input</FormLabel>
                      <Select defaultValue="default">
                        <option value="default">Default Microphone</option>
                        <option value="headset">Headset</option>
                        <option value="bluetooth">Bluetooth</option>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <Checkbox defaultChecked>Enable Background Noise Reduction</Checkbox>
                    </FormControl>

                    <FormControl>
                      <Checkbox defaultChecked>Auto-record Consultations</Checkbox>
                    </FormControl>

                    <Button colorScheme="blue">Save Settings</Button>
                  </VStack>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <Heading size="md">Connection Test</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <Progress value={85} colorScheme="green" size="lg" />
                    <Text textAlign="center">Connection Quality: Excellent</Text>
                    
                    <SimpleGrid columns={2} spacing={4}>
                      <Box textAlign="center" p={3} bg="green.50" borderRadius="md">
                        <Text fontSize="sm">Bandwidth</Text>
                        <Text fontWeight="bold">5.2 Mbps</Text>
                      </Box>
                      <Box textAlign="center" p={3} bg="blue.50" borderRadius="md">
                        <Text fontSize="sm">Latency</Text>
                        <Text fontWeight="bold">45 ms</Text>
                      </Box>
                    </SimpleGrid>

                    <Button leftIcon={<FiRotateCcw />}>Test Connection</Button>
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Booking Modal */}
      <Modal isOpen={isBookingOpen} onClose={onBookingClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack spacing={3}>
              <Avatar size="sm" name={selectedDoctor?.name} src={selectedDoctor?.profileImage} />
              <Box>
                <Text fontWeight="bold">Book Teleconsultation</Text>
                <Text fontSize="sm" color="gray.600">{selectedDoctor?.name}</Text>
              </Box>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <VStack spacing={6}>
              <FormControl>
                <FormLabel>Select Consultation Type</FormLabel>
                <RadioGroup defaultValue="video">
                  <Stack spacing={4}>
                    <Radio value="video">
                      <HStack>
                        <FiVideo />
                        <Text>Video Consultation (Recommended)</Text>
                      </HStack>
                    </Radio>
                    <Radio value="audio">
                      <HStack>
                        <FiPhone />
                        <Text>Audio Call</Text>
                      </HStack>
                    </Radio>
                    <Radio value="chat">
                      <HStack>
                        <FiMessageSquare />
                        <Text>Chat Consultation</Text>
                      </HStack>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Select Date & Time</FormLabel>
                <DatePicker
                  selected={new Date()}
                  onChange={() => {}}
                  inline
                  minDate={new Date()}
                  maxDate={addDays(new Date(), 7)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Symptoms / Reason for Consultation</FormLabel>
                <Textarea
                  placeholder="Describe your symptoms or reason for consultation..."
                  rows={4}
                />
                <FormHelperText>Be specific for better diagnosis</FormHelperText>
              </FormControl>

              <Alert status="info">
                <AlertIcon />
                <AlertDescription>
                  Consultation fee: {selectedDoctor?.availability?.consultationFee || '₹800'}
                </AlertDescription>
              </Alert>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={3} w="100%">
              <Button variant="outline" flex={1} onClick={onBookingClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" flex={1} onClick={() => {
                toast({
                  title: 'Appointment Booked!',
                  description: 'Your teleconsultation has been scheduled',
                  status: 'success',
                  duration: 5000,
                });
                onBookingClose();
              }}>
                Confirm Booking
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Call Modal */}
      <Modal isOpen={isCallOpen} onClose={handleEndCall} size="full" closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow="none">
          <VideoCallComponent
            isActive={isCallOpen}
            onEndCall={handleEndCall}
            doctor={selectedDoctor}
          />
        </ModalContent>
      </Modal>

      {/* Chat Modal */}
      <Drawer isOpen={isChatOpen} onClose={onChatClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody p={0}>
            <ChatComponent doctor={selectedDoctor} isActive={isChatOpen} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
};

export default TelemedicinePage;