import React, { useState } from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Image,
  Avatar,
  Icon,
  SimpleGrid,
  Divider,
  useColorModeValue,
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiShield,
  FiTarget,
  FiUsers,
  FiActivity,
  FiGlobe,
  FiCheckCircle,
  FiStar,
  FiArrowRight,
} from "react-icons/fi";
import { RiHospitalLine } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionHeading = motion(Heading);

const AboutPage = () => {
  const bgColor = useColorModeValue("white", "gray.900");
  const secondaryColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");

  const coreValues = [
    {
      icon: FiHeart,
      title: "Compassionate Care",
      description: "Putting patients first with empathy and understanding",
      color: "red.500",
    },
    {
      icon: FiShield,
      title: "Safety First",
      description: "Highest standards of patient safety and quality care",
      color: "blue.500",
    },
    {
      icon: FiTarget,
      title: "Excellence",
      description: "Commitment to medical excellence and innovation",
      color: "green.500",
    },
    {
      icon: FiUsers,
      title: "Teamwork",
      description: "Collaborative approach to comprehensive healthcare",
      color: "purple.500",
    },
    {
      icon: FiActivity,
      title: "Innovation",
      description: "Embracing cutting-edge technology and research",
      color: "orange.500",
    },
    {
      icon: FiGlobe,
      title: "Community",
      description: "Serving our community with integrity and respect",
      color: "teal.500",
    },
  ];

  const stats = [
    { label: "Patients Treated", value: "50,000+", change: "+15%" },
    { label: "Successful Surgeries", value: "25,000+", change: "+12%" },
    { label: "Expert Doctors", value: "200+", change: "+8%" },
    { label: "Departments", value: "25+", change: "+5%" },
    { label: "Years of Service", value: "30+", change: "" },
    { label: "Patient Satisfaction", value: "98%", change: "+2%" },
  ];

  const executives = [
    {
      name: "John Smith",
      position: "CEO",
      experience: "25 years",
      education: "MBA, Harvard Business School",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      name: "Emma Davis",
      position: "Medical Director",
      experience: "20 years",
      education: "MD, Johns Hopkins University",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      name: "Robert Brown",
      position: "COO",
      experience: "18 years",
      education: "MS, Stanford University",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      name: "Sarah Miller",
      position: "CFO",
      experience: "15 years",
      education: "MBA, Wharton School",
      image:
        "https://images.unsplash.com/photo-1594824434340-7e7dfc37cabb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
  ];

  const history = [
    { decade: "1990s", desc: "Founded in 1994 as a small community hospital." },
    { decade: "2000s", desc: "Expanded to 200 beds and advanced surgical facilities." },
    { decade: "2010s", desc: "Achieved JCI accreditation and established research center." },
    { decade: "2020s", desc: "Implemented AI-driven healthcare solutions." },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedExec, setSelectedExec] = useState(null);

  const handleExecClick = (exec) => {
    setSelectedExec(exec);
    onOpen();
  };

  return (
    <Box bg={bgColor} color={textColor}>
      {/* Hero Section */}
      <Box
        h={{ base: "60vh", md: "80vh" }}
        bgImage="url('https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80')"
        bgSize="cover"
        bgPosition="center"
        position="relative"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.600"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <VStack spacing={4}>
            <MotionHeading
              size={{ base: "2xl", md: "4xl" }}
              color="white"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              About MediCare Pro
            </MotionHeading>
            <Text color="white" fontSize={{ base: "md", md: "xl" }} textAlign="center">
              Committed to excellence in healthcare for over 30 years.
            </Text>
            <Button
              colorScheme="brand"
              size="lg"
              rightIcon={<FiArrowRight />}
              as="a"
              href="#mission"
            >
              Learn More
            </Button>
          </VStack>
        </Box>
      </Box>

      {/* About Info */}
      <Box py={20} bg={secondaryColor} id="mission">
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={12} alignItems="center">
            <GridItem>
              <Image
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80"
                borderRadius="2xl"
                w="full"
                h={{ base: "300px", md: "500px" }}
                objectFit="cover"
              />
            </GridItem>
            <GridItem>
              <VStack spacing={6} align="start">
                <Badge colorScheme="green" px={4} py={1} borderRadius="full">
                  Our Mission
                </Badge>
                <Heading size="2xl">Transforming Healthcare Through Innovation</Heading>
                <Text fontSize="lg" color="gray.600">
                  Our mission is to provide accessible, high-quality healthcare services while advancing
                  medical research and education. We strive to improve patient outcomes through
                  innovative treatments and compassionate care.
                </Text>
                <SimpleGrid columns={2} spacing={6} w="full">
                  <VStack align="start" spacing={2}>
                    <HStack>
                      <Icon as={FiCheckCircle} color="green.500" />
                      <Text fontWeight="medium">Quality Care</Text>
                    </HStack>
                    <HStack>
                      <Icon as={FiCheckCircle} color="green.500" />
                      <Text fontWeight="medium">Advanced Technology</Text>
                    </HStack>
                  </VStack>
                  <VStack align="start" spacing={2}>
                    <HStack>
                      <Icon as={FiCheckCircle} color="green.500" />
                      <Text fontWeight="medium">Patient Safety</Text>
                    </HStack>
                    <HStack>
                      <Icon as={FiCheckCircle} color="green.500" />
                      <Text fontWeight="medium">Research Excellence</Text>
                    </HStack>
                  </VStack>
                </SimpleGrid>
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Core Values */}
      <Box py={20}>
        <Container maxW="container.xl">
          <VStack spacing={12} align="center">
            <VStack spacing={4} textAlign="center">
              <Badge colorScheme="brand" px={4} py={1} borderRadius="full">
                Core Values
              </Badge>
              <Heading size="2xl">Our Guiding Principles</Heading>
              <Text fontSize="xl" color="gray.600" maxW="800px">
                MediCare Pro is built on principles that ensure high-quality, compassionate, and innovative healthcare.
              </Text>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
              {coreValues.map((value, index) => (
                <MotionBox
                  key={value.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Box
                    p={6}
                    bg={`${value.color}20`}
                    borderRadius="xl"
                    textAlign="center"
                    _hover={{ transform: "translateY(-6px)", shadow: "xl" }}
                    transition="all 0.3s"
                  >
                    <Icon as={value.icon} w={10} h={10} color={value.color} mb={4} />
                    <Heading size="md">{value.title}</Heading>
                    <Text color="gray.600">{value.description}</Text>
                  </Box>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Statistics */}
      <Box py={20} bg={secondaryColor}>
        <Container maxW="container.xl">
          <VStack spacing={12} align="center">
            <VStack spacing={4} textAlign="center">
              <Badge colorScheme="blue" px={4} py={1} borderRadius="full">
                Achievements
              </Badge>
              <Heading size="2xl">Our Impact So Far</Heading>
            </VStack>
            <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing={8} w="full">
              {stats.map((stat) => (
                <VStack key={stat.label} spacing={2}>
                  <Heading size="lg" color="brand.500">
                    {stat.value}
                  </Heading>
                  <Text color="gray.600">{stat.label}</Text>
                  {stat.change && <Text color="green.500">{stat.change}</Text>}
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Executive Management */}
      <Box py={20}>
        <Container maxW="container.xl">
          <VStack spacing={12} align="center">
            <VStack spacing={4} textAlign="center">
              <Badge colorScheme="red" px={4} py={1} borderRadius="full">
                Leadership
              </Badge>
              <Heading size="2xl">Meet Our Executive Team</Heading>
              <Text fontSize="xl" color="gray.600" maxW="800px">
                Experienced leadership driving healthcare excellence.
              </Text>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
              {executives.map((exec) => (
                <MotionBox
                  key={exec.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  cursor="pointer"
                  onClick={() => handleExecClick(exec)}
                >
                  <VStack spacing={4} textAlign="center">
                    <Avatar size="xl" name={exec.name} src={exec.image} border="4px solid" borderColor="brand.500" />
                    <Heading size="md">{exec.name}</Heading>
                    <Badge colorScheme="brand">{exec.position}</Badge>
                    <Text fontSize="sm" color="gray.600">
                      {exec.experience} experience
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {exec.education}
                    </Text>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* History Timeline */}
      <Box py={20} bg={secondaryColor}>
        <Container maxW="container.xl">
          <VStack spacing={12} align="center">
            <VStack spacing={4} textAlign="center">
              <Badge colorScheme="purple" px={4} py={1} borderRadius="full">
                Our Journey
              </Badge>
              <Heading size="2xl">30 Years of Healthcare Excellence</Heading>
            </VStack>
            <Tabs variant="enclosed" w="full">
              <TabList>
                {history.map((h) => (
                  <Tab key={h.decade}>{h.decade}</Tab>
                ))}
              </TabList>
              <TabPanels>
                {history.map((h) => (
                  <TabPanel key={h.decade}>
                    <Text>{h.desc}</Text>
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </VStack>
        </Container>
      </Box>

      {/* Executive Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedExec?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedExec && (
              <VStack spacing={4} align="stretch">
                <Image src={selectedExec.image} alt={selectedExec.name} borderRadius="xl" />
                <Text><strong>Position:</strong> {selectedExec.position}</Text>
                <Text><strong>Experience:</strong> {selectedExec.experience}</Text>
                <Text><strong>Education:</strong> {selectedExec.education}</Text>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AboutPage;
