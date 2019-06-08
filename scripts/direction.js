const googleApiKey = 'AIzaSyA9NWrD5Kft_Tk0i6GiCzm1kwKYKPbzEHA';
const googleMapsClient = require('@google/maps').createClient({ key: googleApiKey });


const vector = [
  { origin: '-22.920934,-43.2180615', destination: '-22.9196691,-43.2148643' },
  { origin: '-22.9196691,-43.2148643', destination: '-22.9185552,-43.2127814' },
  { origin: '-22.9185552,-43.2127814', destination: '-22.9071033,-43.1741033' },
]

const t = v => new Promise((resolve, reject) => {
  googleMapsClient.directions(v, (err, d) => err ? reject(err) : resolve(d))
});

Promise.all(vector.map(t))
  .then(JSON.stringify)
  .then(console.log)
  .catch(console.log);


