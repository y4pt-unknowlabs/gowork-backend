const router = require('express').Router();
const People = require('../models/People');

// Insert data
router.put("/", async (req, res) => {
  const people = new People(req.body);
  res.json(await people.save());
});

// Update data
router.post("/:id", async (req, res) => {
  const people = People.findById(req.params.id);
  res.json(await people.save());
});

module.exports = router;