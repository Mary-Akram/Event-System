
const express = require("express");
const body_parser=require("body-parser");
const mongoose= require("mongoose");

const authRouter=require("./Routers/authRouter");
const studentRouter=require("./Routers/studentRouter");
const speakerRouter=require("./Routers/speakerRouter");
const eventRouter=require("./Routers/eventRouter");

const server=express();


mongoose.connect("mongodb://localhost:27017/ITIEventSystem")
        .then(()=>{
            console.log("DB connectd");
            server.listen(process.env.PORT||8080,()=>{
                console.log("I am Listening .. ")
            });
        })
        .catch(error=>console.log("DB we cannot connect"))



//Logger MW
server.use((request,response,next)=>{
    console.log(request.url,request.method);
    next();
});

//Body Parser
server.use(body_parser.json());
server.use(body_parser.urlencoded({extended:false}));

//Routers
server.use(authRouter);
server.use(studentRouter);
server.use(speakerRouter);
server.use(eventRouter);

//Not Found MW
server.use((request,response)=>{
    response.status(404).json({meassge:"Page is Not Found"});
 });

//Error
//something went wrong when deployment
server.use((error,request,response,next)=>{
    response.status(500).json({meassge:error+""});
});
