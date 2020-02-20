const db = require("../models/index");

exports.createMonster = async function(req, res, next){
    try{
        let monster = await db.Monster.create({
            info: req.body.info,
            user: req.params.id,
            encounter: req.params.encounter_id
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.monsters.push(monster.id);
        await foundUser.save();
        let foundEncounter = await db.Encounter.findById(req.params.encounter_id);
        foundEncounter.monsters.push(monster.id);
        await foundEncounter.save();
        let foundMonster = await db.Monster.findById(monster._id).populate("user", {
            username: true
        })
        .populate("encounter",{
            title: true
        });
        return res.status(200).json(foundMonster);
    } catch (err){
        return next(err)
    }
};