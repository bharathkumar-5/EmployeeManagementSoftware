import React, { useState } from 'react';
import { Button, Input, VStack, Box, Heading, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    const handleLogin = async () => {
        const response = await fetch('https://reqres.in/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            navigate('/dashboard');
        } else {
            toast({
                title: "Login Failed.",
                description: "Please check your email and password.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={4} borderWidth={1} borderRadius="lg" maxWidth="400px" mx="auto" mt="100px" boxShadow="lg">
            <Heading size="lg" mb={4}>Login</Heading>
            <VStack spacing={4}>
                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleLogin} colorScheme="teal">Login</Button>
            </VStack>
        </Box>
    );
};

export default Login;
