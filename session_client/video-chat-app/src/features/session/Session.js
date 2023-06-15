import React, { useEffect, useRef, useState } from "react";
import { Box, VStack, Heading, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import Peer from "simple-peer";
import io from "socket.io-client";

const Session = () => {
  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();
  const peer = useRef(); // Peer bağlantısını saklamak için yeni bir ref oluşturduk
  const [isMicOff, setMicOff] = useState(false);
  const [isCamOff, setCamOff] = useState(false);

  const handleMicClick = () => {
    setMicOff(!isMicOff);
  };

  const handleCamClick = () => {
    setCamOff(!isCamOff);
  };

  const handleEndCall = () => {
    // Peer bağlantısını ve soketi temizleme işlemi
   // peer.current.destroy();
    // socket.current.close();
  };

  useEffect(() => {
    socket.current = io.connect("/"); // Your server URL here

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }

      socket.current.on("callUser", (data) => {
        peer.current = new Peer({ initiator: false, trickle: false, stream });

        peer.current.on("signal", (signal) => {
          socket.current.emit("acceptCall", { signal, to: data.from });
        });

        peer.current.on("stream", (stream) => {
          if (partnerVideo.current) {
            partnerVideo.current.srcObject = stream;
          }
        });

        peer.current.signal(data.signal);
      });
    });
  }, []);

  const bgColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <VStack spacing={5} align="stretch" p={5} h="100vh" bg={bgColor}>
      <Heading mb={10} textAlign="center" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">Healium</Heading>
      <Flex flex="1" direction={['column', 'row']}>
        <Box flex="1" bg="gray.200" p={5} m={2} borderRadius="md">
          <video playsInline muted ref={userVideo} autoPlay />
        </Box>
        <Box flex="1" bg="gray.300" p={5} m={2} borderRadius="md">
          <video playsInline ref={partnerVideo} autoPlay />
        </Box>
      </Flex>
      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <Button
          colorScheme={isMicOff ? "red" : "teal"}
          onClick={handleMicClick}
          mx={2}
        >
          {isMicOff ? "Mikrofonu Aç" : "Mikrofonu Kapat"}
        </Button>
        <Button
          colorScheme={isCamOff ? "red" : "teal"}
          onClick={handleCamClick}
          mx={2}
        >
          {isCamOff ? "Kamerayı Aç" : "Kamerayı Kapat"}
        </Button>
        <Button
          colorScheme="red"
          onClick={handleEndCall}
          mx={2}
        >
          Görüşmeyi Sonlandır
        </Button>
      </Box>
    </VStack>
  );
};

export default Session;
