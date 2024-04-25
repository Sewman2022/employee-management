//backend/models/Employee.js

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employee_id: { type: String, required: true, unique: true },
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hashed_password: { type: String, required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);
