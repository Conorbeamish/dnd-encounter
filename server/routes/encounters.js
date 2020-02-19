const express = require("express");
const router = express.Router({ mergeParams: true});

const { createEncounter } = require("../handlers/encounters");

router.route("/").post(createEncounter);

module.exports = router;