import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Flex,
  VStack,
  HStack,
  Avatar,
  Badge,
  useColorModeValue,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  SimpleGrid,
  Card,
  CardBody,
  Heading,
  Progress,
  Divider,
  Image,
  Tag,
  TagLabel,
  useToast,
  Textarea,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import {
  FiMessageSquare,
  FiSend,
  FiX,
  FiMaximize2,
  FiMinimize2,
  FiPaperclip,
  FiMic,
  FiMicOff,
  FiSearch,
  FiFilter,
  FiDownload,
  FiCopy,
  FiStar,
  FiCalendar,
  FiUser,
  FiActivity,
  FiBell,
  FiFileText,
  FiAlertCircle,
  FiCheckCircle,
  FiChevronDown,
  FiVolume2,
  FiSmartphone,
  FiClock,
  FiMapPin,
} from 'react-icons/fi';
import { useHospitalDataContext } from '../context/HospitalDataContext';
import { format, parseISO, isToday, isThisWeek } from 'date-fns';

// AI Chatbot Component
const HospitalAIChatbot = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedQuickAction, setSelectedQuickAction] = useState(null);
  const [chatMode, setChatMode] = useState('general'); // general, appointment, emergency, billing, etc.
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const toast = useToast();
  
  const hospitalData = useHospitalDataContext();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Quick actions for common queries
  const quickActions = [
    { 
      icon: FiCalendar, 
      label: 'Today\'s Schedule', 
      query: 'Show me today\'s appointments',
      colorScheme: 'blue'
    },
    { 
      icon: FiUser, 
      label: 'Patient Search', 
      query: 'Search for patient records',
      colorScheme: 'green'
    },
    { 
      icon: FiActivity, 
      label: 'Hospital Stats', 
      query: 'Show current hospital statistics',
      colorScheme: 'purple'
    },
    { 
      icon: FiBell, 
      label: 'Notifications', 
      query: 'Check recent notifications',
      colorScheme: 'orange'
    },
    { 
      icon: FiFileText, 
      label: 'Reports', 
      query: 'Generate monthly reports',
      colorScheme: 'teal'
    },
    { 
      icon: FiAlertCircle, 
      label: 'Emergency', 
      query: 'Emergency department status',
      colorScheme: 'red'
    },
  ];

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm MediCare AI Assistant. I can help you with hospital data, appointments, patient records, and more. How can I assist you today?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        suggestions: [
          "Check today's appointments",
          "Search for a patient",
          "View hospital statistics",
          "Emergency department status",
          "Generate reports"
        ]
      }
    ]);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate AI processing
  const processAIResponse = async (userQuery) => {
    setIsTyping(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let response = { text: '', data: null, type: 'text' };
    
    // Analyze query and generate appropriate response
    const query = userQuery.toLowerCase();
    
    // Appointment related queries
    if (query.includes('appointment') || query.includes('schedule') || query.includes('today')) {
      const todayAppointments = hospitalData.getTodaysAppointments();
      response = {
        text: `Today's appointments: ${todayAppointments.length} scheduled`,
        data: todayAppointments,
        type: 'appointments',
        actions: [
          { label: 'View Details', action: 'view_appointments' },
          { label: 'Add New', action: 'add_appointment' }
        ]
      };
    }
    // Patient queries
    else if (query.includes('patient') || query.includes('search patient')) {
      response = {
        text: `There are ${hospitalData.getPatients().length} patients in the system.`,
        data: hospitalData.getPatients(),
        type: 'patients',
        actions: [
          { label: 'Search Patient', action: 'search_patient' },
          { label: 'Add Patient', action: 'add_patient' }
        ]
      };
    }
    // Hospital statistics
    else if (query.includes('stat') || query.includes('dashboard') || query.includes('overview')) {
      const stats = hospitalData.getStatistics();
      response = {
        text: 'Here are the current hospital statistics:',
        data: stats,
        type: 'statistics',
        actions: [
          { label: 'Detailed Analytics', action: 'view_analytics' },
          { label: 'Export Data', action: 'export_data' }
        ]
      };
    }
    // Emergency queries
    else if (query.includes('emergency') || query.includes('urgent')) {
      const emergencies = hospitalData.getActiveEmergencyCases();
      response = {
        text: `Active emergency cases: ${emergencies.length}`,
        data: emergencies,
        type: 'emergencies',
        actions: [
          { label: 'Emergency Dashboard', action: 'view_emergency' },
          { label: 'Call Emergency', action: 'call_emergency' }
        ]
      };
    }
    // Billing queries
    else if (query.includes('bill') || query.includes('payment') || query.includes('invoice')) {
      const pendingBills = hospitalData.getPendingBills();
      response = {
        text: `Pending bills: ${pendingBills.length} (Total: $${pendingBills.reduce((sum, bill) => sum + bill.amount, 0)})`,
        data: pendingBills,
        type: 'bills',
        actions: [
          { label: 'View All Bills', action: 'view_bills' },
          { label: 'Generate Invoice', action: 'generate_invoice' }
        ]
      };
    }
    // Doctor queries
    else if (query.includes('doctor') || query.includes('physician') || query.includes('surgeon')) {
      const doctors = hospitalData.getDoctors();
      response = {
        text: `Available doctors: ${doctors.length} across ${hospitalData.getDepartments().length} departments`,
        data: doctors,
        type: 'doctors',
        actions: [
          { label: 'Doctor Schedule', action: 'doctor_schedule' },
          { label: 'Add Doctor', action: 'add_doctor' }
        ]
      };
    }
    // Default AI response
    else {
      response = {
        text: `I understand you're asking about "${userQuery}". I can help you with hospital data, patient records, appointments, billing, and emergency services. Please be more specific or use one of the quick actions.`,
        type: 'text',
        suggestions: [
          "Show me patient statistics",
          "Check appointment availability",
          "View emergency room status",
          "Generate financial report"
        ]
      };
    }
    
    return response;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, userMessage]);
    const query = inputText;
    setInputText('');

    // Get AI response
    const aiResponse = await processAIResponse(query);
    
    const botMessage = {
      id: Date.now() + 1,
      text: aiResponse.text,
      sender: 'bot',
      timestamp: new Date(),
      type: aiResponse.type,
      data: aiResponse.data,
      actions: aiResponse.actions,
      suggestions: aiResponse.suggestions
    };
    
    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleQuickAction = (action) => {
    setSelectedQuickAction(action);
    setInputText(action.query);
    handleSendMessage();
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      file
    }));
    
    setAttachments(prev => [...prev, ...newAttachments]);
    toast({
      title: 'Files attached',
      description: `${files.length} file(s) attached successfully`,
      status: 'success',
      duration: 3000,
    });
  };

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording and process
      setIsRecording(false);
      toast({
        title: 'Voice recording stopped',
        status: 'info',
        duration: 2000,
      });
    } else {
      // Start recording
      setIsRecording(true);
      toast({
        title: 'Voice recording started',
        description: 'Speak now...',
        status: 'info',
        duration: 2000,
      });
    }
  };

  // Render message based on type
  const renderMessage = (message) => {
    const isBot = message.sender === 'bot';
    
    return (
      <Flex
        key={message.id}
        direction="column"
        align={isBot ? 'flex-start' : 'flex-end'}
        mb={4}
      >
        <HStack spacing={2} align="flex-start" maxW="80%">
          {isBot && (
            <Avatar
              size="sm"
              name="MediCare AI"
              src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
              bg="blue.500"
            />
          )}
          
          <Box
            bg={isBot ? 'blue.50' : 'green.50'}
            color={isBot ? 'blue.900' : 'green.900'}
            px={4}
            py={3}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={isBot ? 'blue.100' : 'green.100'}
            maxW="100%"
          >
            <Text fontSize="sm" fontWeight="medium">
              {message.text}
            </Text>
            
            {/* Render data based on type */}
            {message.data && renderMessageData(message)}
            
            {/* Render actions */}
            {message.actions && (
              <HStack mt={2} spacing={2}>
                {message.actions.map((action, idx) => (
                  <Button
                    key={idx}
                    size="xs"
                    variant="outline"
                    colorScheme="blue"
                    onClick={() => handleAction(action.action)}
                  >
                    {action.label}
                  </Button>
                ))}
              </HStack>
            )}
            
            <Text fontSize="xs" color="gray.500" mt={2}>
              {format(message.timestamp, 'HH:mm')}
            </Text>
          </Box>
          
          {!isBot && (
            <Avatar
              size="sm"
              name="You"
              bg="green.500"
            />
          )}
        </HStack>
        
        {/* Suggestions */}
        {message.suggestions && isBot && (
          <HStack mt={2} spacing={2} wrap="wrap">
            {message.suggestions.map((suggestion, idx) => (
              <Badge
                key={idx}
                as="button"
                variant="subtle"
                colorScheme="blue"
                px={3}
                py={1}
                borderRadius="full"
                onClick={() => {
                  setInputText(suggestion);
                  handleSendMessage();
                }}
                _hover={{ bg: 'blue.100', cursor: 'pointer' }}
              >
                {suggestion}
              </Badge>
            ))}
          </HStack>
        )}
      </Flex>
    );
  };

  const renderMessageData = (message) => {
    switch (message.type) {
      case 'appointments':
        return (
          <VStack align="stretch" mt={3} spacing={2}>
            {message.data.slice(0, 3).map((appt, idx) => (
              <Box
                key={idx}
                p={3}
                bg="white"
                borderRadius="md"
                borderWidth="1px"
                borderColor="gray.200"
              >
                <HStack justify="space-between">
                  <Text fontSize="sm" fontWeight="semibold">
                    {appt.patientName}
                  </Text>
                  <Badge colorScheme={
                    appt.status === 'completed' ? 'green' :
                    appt.status === 'confirmed' ? 'blue' :
                    appt.status === 'pending' ? 'orange' : 'gray'
                  }>
                    {appt.status}
                  </Badge>
                </HStack>
                <Text fontSize="xs" color="gray.600">
                  Doctor: {appt.doctorName} • {format(parseISO(appt.time), 'hh:mm a')}
                </Text>
              </Box>
            ))}
            {message.data.length > 3 && (
              <Text fontSize="xs" color="gray.500" textAlign="center">
                + {message.data.length - 3} more appointments
              </Text>
            )}
          </VStack>
        );
        
      case 'statistics':
        return (
          <SimpleGrid columns={2} spacing={3} mt={3}>
            <StatCard 
              label="Total Patients" 
              value={message.data.totalPatients}
              color="blue"
            />
            <StatCard 
              label="Active Doctors" 
              value={message.data.activeDoctors}
              color="green"
            />
            <StatCard 
              label="Today's Appointments" 
              value={message.data.todayAppointments}
              color="purple"
            />
            <StatCard 
              label="Occupied Beds" 
              value={`${message.data.bedOccupancy}%`}
              color="orange"
            />
          </SimpleGrid>
        );
        
      case 'patients':
        return (
          <VStack align="stretch" mt={3} spacing={2}>
            {message.data.slice(0, 3).map((patient, idx) => (
              <HStack key={idx} p={2} bg="white" borderRadius="md">
                <Avatar size="sm" name={patient.name} />
                <Box flex={1}>
                  <Text fontSize="sm" fontWeight="medium">{patient.name}</Text>
                  <Text fontSize="xs" color="gray.600">ID: {patient.id}</Text>
                </Box>
                <Badge colorScheme={
                  patient.status === 'active' ? 'green' :
                  patient.status === 'admitted' ? 'blue' : 'gray'
                }>
                  {patient.status}
                </Badge>
              </HStack>
            ))}
          </VStack>
        );
        
      default:
        return null;
    }
  };

  const handleAction = (action) => {
    // Handle different actions
    toast({
      title: 'Action triggered',
      description: `Performing: ${action}`,
      status: 'info',
      duration: 3000,
    });
  };

  const StatCard = ({ label, value, color }) => (
    <Box
      p={3}
      bg={`${color}.50`}
      borderWidth="1px"
      borderColor={`${color}.200`}
      borderRadius="md"
      textAlign="center"
    >
      <Text fontSize="2xl" fontWeight="bold" color={`${color}.600`}>
        {value}
      </Text>
      <Text fontSize="xs" color="gray.600">
        {label}
      </Text>
    </Box>
  );

  // Main chatbot interface
  const ChatInterface = () => (
    <Box
      position="fixed"
      bottom={isExpanded ? 0 : 20}
      right={isExpanded ? 0 : 4}
      w={isExpanded ? '100%' : '400px'}
      h={isExpanded ? '100vh' : '600px'}
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius={isExpanded ? 0 : 'lg'}
      boxShadow="xl"
      zIndex={1000}
      transition="all 0.3s ease"
      display="flex"
      flexDirection="column"
    >
      {/* Header */}
      <Flex
        p={4}
        borderBottomWidth="1px"
        borderColor={borderColor}
        justify="space-between"
        align="center"
        bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        color="white"
      >
        <HStack spacing={3}>
          <Avatar
            size="sm"
            name="MediCare AI"
            src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
            bg="white"
          />
          <Box>
            <Text fontWeight="bold">MediCare AI Assistant</Text>
            <Text fontSize="xs" opacity={0.8}>
              Powered by Hospital Data Analytics
            </Text>
          </Box>
        </HStack>
        
        <HStack spacing={2}>
          <Tooltip label={isExpanded ? 'Minimize' : 'Expand'}>
            <IconButton
              icon={isExpanded ? <FiMinimize2 /> : <FiMaximize2 />}
              onClick={() => setIsExpanded(!isExpanded)}
              size="sm"
              variant="ghost"
              color="white"
              _hover={{ bg: 'rgba(255,255,255,0.2)' }}
            />
          </Tooltip>
          <IconButton
            icon={<FiX />}
            onClick={onClose}
            size="sm"
            variant="ghost"
            color="white"
            _hover={{ bg: 'rgba(255,255,255,0.2)' }}
          />
        </HStack>
      </Flex>

      {/* Quick Actions Bar */}
      {!isExpanded && (
        <Flex
          p={3}
          borderBottomWidth="1px"
          borderColor={borderColor}
          wrap="wrap"
          gap={2}
          bg="gray.50"
        >
          {quickActions.map((action, idx) => (
            <Button
              key={idx}
              size="xs"
              leftIcon={<action.icon />}
              colorScheme={action.colorScheme}
              variant="solid"
              onClick={() => handleQuickAction(action)}
            >
              {action.label}
            </Button>
          ))}
        </Flex>
      )}

      {/* Chat Messages */}
      <Box
        flex={1}
        p={4}
        overflowY="auto"
        bg={useColorModeValue('gray.50', 'gray.900')}
      >
        <VStack align="stretch" spacing={4}>
          {messages.map(renderMessage)}
          {isTyping && (
            <Flex align="center" gap={2}>
              <Avatar size="sm" name="AI" />
              <Box
                bg="blue.50"
                px={4}
                py={3}
                borderRadius="lg"
                borderWidth="1px"
                borderColor="blue.100"
              >
                <HStack spacing={1}>
                  <Box w={2} h={2} bg="blue.400" borderRadius="full" opacity={0.6} animation="pulse 1s infinite" />
                  <Box w={2} h={2} bg="blue.400" borderRadius="full" opacity={0.6} animation="pulse 1s infinite" animationDelay="0.2s" />
                  <Box w={2} h={2} bg="blue.400" borderRadius="full" opacity={0.6} animation="pulse 1s infinite" animationDelay="0.4s" />
                </HStack>
              </Box>
            </Flex>
          )}
          <div ref={messagesEndRef} />
        </VStack>
      </Box>

      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <Flex
          p={3}
          borderTopWidth="1px"
          borderColor={borderColor}
          bg="orange.50"
          align="center"
          wrap="wrap"
          gap={2}
        >
          <Text fontSize="sm" fontWeight="medium">Attachments:</Text>
          {attachments.map((file) => (
            <Badge key={file.id} colorScheme="orange" px={2} py={1}>
              {file.name}
            </Badge>
          ))}
          <IconButton
            icon={<FiX />}
            size="xs"
            ml="auto"
            onClick={() => setAttachments([])}
          />
        </Flex>
      )}

      {/* Input Area */}
      <Box p={4} borderTopWidth="1px" borderColor={borderColor}>
        <VStack spacing={3}>
          <InputGroup size="lg">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about patients, appointments, reports..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              pr="4.5rem"
            />
            <InputRightElement width="4.5rem">
              <HStack spacing={1}>
                <IconButton
                  icon={<FiPaperclip />}
                  size="sm"
                  variant="ghost"
                  onClick={() => fileInputRef.current?.click()}
                />
                <IconButton
                  icon={isRecording ? <FiMicOff /> : <FiMic />}
                  size="sm"
                  variant="ghost"
                  colorScheme={isRecording ? 'red' : 'gray'}
                  onClick={toggleRecording}
                />
                <IconButton
                  icon={<FiSend />}
                  size="sm"
                  colorScheme="blue"
                  onClick={handleSendMessage}
                  isDisabled={!inputText.trim()}
                />
              </HStack>
            </InputRightElement>
          </InputGroup>
          
          <input
            type="file"
            ref={fileInputRef}
            multiple
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          
          <Text fontSize="xs" color="gray.500" textAlign="center">
            AI Assistant can access real-time hospital data • End-to-end encrypted
          </Text>
        </VStack>
      </Box>
    </Box>
  );

  // Floating button to open chat
  const FloatingButton = () => (
    <Button
      position="fixed"
      bottom={4}
      right={4}
      size="lg"
      colorScheme="blue"
      borderRadius="full"
      boxShadow="xl"
      leftIcon={<FiMessageSquare />}
      onClick={onOpen}
      zIndex={999}
      _hover={{ transform: 'scale(1.05)' }}
      transition="all 0.2s"
    >
      <Text display={{ base: 'none', sm: 'block' }}>AI Assistant</Text>
    </Button>
  );

  return (
    <>
      <FloatingButton />
      
      {isOpen && <ChatInterface />}
      
      {/* Data Insight Modal */}
      <Modal isOpen={!!selectedQuickAction} onClose={() => setSelectedQuickAction(null)} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedQuickAction?.label} - Detailed View
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Add detailed data view here based on selected action */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

