const express = require("express");
const router = express.Router({ mergeParams: true});

const { 
    createWeapon,
    deleteWeapon
} = require("../handlers/weapons");

router
    .route("/")
    .post(createWeapon)

router
    .route("/:weapon_id")
    .delete(deleteWeapon);

module.exports = router;