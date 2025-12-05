import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Container,
    VStack,
    HStack,
    Flex,
    Heading,
    Text,
    Icon,
    Button,
    useColorModeValue,
    Avatar,
    Badge,
    Tag,
    TagLabel,
    Wrap,
    WrapItem,
    Grid,
    GridItem,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Progress,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    List,
    ListItem,
    ListIcon,
    Alert,
    AlertIcon,
    IconButton,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    useDisclosure,
    Input,
    Textarea,
    Select,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/react";
import {
    FiCalendar,
    FiClock,
    FiPhone,
    FiMail,
    FiMapPin,
    FiStar,
    FiUsers,
    FiAward,
    FiBook,
    FiBriefcase,
    FiMessageSquare,
    FiShare2,
    FiBookmark,
    FiChevronLeft,
} from "react-icons/fi";
import { MdCheckCircle, MdLanguage, MdSchool } from "react-icons/md";
import hospitalData from "../data/HospitalData.json";

const DoctorProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedDoctors, setRelatedDoctors] = useState([]);
    const [appointmentModal, setAppointmentModal] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const bg = useColorModeValue("gray.50", "gray.900");
    const cardBg = useColorModeValue("white", "gray.800");
    const headingColor = useColorModeValue("gray.700", "gray.200");
    const descColor = useColorModeValue("gray.600", "gray.400");

    useEffect(() => {
        // Find doctor by ID or name
        const foundDoctor = hospitalData.doctors.find(
            doc => doc.id === id ||
                doc.name.toLowerCase().includes(id?.toLowerCase()?.replace(/-/g, ' '))
        );

        if (foundDoctor) {
            setDoctor(foundDoctor);
            // Find related doctors from same department
            const related = hospitalData.doctors
                .filter(doc =>
                    doc.department === foundDoctor.department &&
                    doc.id !== foundDoctor.id
                )
                .slice(0, 3);
            setRelatedDoctors(related);
        } else {
            toast({
                title: "Doctor not found",
                description: "The requested doctor profile does not exist.",
                status: "error",
                duration: 3000,
            });
            navigate("/services");
        }

        setLoading(false);
    }, [id, navigate, toast]);

    const getDepartmentInfo = () => {
        if (!doctor) return null;
        return hospitalData.departments.find(dept => dept.name === doctor.department);
    };

    const getDoctorStats = () => {
        if (!doctor) return null;

        const appointments = hospitalData.appointments.filter(
            apt => apt.doctorId === doctor.id
        );

        const upcomingAppointments = appointments.filter(
            apt => apt.status === "scheduled"
        ).length;

        return {
            totalPatients: doctor.totalPatients,
            rating: doctor.rating,
            upcomingAppointments,
            experience: doctor.experience,
        };
    };

    const handleBookAppointment = () => {
        setAppointmentModal(true);
        onOpen();
    };

    const handleAppointmentSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would submit to backend
        toast({
            title: "Appointment Requested",
            description: `We've sent your appointment request to Dr. ${doctor.name}. You'll receive confirmation shortly.`,
            status: "success",
            duration: 5000,
        });
        onClose();
        setAppointmentModal(false);
    };

    if (loading) {
        return (
            <Flex minH="100vh" align="center" justify="center">
                <Text>Loading doctor profile...</Text>
            </Flex>
        );
    }

    if (!doctor) {
        return (
            <Container maxW="container.xl" py={10}>
                <Alert status="error">
                    <AlertIcon />
                    Doctor not found. Please check the URL and try again.
                </Alert>
            </Container>
        );
    }

    const stats = getDoctorStats();
    const department = getDepartmentInfo();

    return (
        <Box bg={bg} minH="100vh">
            {/* Back Navigation */}
            <Box bg="white" shadow="sm" py={4}>
                <Container maxW="full">
                    <Button
                        leftIcon={<FiChevronLeft />}
                        variant="ghost"
                        onClick={() => navigate(-1)}
                    >
                        Back to Services
                    </Button>
                </Container>
            </Box>

            <Container maxW="full" py={8}>
                {/* Doctor Header */}
                <Card mb={8} shadow="lg">
                    <CardBody>
                        <Grid templateColumns={{ base: "1fr", md: "auto 1fr auto" }} gap={8} alignItems="center">
                            <Avatar
                                size="2xl"
                                name={doctor.name}
                                src={doctor.profileImage}
                                border="4px solid"
                                borderColor="blue.100"
                            />

                            <Box>
                                <HStack spacing={3} mb={2}>
                                    <Heading size="xl">{doctor.name}</Heading>
                                    <Badge colorScheme="blue" fontSize="lg" px={3} py={1}>
                                        {doctor.specialization}
                                    </Badge>
                                </HStack>

                                <Text color="gray.600" fontSize="lg" mb={4}>
                                    {department?.description || "Senior Consultant"}
                                </Text>

                                <Wrap spacing={3}>
                                    <Tag colorScheme="green" size="lg">
                                        <Icon as={FiStar} mr={2} />
                                        {doctor.rating} Rating
                                    </Tag>
                                    <Tag colorScheme="blue" size="lg">
                                        <Icon as={FiUsers} mr={2} />
                                        {doctor.totalPatients.toLocaleString()} Patients
                                    </Tag>
                                    <Tag colorScheme="purple" size="lg">
                                        <Icon as={FiBriefcase} mr={2} />
                                        {doctor.experience} Experience
                                    </Tag>
                                </Wrap>
                            </Box>

                            <VStack spacing={3}>
                                <Button
                                    colorScheme="blue"
                                    size="lg"
                                    leftIcon={<FiCalendar />}
                                    onClick={handleBookAppointment}
                                >
                                    Book Appointment
                                </Button>
                                <HStack>
                                    <IconButton
                                        icon={<FiShare2 />}
                                        aria-label="Share"
                                        variant="outline"
                                        onClick={() => {
                                            navigator.clipboard.writeText(window.location.href);
                                            toast({
                                                title: "Link copied!",
                                                description: "Doctor profile link copied to clipboard",
                                                status: "success",
                                            });
                                        }}
                                    />
                                    <IconButton
                                        icon={<FiBookmark />}
                                        aria-label="Save"
                                        variant="outline"
                                    />
                                </HStack>
                            </VStack>
                        </Grid>
                    </CardBody>
                </Card>

                {/* Main Content */}
                <Grid templateColumns={{ base: "1fr", lg: "3fr 1fr" }} gap={8}>
                    {/* Left Column - Doctor Details */}
                    <VStack spacing={8} align="stretch">
                        {/* Tabs Section */}
                        <Tabs colorScheme="blue" variant="enclosed">
                            <TabList>
                                <Tab fontWeight="semibold">Overview</Tab>
                                <Tab fontWeight="semibold">Qualifications</Tab>
                                <Tab fontWeight="semibold">Experience</Tab>
                                <Tab fontWeight="semibold">Availability</Tab>
                            </TabList>

                            <TabPanels>
                                {/* Overview Tab */}
                                <TabPanel>
                                    <VStack spacing={6} align="stretch">
                                        <Heading size="md">About Dr. {doctor.name.split(' ')[1]}</Heading>
                                        <Text color={descColor} fontSize="lg">
                                            {doctor.bio}
                                        </Text>

                                        <Divider />

                                        <Heading size="md">Specializations</Heading>
                                        <Wrap>
                                            {doctor.qualifications.map((qual, idx) => (
                                                <Tag key={idx} size="lg" colorScheme="blue" variant="subtle">
                                                    {qual}
                                                </Tag>
                                            ))}
                                        </Wrap>

                                        <Divider />

                                        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                                            <Box>
                                                <Heading size="sm" mb={3}>Languages Spoken</Heading>
                                                <List spacing={2}>
                                                    {doctor.languages.map((lang, idx) => (
                                                        <ListItem key={idx}>
                                                            <ListIcon as={MdLanguage} color="green.500" />
                                                            {lang}
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </Box>
                                            <Box>
                                                <Heading size="sm" mb={3}>Awards & Recognition</Heading>
                                                <List spacing={2}>
                                                    {doctor.awards.map((award, idx) => (
                                                        <ListItem key={idx}>
                                                            <ListIcon as={FiAward} color="yellow.500" />
                                                            {award}
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </Box>
                                        </Grid>
                                    </VStack>
                                </TabPanel>

                                {/* Qualifications Tab */}
                                <TabPanel>
                                    <VStack spacing={6} align="stretch">
                                        <Heading size="md">Education</Heading>
                                        <List spacing={4}>
                                            {doctor.education.map((edu, idx) => (
                                                <ListItem key={idx} p={3} bg="gray.50" borderRadius="lg">
                                                    <HStack>
                                                        <ListIcon as={MdSchool} color="blue.500" boxSize={6} />
                                                        <Text>{edu}</Text>
                                                    </HStack>
                                                </ListItem>
                                            ))}
                                        </List>

                                        <Divider />

                                        <Heading size="md">Certifications</Heading>
                                        <TableContainer>
                                            <Table variant="simple">
                                                <Thead>
                                                    <Tr>
                                                        <Th>Qualification</Th>
                                                        <Th>Registration</Th>
                                                        <Th>Year</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {doctor.qualifications.map((qual, idx) => (
                                                        <Tr key={idx}>
                                                            <Td>{qual}</Td>
                                                            <Td>{doctor.registrationNumber}</Td>
                                                            <Td>{2015 + idx}</Td>
                                                        </Tr>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    </VStack>
                                </TabPanel>

                                {/* Experience Tab */}
                                <TabPanel>
                                    <VStack spacing={6} align="stretch">
                                        <Heading size="md">Professional Experience</Heading>
                                        <Box p={4} bg="blue.50" borderRadius="lg">
                                            <Text fontSize="lg" fontWeight="medium">
                                                Currently working as {doctor.specialization} at {hospitalData.hospitalInfo.name}
                                            </Text>
                                            <Text color="gray.600">Since 2018</Text>
                                        </Box>

                                        <List spacing={4}>
                                            <ListItem p={3} bg="white" borderRadius="lg" shadow="sm">
                                                <Text fontWeight="bold">Senior Consultant</Text>
                                                <Text color="gray.600">MediCare Pro Hospital (2018-Present)</Text>
                                            </ListItem>
                                            <ListItem p={3} bg="white" borderRadius="lg" shadow="sm">
                                                <Text fontWeight="bold">Consultant</Text>
                                                <Text color="gray.600">City Hospital (2015-2018)</Text>
                                            </ListItem>
                                            <ListItem p={3} bg="white" borderRadius="lg" shadow="sm">
                                                <Text fontWeight="bold">Resident Doctor</Text>
                                                <Text color="gray.600">AIIMS Delhi (2012-2015)</Text>
                                            </ListItem>
                                        </List>
                                    </VStack>
                                </TabPanel>

                                {/* Availability Tab */}
                                <TabPanel>
                                    <VStack spacing={6} align="stretch">
                                        <Card bg="green.50" borderColor="green.200">
                                            <CardBody>
                                                <HStack spacing={4}>
                                                    <Icon as={FiCalendar} color="green.500" boxSize={8} />
                                                    <Box>
                                                        <Heading size="md" color="green.700">Available This Week</Heading>
                                                        <Text color="green.600">
                                                            {doctor.availability.days.join(', ')}
                                                        </Text>
                                                    </Box>
                                                </HStack>
                                            </CardBody>
                                        </Card>

                                        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                                            <Card>
                                                <CardBody>
                                                    <VStack align="center">
                                                        <Icon as={FiClock} color="blue.500" boxSize={8} />
                                                        <Text fontWeight="bold">Timings</Text>
                                                        <Text textAlign="center">{doctor.availability.timings}</Text>
                                                    </VStack>
                                                </CardBody>
                                            </Card>

                                            <Card>
                                                <CardBody>
                                                    <VStack align="center">
                                                        <Icon as={FiStar} color="orange.500" boxSize={8} />
                                                        <Text fontWeight="bold">Consultation Fee</Text>
                                                        <Text fontSize="xl" fontWeight="bold">{doctor.availability.consultationFee}</Text>
                                                    </VStack>
                                                </CardBody>
                                            </Card>
                                        </Grid>

                                        <TableContainer>
                                            <Table variant="simple">
                                                <Thead>
                                                    <Tr>
                                                        <Th>Day</Th>
                                                        <Th>Timing</Th>
                                                        <Th>Status</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                                                        <Tr key={day}>
                                                            <Td>{day}</Td>
                                                            <Td>
                                                                {doctor.availability.days.includes(day)
                                                                    ? doctor.availability.timings
                                                                    : 'Not Available'}
                                                            </Td>
                                                            <Td>
                                                                <Badge
                                                                    colorScheme={doctor.availability.days.includes(day) ? 'green' : 'red'}
                                                                >
                                                                    {doctor.availability.days.includes(day) ? 'Available' : 'Unavailable'}
                                                                </Badge>
                                                            </Td>
                                                        </Tr>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    </VStack>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>

                        {/* Patient Reviews */}
                        <Card shadow="md">
                            <CardHeader>
                                <Heading size="md">Patient Reviews</Heading>
                            </CardHeader>
                            <CardBody>
                                <VStack spacing={4} align="stretch">
                                    {[1, 2, 3].map((review) => (
                                        <Box key={review} p={4} borderWidth="1px" borderRadius="lg">
                                            <HStack mb={2}>
                                                <Avatar size="sm" name="Patient" />
                                                <Box>
                                                    <Text fontWeight="bold">Anonymous Patient</Text>
                                                    <HStack>
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <Icon
                                                                key={star}
                                                                as={FiStar}
                                                                color={star <= 4 ? "yellow.400" : "gray.300"}
                                                            />
                                                        ))}
                                                    </HStack>
                                                </Box>
                                            </HStack>
                                            <Text>
                                                Excellent doctor! Very professional and caring. Explained everything clearly.
                                            </Text>
                                            <Text fontSize="sm" color="gray.500" mt={2}>
                                                2 weeks ago
                                            </Text>
                                        </Box>
                                    ))}
                                </VStack>
                            </CardBody>
                        </Card>
                    </VStack>

                    {/* Right Column - Sidebar */}
                    <VStack spacing={8} align="stretch">
                        {/* Stats Card */}
                        <Card shadow="md">
                            <CardHeader>
                                <Heading size="md">Doctor Stats</Heading>
                            </CardHeader>
                            <CardBody>
                                <VStack spacing={4} align="stretch">
                                    <Stat>
                                        <StatLabel>Total Patients</StatLabel>
                                        <StatNumber>{stats?.totalPatients.toLocaleString()}</StatNumber>
                                    </Stat>

                                    <Stat>
                                        <StatLabel>Rating</StatLabel>
                                        <StatNumber>{stats?.rating}/5</StatNumber>
                                        <Progress value={stats?.rating * 20} colorScheme="yellow" mt={2} />
                                    </Stat>

                                    <Stat>
                                        <StatLabel>Upcoming Appointments</StatLabel>
                                        <StatNumber>{stats?.upcomingAppointments}</StatNumber>
                                    </Stat>
                                </VStack>
                            </CardBody>
                        </Card>

                        {/* Contact Card */}
                        <Card shadow="md">
                            <CardHeader>
                                <Heading size="md">Contact Information</Heading>
                            </CardHeader>
                            <CardBody>
                                <VStack spacing={4} align="stretch">
                                    <HStack>
                                        <Icon as={FiPhone} color="blue.500" />
                                        <Box>
                                            <Text fontWeight="medium">Phone</Text>
                                            <Text color="gray.600">{doctor.contact.phone}</Text>
                                        </Box>
                                    </HStack>

                                    <HStack>
                                        <Icon as={FiMail} color="blue.500" />
                                        <Box>
                                            <Text fontWeight="medium">Email</Text>
                                            <Text color="gray.600">{doctor.contact.email}</Text>
                                        </Box>
                                    </HStack>

                                    <HStack>
                                        <Icon as={FiMapPin} color="blue.500" />
                                        <Box>
                                            <Text fontWeight="medium">Department</Text>
                                            <Text color="gray.600">{doctor.department}</Text>
                                            <Text fontSize="sm" color="gray.500">
                                                {department?.floor}, Extension: {department?.extension}
                                            </Text>
                                        </Box>
                                    </HStack>
                                </VStack>
                            </CardBody>
                        </Card>

                        {/* Related Doctors */}
                        <Card shadow="md">
                            <CardHeader>
                                <Heading size="md">Related Doctors</Heading>
                            </CardHeader>
                            <CardBody>
                                <VStack spacing={4} align="stretch">
                                    {relatedDoctors.map((relatedDoc) => (
                                        <Box
                                            key={relatedDoc.id}
                                            p={3}
                                            borderWidth="1px"
                                            borderRadius="lg"
                                            cursor="pointer"
                                            _hover={{ bg: "gray.50" }}
                                            onClick={() => navigate(`/doctor/${relatedDoc.id}`)}
                                        >
                                            <HStack spacing={3}>
                                                <Avatar size="sm" name={relatedDoc.name} src={relatedDoc.profileImage} />
                                                <Box flex="1">
                                                    <Text fontWeight="medium">{relatedDoc.name}</Text>
                                                    <Text fontSize="sm" color="gray.600">
                                                        {relatedDoc.specialization}
                                                    </Text>
                                                </Box>
                                                <Badge colorScheme="green">{relatedDoc.rating}★</Badge>
                                            </HStack>
                                        </Box>
                                    ))}
                                </VStack>
                            </CardBody>
                        </Card>

                        {/* Emergency Contact */}
                        <Alert status="warning" borderRadius="lg">
                            <AlertIcon />
                            <Box>
                                <AlertTitle>Emergency Contact</AlertTitle>
                                <AlertDescription>
                                    For emergencies, call: {doctor.contact.emergencyContact}
                                </AlertDescription>
                            </Box>
                        </Alert>
                    </VStack>
                </Grid>
            </Container>

            {/* Appointment Modal */}
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleAppointmentSubmit}>
                    <ModalHeader>
                        Book Appointment with Dr. {doctor.name}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                                <Box>
                                    <Text mb={2} fontWeight="medium">Consultation Fee</Text>
                                    <Text fontSize="xl" color="blue.600" fontWeight="bold">
                                        {doctor.availability.consultationFee}
                                    </Text>
                                </Box>
                                <Box>
                                    <Text mb={2} fontWeight="medium">Available Days</Text>
                                    <Text>{doctor.availability.days.join(', ')}</Text>
                                </Box>
                            </Grid>

                            <Divider />

                            <Input placeholder="Full Name" required />
                            <Input placeholder="Email Address" type="email" required />
                            <Input placeholder="Phone Number" type="tel" required />

                            <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                                <Input type="date" required />
                                <Select placeholder="Select Time" required>
                                    <option value="9:00">9:00 AM</option>
                                    <option value="10:00">10:00 AM</option>
                                    <option value="11:00">11:00 AM</option>
                                    <option value="14:00">2:00 PM</option>
                                    <option value="15:00">3:00 PM</option>
                                </Select>
                            </Grid>

                            <Textarea placeholder="Symptoms or Reason for visit" rows={3} />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue" type="submit">
                            Request Appointment
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default DoctorProfile;