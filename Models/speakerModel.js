const mongoose = require("mongoose");

let speakerSchema = new mongoose.Schema({
    email:{type:String,unique :true},
    username:String,
    password:String, 
    address:
    {
        city: String, 
        street:String , 
        buillding:String
    }
})
module.exports=mongoose.model("speakers",speakerSchema);