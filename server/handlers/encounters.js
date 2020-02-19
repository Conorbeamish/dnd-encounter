const db = require("../models/index");

exports.createEncounter = async function(req, res, next){
    try{
        let encounter = await db.Encounter.create({
            title: req.body.title,
            user: req.params.id
        });
        let foundUser = await db.User.findById(req.params.id)
        foundUser.encounters.push(encounter.id);
        await foundUser.save();
        let foundEncounter = db.Encounter.findById(encounter_id).populate("user", {
            username: true
        });
        return(200).json(foundEncounter);
    } catch (err){
        return next(err)
    }
};

exports.getEncounter = async function(req, res, next){};

exports.deleteEncounter = async function(req, res, next){};