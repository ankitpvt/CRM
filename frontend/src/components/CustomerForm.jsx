import React, { useState } from 'react';
import axios from 'axios';
import './form.css'
import { Link } from 'react-router-dom';

const CustomerForm = () => {
  const [formData, setFormData] = useState({ name: '', lname: '', email: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('https://crm-backend-sable.vercel.app/api/customers', formData);
    setFormData({ name: '', lname: '', email: '' });
    // fetchCustomers();
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
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
      <button type="submit">Add Customer</button>
    </form>

<h3><Link to="/">Back to List</Link></h3>
    </>
  );
};

export default CustomerForm;
