import React, { useState } from 'react';
import { Button, Input, Select, VStack, Box, Heading, useToast } from '@chakra-ui/react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const AddEmployee = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState('');
    const toast = useToast();

    const handleSubmit = async () => {
        if (!firstName || !lastName || !email || !department || !salary) {
            toast({
                title: "Submission Error.",
                description: "All fields are required.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        await addDoc(collection(db, 'employees'), { firstName, lastName, email, department, salary });
        setFirstName('');
        setLastName('');
        setEmail('');
        setDepartment('');
        setSalary('');
        toast({
            title: "Employee Added.",
            description: "The employee has been added successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Box p={4} borderWidth={1} borderRadius="lg" mb={4} boxShadow="lg">
            <Heading size="md" mb={4}>Add Employee</Heading>
            <VStack spacing={4}>
                <Input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <Input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Select placeholder="Select Department" value={department} onChange={(e) => setDepartment(e.target.value)}>
                    <option value="Tech">Tech</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                </Select>
                <Input placeholder="Salary" type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
                <Button onClick={handleSubmit} colorScheme="teal">Add Employee</Button>
            </VStack>
        </Box>
    );
};

export default AddEmployee;
