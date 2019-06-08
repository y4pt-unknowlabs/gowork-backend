const router = require('express').Router();
const People = require('../models/People');
const Company = require('../models/People');

router.get("/", async (req, res) => {

  res.json({
    pup: [{
      lat: -22.920934,
      lng: -43.2180615
    },

    {
      lat: -22.9196691,
      lng: -43.2148643
    },

    {
      lat: -22.9185552,
      lng: -43.2127814
    }],

    final: {
      lat: -22.9071033,
      lng: -43.1741033
    },

  });
});


router.get("/direction", async (req, res) => {
  res.json(require("../../db/routes.json"));
});


module.exports = router;