import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

function CreateSessionModal({ isOpen, onClose , onSessionCreated}) {
  const [date, setDate] = useState("");
  const [peerEmail, setPeerEmail] = useState("");

  const handleSubmit = () => {
    // Burada session oluşturmak için bir API çağrısı yapabilirsiniz.
    console.log("Date: ", date);
    console.log("Peer Email: ", peerEmail);
    onSessionCreated({ date, peerEmail });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new session</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="date" isRequired>
            <FormLabel>Date</FormLabel>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </FormControl>
          <FormControl id="peerEmail" isRequired mt={4}>
            <FormLabel>Peer Email</FormLabel>
            <Input type="email" value={peerEmail} onChange={(e) => setPeerEmail(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Create Session
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateSessionModal;
