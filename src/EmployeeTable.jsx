import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Input, Box, Select, HStack } from '@chakra-ui/react';

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDepartment, setFilterDepartment] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const employeesPerPage = 5;

    useEffect(() => {
        const fetchEmployees = async () => {
            const querySnapshot = await getDocs(collection(db, 'employees'));
            setEmployees(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, 'employees', id));
        setEmployees(employees.filter(emp => emp.id !== id));
    };

    const filteredEmployees = employees
        .filter(emp => emp.department.includes(filterDepartment))
        .filter(emp => emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(currentPage * employeesPerPage, (currentPage + 1) * employeesPerPage);

    const totalPages = Math.ceil(employees.length / employeesPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Box mt={4}>
            <HStack mb={4}>
                <Input placeholder="Search by First Name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <Select placeholder="Filter by Department" value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)}>
                    <option value="Tech">Tech</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                </Select>
            </HStack>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>First Name</Th>
                        <Th>Last Name</Th>
                        <Th>Email</Th>
                        <Th>Department</Th>
                        <Th>Salary</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {filteredEmployees.map(emp => (
                        <Tr key={emp.id}>
                            <Td>{emp.firstName}</Td>
                            <Td>{emp.lastName}</Td>
                            <Td>{emp.email}</Td>
                            <Td>{emp.department}</Td>
                            <Td>{emp.salary}</Td>
                            <Td>
                                <Button colorScheme="blue" mr={2}>Edit</Button>
                                <Button colorScheme="red" onClick={() => handleDelete(emp.id)}>Delete</Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <HStack justify="space-between" mt={4}>
                <Button isDisabled={currentPage === 0} onClick={() => handlePageChange(currentPage - 1)}>Previous</Button>
                <Button isDisabled={currentPage + 1 >= totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
            </HStack>
        </Box>
    );
};

export default EmployeeTable;
