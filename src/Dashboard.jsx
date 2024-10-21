import React from 'react';
import { Button, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import AddEmployee from './AddEmployee';
import EmployeeTable from './EmployeeTable';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <Box p={4}>
            <Button onClick={handleLogout} colorScheme="red" mb={4}>Logout</Button>
            <AddEmployee />
            <EmployeeTable />
        </Box>
    );
};

export default Dashboard;
