// components/Dashboard/EmployeeForm.jsx
import React, { useState, useEffect } from 'react';
import { Button, Input, Select, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';

const EmployeeForm = ({ isOpen, onClose, onSubmit, employee }) => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', department: '', salary: '' });

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    } else {
      setFormData({ firstName: '', lastName: '', email: '', department: '', salary: '' });
    }
  }, [employee]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{employee ? 'Edit Employee' : 'Add Employee'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
          <Input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
          <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <Select name="department" placeholder="Select Department" value={formData.department} onChange={handleChange}>
            <option value="Tech">Tech</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
          </Select>
          <Input name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit}>{employee ? 'Update' : 'Add'}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EmployeeForm;
