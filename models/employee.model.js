const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmpSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Employee = new mongoose.model('newEmp', EmpSchema);

module.exports = Employee;