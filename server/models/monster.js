const mongoose = require("mongoose");
const User = require("./user");
const Encounter = require("./encounter");
const db = require("../models/index");

const monsterSchema = new mongoose.Schema({
    info:{
        type: Array,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    encounter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Encounter"
    }
});

monsterSchema.pre("remove", async function(next){
    try{
        let encounter = await db.Encounter.findById(this.encounter);
        //Check to see if encounter exists
        //Relevant when deleting whole encounter 
        if(encounter){
            encounter.monsters.remove(this.id);
            await encounter.save();
            return next();
        } else {
            return next();
        }
    } catch(err){
        return next(err);
    }
})


const Monster = mongoose.model("Monster", monsterSchema);
module.exports = Monster;