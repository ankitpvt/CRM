import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './List.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({ name: '', lname: '', email: '' });

//   const fetchCustomers = async () => {
//     const response = await axios.get('https://crm-backend-eosin.vercel.app/api/customers');
//     setCustomers(response.data);
//   };


const fetchCustomers = async () => {
    try {
      const response = await axios.get('https://crm-backend-sable.vercel.app/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error("There was an error fetching the customers:", error);
    }
  };
  
  const updatedCustomer = async (id) => {
    // Fetch the selected customer data
    const customer = customers.find((customer) => customer._id === id);
    setSelectedCustomer(customer);
    setFormData({
      name: customer.name,
      lname: customer.lname,
      email: customer.email
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...formData };
//http://localhost:5000
    try {
      await axios.put(`https://crm-backend-sable.vercel.app/api/customers/${selectedCustomer._id}`, updatedData);
      fetchCustomers();
      setSelectedCustomer(null);
      setFormData({ name: '', lname: '', email: '' });
    } catch (error) {
      console.error("There was an error updating the customer!", error);
    }
  };

  const deleteCustomer = async (id) => {
    await axios.delete(`https://crm-backend-sable.vercel.app/api/customers/${id}`);
    fetchCustomers();
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <h3>
        <Link to="/form">Add Customer</Link>
      </h3>

      {/* Update Customer Form */}
      {selectedCustomer && (
        <form onSubmit={handleUpdateSubmit}>
          <h4>Update Customer</h4>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lname}
            onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <button type="submit">Update Customer</button>
        </form>
      )}

      {/* Customer List */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer.name}</td>
              <td>{customer.lname}</td>
              <td>{customer.email}</td>
              <td>
                <button onClick={() => updatedCustomer(customer._id)}>Update</button>
                <button onClick={() => deleteCustomer(customer._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
