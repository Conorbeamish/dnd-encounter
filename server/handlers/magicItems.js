const db = require("../models/index");

exports.createMagicItem = async function(req, res, next){
    try{
        let magicItem = await db.MagicItem.create({
            info: req.body.info,
            user: req.params.id,
            encounter: req.params.encounter_id
        });

        let foundEncounter = await db.Encounter.findById(req.params.encounter_id);
        foundEncounter.magicItems.push(magicItem.id);
        await foundEncounter.save();
        let foundMagicItem = await db.MagicItem.findById(magicItem._id)
        .populate("encounter",{
            title: true
        });
        return res.status(200).json(foundMagicItem);
    } catch (err){
        return next(err)
    }
};

exports.deleteMagicItem = async function(req, res, next){
    try{
       let foundMagicItem = await db.MagicItem.findById(req.params.magicItem_id);
       await foundMagicItem.remove();
       return res.status(200).json(foundMagicItem);
    } catch (err) {
        return next(err);
    }
};