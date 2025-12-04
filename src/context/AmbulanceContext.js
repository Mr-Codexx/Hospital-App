// context/AmbulanceContext.jsx
import React, { createContext, useState, useContext } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    VStack,
    HStack,
    Text,
    Input,
    FormControl,
    FormLabel,
    Textarea,
    useToast,
    Box,
    Icon,
    Badge,
    Alert,
    AlertIcon,
    Spinner,
    InputGroup,
    InputLeftElement,
    InputRightElement,

} from '@chakra-ui/react';
import { FiAlertTriangle, FiMapPin, FiPhone, FiUser, FiMessageSquare, FiClock } from 'react-icons/fi';
import { MdLocalHospital, MdEmergency, MdMyLocation } from 'react-icons/md';

const AmbulanceContext = createContext();

export const useAmbulance = () => {
    const context = useContext(AmbulanceContext);
    if (!context) {
        throw new Error('useAmbulance must be used within AmbulanceProvider');
    }
    return context;
};

export const AmbulanceProvider = ({ children }) => {
    const [isAmbulanceOpen, setIsAmbulanceOpen] = useState(false);
    const [ambulanceData, setAmbulanceData] = useState({
        patientName: '',
        phone: '',
        location: '',
        emergencyType: '',
        additionalInfo: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ambulanceDetails, setAmbulanceDetails] = useState(null);
    const toast = useToast();

    const ambulanceTypes = [
        { id: 'basic', name: 'Basic Life Support (BLS)', eta: '8-12 minutes', icon: MdEmergency },
        { id: 'advanced', name: 'Advanced Life Support (ALS)', eta: '10-15 minutes', icon: FiAlertTriangle },
        { id: 'cardiac', name: 'Cardiac Ambulance', eta: '12-18 minutes', icon: MdLocalHospital },
        { id: 'neonatal', name: 'Neonatal Ambulance', eta: '15-20 minutes', icon: MdLocalHospital },
    ];

    const openAmbulanceModal = () => {
        setIsAmbulanceOpen(true);
        // Try to get current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // In a real app, you'd reverse geocode here
                    setAmbulanceData(prev => ({
                        ...prev,
                        location: `Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}`
                    }));
                },
                () => {
                    // If location access is denied or fails
                    console.log('Location access denied');
                }
            );
        }
    };

    const closeAmbulanceModal = () => {
        setIsAmbulanceOpen(false);
        setAmbulanceData({
            patientName: '',
            phone: '',
            location: '',
            emergencyType: '',
            additionalInfo: '',
        });
        setAmbulanceDetails(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAmbulanceData(prev => ({ ...prev, [name]: value }));
    };

    const handleRequestAmbulance = async () => {
        // Validate inputs
        if (!ambulanceData.patientName || !ambulanceData.phone || !ambulanceData.location || !ambulanceData.emergencyType) {
            toast({
                title: 'Missing Information',
                description: 'Please fill all required fields',
                status: 'warning',
                duration: 3000,
            });
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            // Generate ambulance details
            const details = {
                id: `AMB-${Date.now().toString().slice(-6)}`,
                type: ambulanceTypes.find(t => t.id === ambulanceData.emergencyType)?.name || 'Basic Ambulance',
                driverName: 'Rajesh Kumar',
                driverPhone: '+91-98765-43210',
                ambulanceNumber: 'DL01AB1234',
                eta: ambulanceTypes.find(t => t.id === ambulanceData.emergencyType)?.eta || '15 minutes',
                requestedAt: new Date().toISOString(),
                estimatedArrival: new Date(Date.now() + 15 * 60000).toISOString(), // 15 minutes from now
                trackingUrl: 'https://maps.app.goo.gl/sample-tracking-url',
                fareEstimate: '₹1500 - ₹2500',
            };

            setAmbulanceDetails(details);

            // Save to localStorage
            const existingRequests = JSON.parse(localStorage.getItem('ambulanceRequests') || '[]');
            const newRequest = {
                ...ambulanceData,
                ...details,
                status: 'dispatched',
            };
            localStorage.setItem('ambulanceRequests', JSON.stringify([...existingRequests, newRequest]));

            toast({
                title: 'Ambulance Dispatched!',
                description: `Ambulance ${details.ambulanceNumber} is on the way. ETA: ${details.eta}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            setIsSubmitting(false);
        }, 2000);
    };

    const handleUseCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // Simulate address lookup (in real app, use reverse geocoding API)
                    const address = `Near ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
                    setAmbulanceData(prev => ({ ...prev, location: address }));

                    toast({
                        title: 'Location Detected',
                        description: 'Current location has been set',
                        status: 'success',
                        duration: 2000,
                    });
                },
                (error) => {
                    toast({
                        title: 'Location Error',
                        description: 'Unable to get current location. Please enter manually.',
                        status: 'error',
                        duration: 3000,
                    });
                }
            );
        }
    };

    const handleCancelAmbulance = () => {
        if (ambulanceDetails) {
            // In a real app, this would call an API to cancel the ambulance
            toast({
                title: 'Ambulance Cancelled',
                description: 'Your ambulance request has been cancelled.',
                status: 'info',
                duration: 3000,
            });
            closeAmbulanceModal();
        } else {
            closeAmbulanceModal();
        }
    };

    return (
        <AmbulanceContext.Provider value={{ openAmbulanceModal, closeAmbulanceModal, ambulanceDetails }}>
            {children}

            {/* Ambulance Modal */}
            <Modal isOpen={isAmbulanceOpen} onClose={closeAmbulanceModal} size="lg" isCentered>
                <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(10px)" />
                <ModalContent borderRadius="2xl">
                    <ModalHeader bg="red.600" color="white" borderTopRadius="2xl">
                        <HStack spacing={3}>
                            <MdEmergency size={24} />
                            <Box>
                                <Text fontSize="xl" fontWeight="bold">Emergency Ambulance</Text>
                                <Text fontSize="sm" opacity={0.9}>24x7 Service Available</Text>
                            </Box>
                        </HStack>
                    </ModalHeader>

                    <ModalBody py={6}>
                        {ambulanceDetails ? (
                            <VStack spacing={6} align="stretch">
                                <Alert status="success" borderRadius="lg">
                                    <AlertIcon />
                                    <Box>
                                        <Text fontWeight="bold">Ambulance Dispatched!</Text>
                                        <Text fontSize="sm">Your ambulance is on the way</Text>
                                    </Box>
                                </Alert>

                                <VStack spacing={4} align="stretch" p={4} bg="green.50" borderRadius="lg">
                                    <HStack justify="space-between">
                                        <Text fontWeight="medium">Ambulance ID:</Text>
                                        <Badge colorScheme="green" fontSize="md">{ambulanceDetails.id}</Badge>
                                    </HStack>
                                    <HStack justify="space-between">
                                        <Text fontWeight="medium">Type:</Text>
                                        <Text color="blue.600" fontWeight="bold">{ambulanceDetails.type}</Text>
                                    </HStack>
                                    <HStack justify="space-between">
                                        <Text fontWeight="medium">Driver:</Text>
                                        <Text>{ambulanceDetails.driverName}</Text>
                                    </HStack>
                                    <HStack justify="space-between">
                                        <Text fontWeight="medium">Driver Contact:</Text>
                                        <Text color="blue.600">{ambulanceDetails.driverPhone}</Text>
                                    </HStack>
                                    <HStack justify="space-between">
                                        <Text fontWeight="medium">Vehicle Number:</Text>
                                        <Badge colorScheme="purple">{ambulanceDetails.ambulanceNumber}</Badge>
                                    </HStack>
                                    <HStack justify="space-between">
                                        <Text fontWeight="medium">Estimated Arrival:</Text>
                                        <Badge colorScheme="orange" fontSize="lg">{ambulanceDetails.eta}</Badge>
                                    </HStack>
                                    <HStack justify="space-between">
                                        <Text fontWeight="medium">Fare Estimate:</Text>
                                        <Text color="green.600" fontWeight="bold">{ambulanceDetails.fareEstimate}</Text>
                                    </HStack>
                                </VStack>

                                <Alert status="info" borderRadius="lg">
                                    <AlertIcon />
                                    <Box fontSize="sm">
                                        <Text fontWeight="bold">Important Instructions:</Text>
                                        <Text>• Stay at the provided location</Text>
                                        <Text>• Keep patient in comfortable position</Text>
                                        <Text>• Have important documents ready</Text>
                                        <Text>• Clear the path for ambulance</Text>
                                    </Box>
                                </Alert>

                                <Button
                                    colorScheme="blue"
                                    size="lg"
                                    onClick={() => window.open(ambulanceDetails.trackingUrl, '_blank')}
                                    leftIcon={<FiMapPin />}
                                >
                                    Track Ambulance on Map
                                </Button>
                            </VStack>
                        ) : (
                            <VStack spacing={6} align="stretch">
                                <Alert status="warning" borderRadius="lg">
                                    <AlertIcon />
                                    <Box>
                                        <Text fontWeight="bold">Emergency Contact: 108</Text>
                                        <Text fontSize="sm">For immediate assistance, call the national emergency number</Text>
                                    </Box>
                                </Alert>

                                <FormControl isRequired>
                                    <FormLabel>Patient Name</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <FiUser color="gray.400" />
                                        </InputLeftElement>
                                        <Input
                                            name="patientName"
                                            placeholder="Enter patient's name"
                                            value={ambulanceData.patientName}
                                            onChange={handleInputChange}
                                        />
                                    </InputGroup>
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Contact Phone</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <FiPhone color="gray.400" />
                                        </InputLeftElement>
                                        <Input
                                            name="phone"
                                            type="tel"
                                            placeholder="+91 98765 43210"
                                            value={ambulanceData.phone}
                                            onChange={handleInputChange}
                                        />
                                    </InputGroup>
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Location</FormLabel>
                                    <VStack spacing={2}>
                                        <InputGroup>
                                            <InputLeftElement>
                                                <FiMapPin color="gray.400" />
                                            </InputLeftElement>
                                            <Input
                                                name="location"
                                                placeholder="Enter complete address or landmark"
                                                value={ambulanceData.location}
                                                onChange={handleInputChange}
                                            />
                                            <InputRightElement width="4.5rem">
                                                <Button
                                                    h="1.75rem"
                                                    size="sm"
                                                    onClick={handleUseCurrentLocation}
                                                    leftIcon={<MdMyLocation />}
                                                >
                                                    Current
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                        <Text fontSize="sm" color="gray.500">
                                            Provide complete address with landmark for quick response
                                        </Text>
                                    </VStack>
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Type of Ambulance Required</FormLabel>
                                    <VStack spacing={2} align="stretch">
                                        {ambulanceTypes.map((type) => (
                                            <Button
                                                key={type.id}
                                                variant={ambulanceData.emergencyType === type.id ? 'solid' : 'outline'}
                                                colorScheme={ambulanceData.emergencyType === type.id ? 'red' : 'gray'}
                                                justifyContent="space-between"
                                                onClick={() => setAmbulanceData(prev => ({ ...prev, emergencyType: type.id }))}
                                                size="lg"
                                            >
                                                <HStack spacing={3}>
                                                    <Icon as={type.icon} />
                                                    <Text>{type.name}</Text>
                                                </HStack>
                                                <Badge colorScheme="blue">ETA: {type.eta}</Badge>
                                            </Button>
                                        ))}
                                    </VStack>
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Additional Information (Optional)</FormLabel>
                                    <Textarea
                                        name="additionalInfo"
                                        placeholder="Describe the emergency, patient condition, any special requirements..."
                                        value={ambulanceData.additionalInfo}
                                        onChange={handleInputChange}
                                        rows={3}
                                    />
                                </FormControl>
                            </VStack>
                        )}
                    </ModalBody>

                    <ModalFooter borderTopWidth="1px" pt={6}>
                        <HStack spacing={3} w="100%">
                            {ambulanceDetails ? (
                                <>
                                    <Button variant="outline" flex={1} onClick={handleCancelAmbulance}>
                                        Cancel Ambulance
                                    </Button>
                                    <Button
                                        colorScheme="green"
                                        flex={1}
                                        onClick={() => {
                                            toast({
                                                title: 'Help Sent',
                                                description: 'Additional help has been notified',
                                                status: 'success',
                                                duration: 3000,
                                            });
                                        }}
                                        leftIcon={<FiAlertTriangle />}
                                    >
                                        Request Additional Help
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="outline" flex={1} onClick={closeAmbulanceModal}>
                                        Cancel
                                    </Button>
                                    <Button
                                        colorScheme="red"
                                        flex={1}
                                        onClick={handleRequestAmbulance}
                                        isLoading={isSubmitting}
                                        loadingText="Requesting..."
                                        leftIcon={<MdEmergency />}
                                    >
                                        Request Ambulance
                                    </Button>
                                </>
                            )}
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </AmbulanceContext.Provider>
    );
};