const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const customerRoutes = require('./routes/customerRoutes');

dotenv.config();
const app = express();

// app.use(cors());
app.use(cors({
    origin: 'https://crm-frontend-tau-six.vercel.app',  // Your actual frontend deployment URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));
app.use(express.json());
app.use('/api/customers', customerRoutes);

mongoose
  .connect('mongodb://localhost:27017/customer', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.listen(5000, () => console.log(`Server running on port {5000}`));
