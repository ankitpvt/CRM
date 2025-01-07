const Customer = require('../models/Customer');

// Get all customers
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new customer
const addCustomer = async (req, res) => {
  const { name, lname, email } = req.body;
  try {
    const newCustomer = new Customer({ name, lname, email });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update customer
const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, lname, email } = req.body;
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(id, { name, lname, email }, { new: true });
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete customer
const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    await Customer.findByIdAndDelete(id);
    res.json({ message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCustomers, addCustomer, updateCustomer, deleteCustomer };

