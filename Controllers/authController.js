const jwt = require('jsonwebtoken');
const Student=require("../Models/studentModel");
const Speaker=require("../Models/speakerModel");

module.exports.login=(request,response,next)=>{

    let token;

     if(request.body.email=="marieesaa73@gmail.com"&&request.body.password=="123")
     {
         token=jwt.sign({_id:1,
         email:request.body.email
         ,role:"admin"},
         "WELCOMETOITI",
         {expiresIn:"19h"});
         response.status(200).json({msg:"login",token})
     }

     else{
         Student.findOne({email:request.body.email,password:request.body.password})
         .then(data=>{
             if(data==null)
             {

                Speaker.findOne({email:request.body.email,password:request.body.password})
                .then(data=>{
                    if(data==null)

                         throw new Error("username and password are incorrect");
                    token=jwt.sign({_id:1,
                        email:request.body.email
                        ,role:"speaker"},
                        "WELCOMETOITI",
                        {expiresIn:"19h"});
                        response.status(200).json({msg:"login",token})
                })
                .catch(error=>next(error))

             }else{
                token=jwt.sign({_id:1,
                    email:request.body.email
                    ,role:"student"},
                    "WELCOMETOITI",
                    {expiresIn:"19h"});
                    response.status(200).json({msg:"login",token})
    
                 
             }
     

             

         })
         .catch(error=>next(error))
     }
     
    }

