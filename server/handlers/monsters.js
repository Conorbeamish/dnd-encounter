const db = require("../models/index");

exports.createMonster = async function(req, res, next){
    try{
        let monster = await db.Monster.create({
            info: req.body.info,
            user: req.params.id,
            encounter: req.params.encounter_id
        });

        let foundEncounter = await db.Encounter.findById(req.params.encounter_id);
        foundEncounter.monsters.push(monster.id);
        await foundEncounter.save();
        let foundMonster = await db.Monster.findById(monster._id)
        .populate("encounter",{
            title: true
        });
        return res.status(200).json(foundMonster);
    } catch (err){
        return next(err)
    }
};

exports.getMonster = async function(req, res, next){
    try{
        let monster = await db.Monster.findById(req.params.monster_id);
        return res.status(200).json(monster);
    } catch (err) {
        return next(err);
    }
};

exports.getAllMonsters = async function(req, res, next){
    try{
        let monsters = await db.Monster.find({encounter: req.params.encounter_id});
        return res.status(200).json(monsters);
    } catch (err) {
        return next(err);
    }
};

exports.deleteMonster = async function(req, res, next){
    try{
       let foundMonster = await db.Monster.findById(req.params.monster_id);
       await foundMonster.remove();
       return res.status(200).json(foundMonster);
    } catch (err) {
        return next(err);
    }
};