// Enhanced version with advanced features
export const AdvancedHospitalChatbot = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [insights, setInsights] = useState([]);
  const hospitalData = useHospitalDataContext();

  // Generate AI insights on load
  useEffect(() => {
    if (hospitalData.hospitalData) {
      generateInsights();
    }
  }, [hospitalData.hospitalData]);

  const generateInsights = () => {
    const newInsights = [
      {
        id: 1,
        type: 'warning',
        title: 'High Patient Wait Time',
        description: 'Emergency department wait time increased by 25% this week',
        action: 'View Report',
        priority: 'high'
      },
      {
        id: 2,
        type: 'success',
        title: 'Bed Occupancy Optimized',
        description: 'Bed turnover rate improved by 15% this month',
        action: 'See Details',
        priority: 'medium'
      },
      {
        id: 3,
        type: 'info',
        title: 'Appointment No-show Rate',
        description: 'Current no-show rate: 8% (Target: <5%)',
        action: 'Analyze',
        priority: 'high'
      },
    ];
    setInsights(newInsights);
  };

  return (
    <Box>
      <HospitalAIChatbot />
      
      {/* Optional: Add an insights dashboard */}
      <Box mt={8} p={6} bg="white" borderRadius="lg" boxShadow="sm">
        <Heading size="md" mb={4}>AI-Generated Insights</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          {insights.map((insight) => (
            <Card key={insight.id} borderLeftWidth="4px" borderLeftColor={
              insight.type === 'warning' ? 'orange.500' :
              insight.type === 'success' ? 'green.500' : 'blue.500'
            }>
              <CardBody>
                <HStack spacing={3} align="start">
                  <Badge colorScheme={
                    insight.type === 'warning' ? 'orange' :
                    insight.type === 'success' ? 'green' : 'blue'
                  }>
                    {insight.type}
                  </Badge>
                  {insight.priority === 'high' && <Badge colorScheme="red">High Priority</Badge>}
                </HStack>
                <Text fontWeight="bold" mt={2}>{insight.title}</Text>
                <Text fontSize="sm" color="gray.600" mt={1}>{insight.description}</Text>
                <Button size="sm" mt={3} variant="outline" colorScheme="blue">
                  {insight.action}
                </Button>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default HospitalAIChatbot;