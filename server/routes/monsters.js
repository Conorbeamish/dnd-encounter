const express = require("express");
const router = express.Router({ mergeParams: true});

const { 
    createMonster
//     getAllEncounters,
//     getEncounter,
//     deleteEncounter
} = require("../handlers/monsters");

router
    .route("/")
    .post(createMonster);
//     .get(getAllEncounters);

// router
//     .route("/:encounter_id")
//     .get(getEncounter)
//     .delete(deleteEncounter);

module.exports = router;