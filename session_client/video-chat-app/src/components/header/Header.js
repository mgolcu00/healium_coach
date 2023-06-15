import { Box, Text, Flex } from "@chakra-ui/react";

const Header = ({ user }) => (
  <Box bg="blue.500" w="100%" p={4} color="white">
    <Flex justify="space-between">
      <Text fontSize="xl" fontWeight="bold">
        Healim ADHD coaching
      </Text>
      <Text>{user.name}</Text>
    </Flex>
  </Box>
);

export default Header;
