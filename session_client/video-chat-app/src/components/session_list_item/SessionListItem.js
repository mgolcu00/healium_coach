// SessionListItem.js
import React from 'react';
import { Box, Text, Button, Flex, Spacer } from '@chakra-ui/react'; // Spacer ve Flex bileşenlerini ekleyin
import { Link } from 'react-router-dom';

function SessionListItem({ session }) {
  return (
    <Box bg="white" p={5} shadow="md" borderWidth="1px" borderRadius="md" borderColor="gray.200">
      <Flex alignItems="center">
        <Box>
          <Text fontSize="xl">{session.name}</Text>
          <Text>{session.date}</Text>
        </Box>
        <Spacer /> 
        <Link to={`/session/${session._id}`}> 
          <Button colorScheme="teal" mt={3}>
            Katıl
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}

export default SessionListItem;
