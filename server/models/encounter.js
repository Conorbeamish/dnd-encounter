const mongoose = require("mongoose");
const User = require("./user");
const Monster = require("./monster");
const db = require("../models/index");

const encounterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    monsters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Monster"
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

encounterSchema.pre("remove", async function(next){
    try{
        //remove encounter from associated user
        let user = await User.findById(this.user);
        user.encounters.remove(this.id);
        await user.save();
        //remove monsters associated with encounter
        console.log(this.monsters)
        this.monsters.forEach( async function(id){
            console.log(id)
            let monster = await db.Monster.findById(id);
            await monster.remove();
        });
        return next();
    } catch(err){
        return next(err);
    }
})

const Encounter = mongoose.model("Encounter", encounterSchema);
module.exports = Encounter;