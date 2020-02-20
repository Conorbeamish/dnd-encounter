const express = require("express");
const router = express.Router({ mergeParams: true});

const { 
    createEncounter,
    getAllEncounters,
    getEncounter,
    deleteEncounter
} = require("../handlers/encounters");

router
    .route("/")
    .post(createEncounter)
    .get(getAllEncounters);

router
    .route("/:encounter_id")
    .get(getEncounter)
    .delete(deleteEncounter);

module.exports = router;