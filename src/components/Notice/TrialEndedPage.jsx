import React from "react";
import {
  Box, Text, Heading, VStack, Button, Avatar, Divider
} from "@chakra-ui/react";
import { SiWhatsapp, SiGmail } from "react-icons/si";
import { FiPhone, FiExternalLink } from "react-icons/fi";

const TrialEndedPage = () => {
  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box p={8} borderRadius="2xl" boxShadow="lg" maxW="400px">
        <VStack spacing={5}>

          <Avatar size="2xl" src="/assets/Sachin.png" />

          <Heading size="lg" textAlign="center">Trial Expired</Heading>

          <Text textAlign="center">
            This trial period has ended.  
            To continue using this website, please contact <b>Sachin Sharma</b>.
          </Text>

          <Divider />

          <VStack w="100%">
            <Button
              colorScheme="green" w="100%"
              leftIcon={<SiWhatsapp />} rightIcon={<FiExternalLink />}
              onClick={() => window.open("https://wa.me/917906310812", "_blank")}
            >
              WhatsApp
            </Button>

            <Button
              colorScheme="red" w="100%"
              leftIcon={<SiGmail />} rightIcon={<FiExternalLink />}
              onClick={() => window.open("mailto:mr-sachinsharma.dev@gmail.com")}
            >
              Email
            </Button>

            <Button
              colorScheme="blue" w="100%"
              leftIcon={<FiPhone />} rightIcon={<FiExternalLink />}
              onClick={() => window.open("tel:+917906310812")}
            >
              Call
            </Button>
          </VStack>

        </VStack>
      </Box>
    </Box>
  );
};

export default TrialEndedPage;
