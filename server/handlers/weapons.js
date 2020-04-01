const db = require("../models/index");

exports.createWeapon = async function(req, res, next){
    try{
        let weapon = await db.Weapon.create({
            info: req.body.info,
            user: req.params.id,
            encounter: req.params.encounter_id
        });

        let foundEncounter = await db.Encounter.findById(req.params.encounter_id);
        foundEncounter.weapons.push(weapon.id);
        await foundEncounter.save();
        let foundWeapon = await db.Weapon.findById(weapon._id)
        .populate("encounter",{
            title: true
        });
        return res.status(200).json(foundWeapon);
    } catch (err){
        return next(err)
    }
};

exports.deleteWeapon = async function(req, res, next){
    try{
       let foundWeapon = await db.Weapon.findById(req.params.weapon_id);
       await foundWeapon.remove();
       return res.status(200).json(foundWeapon);
    } catch (err) {
        return next(err);
    }
};