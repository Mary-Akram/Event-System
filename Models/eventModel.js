const mongoose = require("mongoose");

let eventSchema = new mongoose.Schema({
    _id:Number,
    title:{type:String,required :true},
    date:Date,
    mainSpeakerId:{type:mongoose.Schema.Types.ObjectId,ref:"speakers",default:"null"}, 
    otherSpeakersId:[{type:mongoose.Schema.Types.ObjectId,ref:"speakers",default:"null"}],
    studentsId:[{type:Number,ref:"students",default:0}]
})
module.exports=mongoose.model("events",eventSchema);