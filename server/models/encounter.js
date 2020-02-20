const mongoose = require("mongoose");
const User = require("./user");

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
});

encounterSchema.pre("remove", async function(next){
    try{
        let user = await User.findById(this.user);
        user.encounters.remove(this.id);
        await user.save();
        return next();
    } catch(err){
        return next(err);
    }
})

const Encounter = mongoose.model("Encounter", encounterSchema);
module.exports = Encounter;