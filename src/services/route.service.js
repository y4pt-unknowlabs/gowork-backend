const router = require('express').Router();
const People = require('../models/People');
const Company = require('../models/People');

router.get("/", async (req, res) => {

  res.json({
    pup: [{ lat: -22.907378, long: -43.1744772 }],
    final: { lat: -22.920442, long: -43.2305017 }
  });
});


router.get("/direction", async (req, res) => {
  res.json(require("../../db/routes.json"));
});


module.exports = router;