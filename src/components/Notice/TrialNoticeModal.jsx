import React, { useEffect, useState } from "react";
import {
  Modal, ModalBody, ModalContent, ModalOverlay,
  Button, Box, Text, Heading, Avatar, VStack, HStack, Badge, Divider
} from "@chakra-ui/react";
import { FiPhone, FiExternalLink, FiMessageSquare } from "react-icons/fi";
import { SiWhatsapp, SiGmail } from "react-icons/si";

const TrialNoticeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Show modal only on first visit
  useEffect(() => {
    const seen = localStorage.getItem("trial_notice_seen");
    if (!seen) {
      setIsOpen(true);
      localStorage.setItem("trial_notice_seen", "true");
    }
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="2xl" p={4}>
        <ModalBody>
          <VStack spacing={5}>

            <Avatar size="2xl" src="/assets/Sachin.png" />

            <Heading size="lg" textAlign="center">
              ⚠️ Trial Website Notice
            </Heading>

            <Text textAlign="center" fontSize="md">
              This is a <b>trial website</b> developed by <b>Sachin Sharma</b>.
              You can explore the features, but the trial will end soon.
            </Text>

            <Divider />

            <Heading size="md">Contact Developer</Heading>

            <VStack w="100%">
              <Button
                colorScheme="green" leftIcon={<SiWhatsapp />}
                rightIcon={<FiExternalLink />}
                w="100%"
                onClick={() => window.open("https://wa.me/917906310812", "_blank")}
              >
                WhatsApp
              </Button>

              <Button
                colorScheme="red" leftIcon={<SiGmail />}
                rightIcon={<FiExternalLink />}
                w="100%"
                onClick={() => window.open("mailto:mr-sachinsharma.dev@gmail.com")}
              >
                Email
              </Button>

              <Button
                colorScheme="blue" leftIcon={<FiPhone />}
                rightIcon={<FiExternalLink />}
                w="100%"
                onClick={() => window.open("tel:+917906310812")}
              >
                Call
              </Button>
            </VStack>

            <Button colorScheme="blue" onClick={() => setIsOpen(false)}>
              Continue to Website
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TrialNoticeModal;
