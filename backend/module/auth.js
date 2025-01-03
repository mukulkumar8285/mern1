const mongoose = require("mongoose");

const UserAuthSchema = mongoose.Schema({
    username:{
        type:String

    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    token:{
        type:String
    }
})

const UserSchema = mongoose.model("userexpense"  , UserAuthSchema);

module.exports = UserSchema;