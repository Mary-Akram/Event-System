const mongoose = require("mongoose");

let eventSchema = new mongoose.Schema({
    _id:Number,
    title:{type:String,required :true},
    date:Date,
    mainSpeakerId:{type:mongoose.Schema.Types.ObjectId,ref:"speakers"}, 
    otherSpeakersId:[{type:mongoose.Schema.Types.ObjectId,ref:"speakers"}],
    studentsId:[{type:mongoose.Schema.Types.ObjectId,ref:"students"}]
})
module.exports=mongoose.model("events",eventSchema);