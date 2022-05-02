const {validationResult}=require("express-validator");
const EventSchema=require("../Models/eventModel");

module.exports.getAllEvents=(request,response)=>{
    EventSchema.find({})
           .then((data)=>{
               response.status(200).json({data});

           })
           .catch(error=>next(error))
    
}

module.exports.createEvent=(request,response,next)=>{
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
    let event = new EventSchema({
        _id:request.body.id,
        title:request.body.title,
        date:request.body.date,
        mainSpeakerId:request.body.mainSpeakerId, 
        otherSpeakersId:request.body.otherSpeakersId,
        studentsId:request.body.studentsId
    })
    event.save()
    .then((data)=>{ 
        
        response.status(200).json({message:"event created",data})

    }).catch(error=>next(error));
}


module.exports.updateEvent=(request,response,next)=>{
    if(request.role !=="admin")
    {
       throw new Error("Not Authorizd");
    }
    EventSchema.updateOne({_id:request.body.id},{
        $set:{
            title:request.body.title,
            date:request.body.date,
            mainSpeakerId:request.body.mainSpeakerId, 
            otherSpeakersId:request.body.otherSpeakersId,
            studentsId:request.body.studentsId
        }
    }).then(data=>{
        if(data.matchedCount==0)
        throw new Error("Event not exists");
        response.status(200).json({message:"Event updated",data});

    })
    .catch(error=>next(error))

        
}


module.exports.deleteEvent=(request,response,next)=>{

        if(request.role !=="admin")
        {
            throw new Error("Not Authorizd");
        }
   
        Event.deleteOne({_id:request.body.id},{
          
        }).then(data=>{
             if(data.deletedCount==0)
            throw new Error("Event not exists");
            response.status(200).json({message:"Evet deleted",data});
    
        })
        .catch(error=>next(error))
    
}



