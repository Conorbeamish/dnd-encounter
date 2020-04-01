const express = require("express");
const router = express.Router({ mergeParams: true});

const { 
    createMagicItem,
    deleteMagicItem
} = require("../handlers/magicItems");

router
    .route("/")
    .post(createMagicItem)

router
    .route("/:magicItem_id")
    .delete(deleteMagicItem);

module.exports = router;