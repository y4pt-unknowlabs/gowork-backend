const router = require('express').Router();
const firebase = require('firebase');
let state = false;
let timer = null;
let points = require('../../db/points-simulator.json');
let index = 0;
let timeFactor = 5000;

// action
router.post("/action", async (req, res) => {
  timeFactor = req.body.timeFactor || 5000;
  const oldState = state;
  state = !state;
  if (!oldState) { // play
    await play();
  } else { // pause
    await pause();
  }
  res.redirect('/simulator');
});

function play() {
  timer = setTimeout(() => {
    task();
    if (state) {
      play();
    }
  }, timeFactor);
}

function pause() {
  clearImmediate(timer);
}

function task() {
  const point = points[index];
  firebase.database().ref('onibus/onibus1').set({
    latitude: point.lat,
    longitude: point.lng
  });
  console.log("sending", point);
  if (index == points.length - 1) {
    index = 0;
  } else {
    index++
  }
}

// reset
router.get("/action", async (req, res) => {
  state = 0;
  index = 0;
  res.redirect('/simulator');
});

router.get("/", async (req, res) => {
  const html = `
  <form action="/simulator/action" method="post">
    ${state ? '<i>running</i><br>' : ''}
    <label>Speed:</label>
    <input value="${timeFactor}" type="number" name="timeFactor" /><br>
    <button type="submit" formmethod="post">${!state ? 'play' : 'pause'}</button><br>
    <button type="submit" formmethod="get">reset</button><br>
  </form>
  `;
  res.send(html);
});


module.exports = router;