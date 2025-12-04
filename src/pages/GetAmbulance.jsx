import React from 'react';
import { IconButton, Box } from '@chakra-ui/react';
import { FaAmbulance } from 'react-icons/fa';
import { useAmbulance } from '../context/AmbulanceContext';

const GetAmbulance = () => {
  const { openAmbulanceModal } = useAmbulance();

  return (
    <Box
      position="fixed"
      bottom="80px"
      right="30px"
      zIndex="1000"
    >
      {/* Ripple Rings */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        borderRadius="full"
        animation="ripple 2s infinite"
        zIndex="-1"
        _before={{
          content: '""',
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          borderRadius: 'full',
          border: '2px solid rgba(255,0,0,0.6)',
          animation: 'ripple 2s infinite 0.5s',
        }}
        _after={{
          content: '""',
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          borderRadius: 'full',
          border: '2px solid rgba(255,0,0,0.3)',
          animation: 'ripple 2s infinite 1s',
        }}
      />

      <IconButton
        aria-label="Get Ambulance"
        icon={<FaAmbulance />}
        size="lg"
        colorScheme="red"
        borderRadius="full"
        boxShadow="2xl"
        w="50px"
        h="50px"
        onClick={openAmbulanceModal}
        _hover={{ transform: 'scale(1.1)' }}
      />
    </Box>
  );
};

// Chakra global styles for ripple animation
const rippleKeyframes = `
@keyframes ripple {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    70% {
        transform: scale(2.5);
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
}
`;

const style = document.createElement("style");
style.appendChild(document.createTextNode(rippleKeyframes));
document.head.appendChild(style);

export default GetAmbulance;
