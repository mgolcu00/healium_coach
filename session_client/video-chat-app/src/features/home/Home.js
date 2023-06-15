import React, { useState, useEffect } from "react";
import { Box, Flex, VStack, Heading, IconButton } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import SessionListItem from "../../components/session_list_item/SessionListItem";
import "./Home.css";
import Header from "../../components/header/Header";
import CreateSessionModal from "../../components/create_session_modal/CreateSessionModal";

import { getUser, getSessionByHostId, createFully, getToken } from "../../data/api";


function Home() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [userData, setUserData] = useState(getUser());
  useEffect(() => {
    const fetchSessions = async () => {
      const user = getUser();
      const token = getToken();
      console.log("user and token");
      console.log(user);
      console.log(token);
      setUserData(user);
      const sessions = await getSessionByHostId(user._id, token);
      console.log(sessions);
      setSessions(sessions);
    };
    fetchSessions();
  }, []);


  const handleDateChange = (date) => {
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  const sessionDates = sessions.map(session => session.date);

  const tileContent = ({ date, view }) => {
    const dateString = date.toISOString().split("T")[0];
    return sessionDates.includes(dateString) ? <span style={{ color: 'red', fontSize: '1.5em' }}>•</span> : null;
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSessionCreated = (session) => {
    closeModal();
    const fortmattedSession = { date: session.date, name: session.peerEmail }
    createFully(
      userData._id,
      session.date,
      null,
      session.peerEmail,
      getToken());

    sessions.push(fortmattedSession);
  };


  return (
    <>
      <Header user={{ name: userData.name }} />
      <Flex p={5} mt={10}>
        <Box flex="1" p={5} bg="white" borderRadius="md" shadow="md">
          <Calendar
            onChange={handleDateChange}
            tileClassName={({ date, view }) =>
              selectedDate === date.toISOString().split("T")[0] ? "highlight" : ""
            }
            tileContent={tileContent}
          />
        </Box>
        <Box flex="1" ml={5} bg="white" borderRadius="md" shadow="md">
          <Flex p={5} justifyContent="space-between">
            <Heading size="md">Sessions</Heading>
            <IconButton colorScheme="teal" variant="outline" aria-label="Add session" icon={<AddIcon />} onClick={openModal} />
          </Flex>
          <VStack spacing={5} align="stretch" p={5}>
            {sessions.length > 0 ? (
              sessions.map((session, index) => (
                <SessionListItem key={index} session={session} />
              ))
            ) : (
              <Box
                p={5}
                shadow="md"
                borderWidth="1px"
                borderRadius="md"
                borderColor="gray.200"
                bg="white"
              >
                Bu tarih için session bulunmamaktadır.
              </Box>
            )}
          </VStack>
        </Box>
      </Flex>
      <CreateSessionModal isOpen={isModalOpen} onClose={closeModal} onSessionCreated={onSessionCreated} />
    </>
  );
}

export default Home;
