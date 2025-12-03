import { Box, Button, Flex, Heading, Text, Image, useColorModeValue } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionText = motion(Text);

const WelcomePage = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const highlightColor = useColorModeValue('blue.500', 'blue.300');

  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const rotateAnimation = {
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={bgColor}
      color={textColor}
      flexDirection="column"
      p={4}
      position="relative"
      overflow="hidden"
    >
      {/* Animated background elements */}
      <MotionBox
        position="absolute"
        top="10%"
        left="10%"
        w="100px"
        h="100px"
        borderRadius="full"
        bg="rgba(66, 153, 225, 0.1)"
        animate={isAnimating ? floatingAnimation : {}}
      />
      <MotionBox
        position="absolute"
        bottom="15%"
        right="15%"
        w="150px"
        h="150px"
        borderRadius="full"
        bg="rgba(236, 201, 75, 0.1)"
        animate={isAnimating ? rotateAnimation : {}}
      />
      <MotionBox
        position="absolute"
        top="30%"
        right="20%"
        w="80px"
        h="80px"
        borderRadius="full"
        bg="rgba(159, 122, 234, 0.1)"
        animate={isAnimating ? floatingAnimation : {}}
      />

      {/* Main content */}
      <MotionBox
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        textAlign="center"
        zIndex="1"
      >
        <MotionText
          fontSize={{ base: '9rem', md: '12rem' }}
          fontWeight="bold"
          bgGradient={`linear(to-r, ${highlightColor}, purple.500)`}
          bgClip="text"
          animate={pulseAnimation}
        >
          Welcome
        </MotionText>

        <Heading as="h1" size="xl" mb={4}>
          This is the template for react + ChakraUI
        </Heading>

        <Text fontSize="lg" mb={8} maxW="md" mx="auto">
          Creatd by <a href='https://mr-sachinsharma.vercel.app/' >Sachin Sharma</a>
        </Text>

        <MotionButton
          as={Link}
          to="/"
          colorScheme="blue"
          size="lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          mb={8}
        >
          Go Back Home
        </MotionButton>

        <MotionBox
          animate={{
            x: [0, 10, -10, 10, -10, 0],
            transition: { duration: 1.5 }
          }}
        >
          {/* <Image
            src="https://cdn.lottiefiles.com/private_files/lf30_glqixn8r.json"
            alt="404 illustration"
            w={{ base: '300px', md: '400px' }}
            h="auto"
            mx="auto"
          /> */}
        </MotionBox>
      </MotionBox>

      {/* Interactive confetti */}
      <AnimatePresence>
        {isAnimating && (
          <>
            {[...Array(20)].map((_, i) => (
              <MotionBox
                key={i}
                position="absolute"
                w="12px"
                h="12px"
                bg={i % 2 === 0 ? 'blue.400' : 'purple.400'}
                borderRadius="sm"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -50,
                  rotate: Math.random() * 360
                }}
                animate={{
                  y: window.innerHeight,
                  x: Math.random() * 200 - 100,
                  rotate: Math.random() * 360,
                  opacity: [1, 0.8, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  delay: Math.random() * 0.5,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 5
                }}
                exit={{ opacity: 0 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </Flex>
  );
};

export default WelcomePage;