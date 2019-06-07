const { Schema, model } = require('mongoose');
const Company = require('./Company');

const peopleSchema = new Schema({
  company: Company,
  name: String,
  identify: String,
  geo: {
    lat: Number,
    long: Number
  },
  arrivalTime: Date,
  departureTime: Date
});

module.exports = model('People', peopleSchema);