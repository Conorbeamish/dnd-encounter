const express = require("express");
const router = express.Router({ mergeParams: true});

const { 
    createMonster,
    getAllMonsters,
    getMonster,
    deleteMonster
} = require("../handlers/monsters");

router
    .route("/")
    .post(createMonster)
    .get(getAllMonsters);

router
    .route("/:monster_id")
    .get(getMonster)
    .delete(deleteMonster);

module.exports = router;