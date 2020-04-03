const mongoose = require("mongoose");

const ProfilSchema = mongoose.Schema({
    name: {type:String,required:true},
    tel: {type:Number,required:true},
    mail: {type:String,required:true,unique:true},
    password: {type:String,required:true},
    address: {type:String,required:true},
    picture: {type:String,required:true}
});

module.exports = mongoose.model("Profil",ProfilSchema);