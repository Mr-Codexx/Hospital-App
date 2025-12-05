import React, { useEffect, useState } from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

const TrialCountdownFooter = () => {
  const [timeLeft, setTimeLeft] = useState("");

  const calculateTimeLeft = () => {
    const now = new Date();
    const trialEnd = new Date();
    trialEnd.setHours(16, 47, 0, 0); // Trial ends at 8 PM today

    const diff = trialEnd - now;

    if (diff <= 0) {
      setTimeLeft("Trial has ended");
      return;
    }

    const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
    const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

    setTimeLeft(`${hours}:${minutes}:${seconds}`);
  };

  useEffect(() => {
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      position="fixed"
      bottom="0"
      width="100%"
      bg={useColorModeValue("gray.100", "gray.700")}
      py={2}
      textAlign="center"
      boxShadow="0 -2px 10px rgba(0,0,0,0.1)"
      zIndex="2000"
    >
      <Text fontSize="sm" fontWeight="bold">
        ⏳ Time Left for Trial: <span style={{ color: "red" }}>{timeLeft}</span>
      </Text>
      <Text fontSize="xs" opacity={0.7}>
        Trial version — Developed by Sachin Sharma
      </Text>
    </Box>
  );
};

export default TrialCountdownFooter;
