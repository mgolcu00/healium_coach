import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box } from '@chakra-ui/react';

const CustomCalendar = ({ onDateChanged }) => {
    const [dateValue, setDateValue] = useState(new Date());

    const handleDateChange = (value) => {
        setDateValue(value);
        onDateChanged(value);
    };

    return (
        <Box
            bg="white"
            boxShadow="md"
            p={6}
            rounded="md"
            w="full"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
        >
            <Calendar
                onChange={handleDateChange}
                value={dateValue}
            // Diğer özelleştirmeleri burada yapabilirsiniz.
            />
        </Box>
    );
}

export default CustomCalendar;