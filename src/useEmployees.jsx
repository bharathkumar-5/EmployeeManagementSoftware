// hooks/useEmployees.jsx
import { useEffect, useState } from 'react';
import { db } from '../firebase.js';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const employeeCollection = collection(db, 'employees');
    const employeeSnapshot = await getDocs(employeeCollection);
    const employeeList = employeeSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setEmployees(employeeList);
  };

  const addEmployee = async (employee) => {
    await addDoc(collection(db, 'employees'), employee);
    fetchEmployees();
  };

  const updateEmployee = async (employee) => {
    const employeeDoc = doc(db, 'employees', employee.id);
    await updateDoc(employeeDoc, employee);
    fetchEmployees();
  };

  const deleteEmployee = async (id) => {
    const employeeDoc = doc(db, 'employees', id);
    await deleteDoc(employeeDoc);
    fetchEmployees();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return { employees, addEmployee, updateEmployee, deleteEmployee };
};
