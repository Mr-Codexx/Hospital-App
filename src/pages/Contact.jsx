import React, { useState } from "react";
import {
  Box,
  Container,
  Flex,
  VStack,
  HStack,
  Heading,
  Text,
  Icon,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  FormControl,
  FormLabel,
  useToast,
  useColorModeValue,
  Divider,
  Badge,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiArrowRight,
} from "react-icons/fi";

const MotionBox = motion(Box);

const ContactPage = () => {
  const bgColor = useColorModeValue("white", "gray.900");
  const secondaryColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");

  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can integrate your backend / Firebase / Email service
    toast({
      title: "Message sent!",
      description: "We will get back to you soon.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const contactCards = [
    {
      icon: FiMapPin,
      title: "Address",
      info: "Plot No. 12, Hitech City Road, Hyderabad, Telangana - 500081",
      color: "red.500",
    },
    {
      icon: FiPhone,
      title: "Phone",
      info: "+91 9876543210",
      color: "green.500",
    },
    {
      icon: FiMail,
      title: "Email",
      info: "contact@MediCarePro.in",
      color: "blue.500",
    },
    {
      icon: FiClock,
      title: "Working Hours",
      info: "Mon - Sat: 8:00 AM - 8:00 PM",
      color: "purple.500",
    },
  ];

  return (
    <Box bg={bgColor} color={textColor}>
      {/* Hero Section */}
      <Box
        h={{ base: "40vh", md: "60vh" }}
        bgImage="url('https://images.unsplash.com/photo-1588776814546-7be0b77f182b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80')"
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
            <Heading color="white" size={{ base: "2xl", md: "4xl" }}>
              Contact MediCare Pro
            </Heading>
            <Text color="white" fontSize={{ base: "md", md: "xl" }} textAlign="center">
              We're here to assist you 24/7. Reach out to us anytime.
            </Text>
          </VStack>
        </Box>
      </Box>

      {/* Contact Cards */}
      <Box py={20} bg={secondaryColor}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {contactCards.map((card, index) => (
              <MotionBox
                key={card.title}
                p={6}
                bg={`${card.color}20`}
                borderRadius="xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <VStack spacing={4}>
                  <Icon as={card.icon} w={10} h={10} color={card.color} />
                  <Heading size="md">{card.title}</Heading>
                  <Text color="gray.600" textAlign="center">
                    {card.info}
                  </Text>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Contact Form + Map */}
      <Box py={20}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
            {/* Form */}
            <Box>
              <VStack spacing={6} align="stretch">
                <Badge colorScheme="brand" px={4} py={1} borderRadius="full">
                  Get In Touch
                </Badge>
                <Heading size="2xl">Send Us a Message</Heading>
                <Text fontSize="lg" color="gray.600">
                  Fill out the form below and our team will respond promptly.
                </Text>
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="stretch">
                    <FormControl isRequired>
                      <FormLabel>Name</FormLabel>
                      <Input
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Phone</FormLabel>
                      <Input
                        type="tel"
                        placeholder="Your Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Message</FormLabel>
                      <Textarea
                        placeholder="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <Button type="submit" colorScheme="brand" size="lg">
                      Send Message
                    </Button>
                  </VStack>
                </form>
              </VStack>
            </Box>

            {/* Google Map */}
            <Box>
              <Heading size="lg" mb={4}>
                Find Us Here
              </Heading>
              <Box
                borderRadius="xl"
                overflow="hidden"
                w="full"
                h={{ base: "300px", md: "500px" }}
                boxShadow="lg"
              >
                <iframe
                  title="Hyderabad Hospital Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.497186797873!2d78.38073167497966!3d17.44852328802706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb973aa29bdbbd%3A0xacf3c2bb31e0d65!2sHitech%20City%2C%20Hyderabad%2C%20Telangana%20500081!5e0!3m2!1sen!2sin!4v1698394500000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA */}
      <Box py={20} bg={secondaryColor}>
        <Container maxW="container.xl">
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            bg="brand.500"
            color="white"
            p={12}
            borderRadius="2xl"
            textAlign={{ base: "center", md: "left" }}
          >
            <VStack align={{ base: "center", md: "start" }} spacing={4}>
              <Heading size="2xl">Book Your Appointment Today</Heading>
              <Text fontSize="lg">
                Our doctors in Hyderabad are ready to provide you with the best care possible.
              </Text>
            </VStack>
            <Button
              colorScheme="whiteAlpha"
              size="lg"
              mt={{ base: 6, md: 0 }}
              rightIcon={<FiArrowRight />}
              as="a"
              href="/appointment"
            >
              Book Now
            </Button>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default ContactPage;
