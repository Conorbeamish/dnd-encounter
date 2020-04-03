const db = require("../models/index");

exports.createEncounter = async function(req, res, next){
    try{
        let encounter = await db.Encounter.create({
            title: req.body.title,
            user: req.params.id
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.encounters.push(encounter.id);
        await foundUser.save();
        let foundEncounter = await db.Encounter.findById(encounter._id).populate("user", {
            username: true
        });
        return res.status(200).json(foundEncounter);
    } catch (err){
        return next(err)
    }
};

exports.getEncounter = async function(req, res, next){
    try{
        let encounter = await db.Encounter.findById(req.params.encounter_id).populate("monsters", {
            info: true,
            user: true, 
            encounter:true
        }).populate("weapons", {
            info: true,
            user: true, 
            encounter:true
        }).populate("magicItems", {
            info: true,
            user: true, 
            encounter:true
        })

        return res.status(200).json(encounter);
    } catch (err) {
        return next(err);
    }
};

exports.getAllEncounters = async function(req, res, next){
    try{
        let encounters = await db.Encounter.find({user: req.params.id}).populate("monsters", {
            info: true
        })
        .sort({createdAt: "desc"})
        return res.status(200).json(encounters);
    } catch (err) {
        return next(err);
    }
};

exports.deleteEncounter = async function(req, res, next){
    try{
       let foundEncounter = await db.Encounter.findById(req.params.encounter_id);
       await foundEncounter.remove();
       return res.status(200).json(foundEncounter);
    } catch (err) {
        return next(err);
    }
};