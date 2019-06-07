const fs = require('fs');
const csv = require('csv')
const path = require('path');
const request = require('request');

const CVS_FILES = path.resolve(__dirname, '../db/data.csv');
const delimiter = ';';
const googleApiKey = 'AIzaSyA9NWrD5Kft_Tk0i6GiCzm1kwKYKPbzEHA';

const googleMapsClient = require('@google/maps').createClient({ key: googleApiKey });

const toObject = csv.transform(csvDataArray => ({
  name: csvDataArray[1],
  identify: csvDataArray[12],
  zipCode: csvDataArray[10]
}));

const inflateGeoloc = csv.transform((object, callback) => {
  if (object && object.zipCode) {
    return googleMapsClient.geocode({ address: object.zipCode }, (err, response) => {
      try {
        if (!err) {
          if (response.json.results[0]) {
            const lat = response.json.results[0].geometry.location.lat;
            const long = response.json.results[0].geometry.location.lng;
            callback(null, {
              name: object.name,
              identify: object.identify,
              geo: {
                lat, long
              }
            });
          }
          return;
        }
        callback(err);
      } catch (e) {
        callback(e);
      }
    });
  }
  callback(null, null);
});

const sendBackend = csv.transform((body, cb) => {
  request({
    method: "PUT",
    url: 'http://localhost:10000/people',
    json: true,
    body
  }, (err, response, body) => {
    cb(err, body);
  });
});

fs.createReadStream(CVS_FILES)
  .pipe(csv.parse({ delimiter }))
  .pipe(toObject)
  .pipe(inflateGeoloc)
  .pipe(sendBackend)
  .pipe(csv.transform(d => JSON.stringify(d)))
  .pipe(process.stdout)
  .on('end', () => console.log("Done!"));  