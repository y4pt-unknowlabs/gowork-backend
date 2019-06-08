const fs = require('fs')
const csv = require('csv')
const config = require('config');
const mongoose = require('mongoose');
const People = require('../src/models/People');
const path = require('path');

const CVS_FILES = path.resolve(__dirname, '../db/data-lat.csv');
const delimiter = ',';


(async function () {
  try {
    const fileStream = fs.createWriteStream(CVS_FILES);
    await mongoose.connect(config.get("db.host"), config.get("db.options"));
    const people = await People.find();
    process.stdout.write(`name${delimiter}latitude${delimiter}longitude\n`);
    people.forEach(p => process.stdout.write(`${p.name}${delimiter}${p.geo.lat}${delimiter}${p.geo.long}\n`));
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
})()