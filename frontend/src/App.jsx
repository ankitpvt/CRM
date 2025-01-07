import React from 'react';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import { BrowserRouter, Route, Routes } from "react-router-dom"
function App() {
  return (
    <div className="App">
<h2>CRM - Customer Relationship Manager</h2>
     <BrowserRouter>
    <Routes>
      <Route path="/" element={<CustomerList/>} />
      <Route path="form" element={<CustomerForm />}>
      </Route>
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
