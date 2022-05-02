const {validationResult}=require("express-validator");
const SpeakerSchema=require("../Models/speakerModel");

module.exports.getAllSpeakers=(request,response)=>{
    SpeakerSchema.find({})
           .then((data)=>{
               response.status(200).json({data});

           })
           .catch(error=>next(error))
    
}

module.exports.createSpeaker=(request,response,next)=>{

    if(request.role !=="admin")
    {
       throw new Error("Not Authorizd");
    }
    let result = validationResult(request);
    if(!result.isEmpty()){
        let message=result.array().reduce((current,error)=>current+error.msg," ");
        let error = new Error(message);
        error.status=422;
        throw error;

    }
    let speaker = new SpeakerSchema({
        _id:request.body.id,
        email:request.body.email,
        username:request.body.username,
        password:request.body.password, 
        city:request.body.address.city,
        street:request.body.address.street,
        buillding:request.body.address.buillding
    })
    speaker.save()
    .then((data)=>{ 
        
        response.status(200).json({message:"speaker created",data})

    }).catch(error=>next(error));
}


module.exports.updateSpeaker=(request,response,next)=>{

    if(request.role !=="admin" && request.role!=="speaker")
    {
       throw new Error("Not Authorizd");
    }
    SpeakerSchema.updateOne({_id:request.body.id},{
        $set:{
            email:request.body.email,
            username:request.body.username,
            password:request.body.password, 
            city:request.body.address.city,
            street:request.body.address.street,
            buillding:request.body.address.buillding

        }
    }).then(data=>{
        if(data.matchedCount==0)
        throw new Error("Speaker not exists");
        response.status(200).json({message:"Speaker updated",data});

    })
    .catch(error=>next(error))

        
}


module.exports.deleteSpeaker=(request,response,next)=>{
       if(request.role !=="admin")
       {
            throw new Error("Not Authorizd");
       }  
        SpeakerSchema.deleteOne({_id:request.body.id},{
          
        }).then(data=>{
             if(data.deletedCount==0)
            throw new Error("Speaker not exists");
            response.status(200).json({message:"Speaker deleted",data});
    
        })
        .catch(error=>next(error))
    
}



