import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, FormHelperText, Center } from "@chakra-ui/react";
import {login,setToken,setUser} from '../../data/api';
function isValidEmail(email) {
    return true;
    // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(email).toLowerCase());
}

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");

    const handleLoginClick = () => {
        if (isValidEmail(email)) {
            setEmailError("");
            console.log("Email and Password", email, password);
            // Do Login
            login(email, password).then((res) => {
                console.log("Login Response", res);
                // Save Token
                setToken(res.token);
                setUser(res.user);
                // Redirect to Home
                window.location.href = "/";

            }).catch((err) => {
                console.log("Login Error", err);
            });


        } else {
            setEmailError("Geçerli bir e-posta adresi girin.");
        }
    }

    return (
        <Center h="100vh">
            <Box p={5} boxShadow="lg" rounded="md" bg="white">
                <FormControl id="email" mb={4}>
                    <FormLabel>E-posta Adresi</FormLabel>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <FormHelperText color="red">{emailError}</FormHelperText>
                </FormControl>
                <FormControl id="password" mb={4}>
                    <FormLabel>Şifre</FormLabel>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormControl>
                <Button colorScheme="blue" onClick={handleLoginClick}>Giriş Yap</Button>
            </Box>
        </Center>
    );
}

export default Login;
