const config = require('config');
const mongoose = require('mongoose');
const elasticsearch = require('elasticsearch');
const People = require('../src/models/People');

const esClient = new elasticsearch.Client({
  host: config.get("es.host"),
  log: 'trace'
});

(async function () {
  try {
    await mongoose.connect(config.get("db.host"), config.get("db.options"));
    const people = await People.find();

    await esClient.ping({
      requestTimeout: 3000
    });
    const body = [];

    // body.push({ index: { _index: 'people', _type: '_doc', _id: 1 } })
    // body.push({ title: 'people' })

    people.forEach(p => {
      body.push({ "index": { "_index": "people", _type: '_doc', "_id": p._id } });
      body.push({
        name: p.name,
        geo: {
          lat: p.geo.lat,
          lng: p.geo.lng
        },
      });
      // body.push({ delete: { "_index": 'people', _id: p._id } });
    });

    // await esClient.indices.create({ index: 'people' })

    await esClient.bulk({ body: body });
    console.log("junda");
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
})()