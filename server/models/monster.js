const mongoose = require("mongoose");
const User = require("./user");
const Encounter = require("./encounter");

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
        let encounter = await Encounter.findById(this.encounterId)
        encounter.message.remove(this.id);
        await encounter.save();
        return next();
    } catch(err){
        return next(err);
    }
})


const Monster = mongoose.model("Monster", monsterSchema);
module.exports = Monster;