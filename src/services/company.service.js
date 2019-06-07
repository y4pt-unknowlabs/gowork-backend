const router = require('express').Router();
const Company = require('../models/Company');

// Insert data
router.put("/", async (req, res) => {
  const company = new Company(req.body);
  res.json(await company.save());
});

// Update data
router.post("/:id", async (req, res) => {
  const company = Company.findById(req.params.id);
  res.json(await company.save());
});

module.exports = router;