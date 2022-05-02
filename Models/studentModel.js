const mongoose=require("mongoose");


 let studentSchema=new mongoose.Schema({
    _id:Number,
    email:{type:String,unique:true},
    password:String,   
 
 });

module.exports=mongoose.model("students",studentSchema)
