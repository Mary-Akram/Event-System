const jwt = require('jsonwebtoken');
const Student=require("../Models/studentModel");
const Speaker=require("../Models/speakerModel");
const bcrypt=require("bcrypt")

module.exports.login=(request,response,next)=>{

    let token;

     if(request.body.email=="admin@gmail.com"&&request.body.password=="123")
     {
         token=jwt.sign({_id:1,
         email:request.body.email
         ,role:"admin"},
         "WELCOMETOITI",
         {expiresIn:"19h"});
         response.status(200).json({msg:"login/Admin",token})
     }

     else{
         let user=Student.findOne({email:request.body.email})
         .then(data=>
            {
             if(data==null)
             {

               let speake=Speaker.findOne({email:request.body.email,password:request.body.password})
                .then(data=>{
                    if(data==null)

                         throw new Error("username and password are incorrect");
                    token=jwt.sign({_id:1,
                        email:request.body.email
                        ,role:"speaker"},
                        "WELCOMETOITI",
                        {expiresIn:"19h"});
                        response.status(200).json({msg:"login/speaker",token,speake})
                })
                .catch(error=>next(error))

             }else{
                if (user) {
                    // check user password with hashed password stored in the database
                    const validPassword = bcrypt.hash.compare(request.body.password, user.password);
                    if (validPassword) {
                token=jwt.sign({_id:1,
                    email:request.body.email
                    ,role:"student"},
                    "WELCOMETOITI",
                    {expiresIn:"19h"});
                    response.status(200).json({msg:"login/student",token,user})
                }
            }
    
                 
             }
     

             

         })
         .catch(error=>next(error))
     }
     
    }

   