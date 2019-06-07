const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  // idEmpresa: string;
  name: { type: String, unique: true, required: true },
  geo: {
    lat: Number,
    long: Number
  }
});

module.exports = mongoose.model('Company', companySchema);