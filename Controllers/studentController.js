const {validationResult}=require("express-validator");
const Student=require("../Models/studentModel");
const EventSchema=require("../Models/eventModel")
const bcrypt=require('bcrypt')

module.exports.getAllStudents=(request,response)=>{
    Student.find({}).select({"password":0})
           .then((data)=>{
               response.status(200).json({data});

           })
           .catch(error=>next(error))
    
}

module.exports.createStudent=(request,response,next)=>{
    let result = validationResult(request);
    if(!result.isEmpty()){
        let message=result.array().reduce((current,error)=>current+error.msg," ");
        let error = new Error(message);
        error.status=422;
        throw error;

    }
    const salt = bcrypt.genSaltSync(10);

    let student = new Student({
         _id:request.body._id,
        email:request.body.email,
        password:bcrypt.hashSync(request.body.password,salt)

    })

    student.save()
    .then((data)=>{ 
        
        response.status(200).json({message:"student created",data})

    }).catch(error=>next(error));
}



module.exports.updateStudent=(request,response,next)=>{
    if(request.role =="speaker"||request.role=="Admin")
    {
       throw new Error("Not Authorizd");
    }
    const salt = bcrypt.genSaltSync(10);


    Student.updateOne({_id:request.body.id},{
        $set:{
            email:request.body.email,
            password:bcrypt.hashSync(request.body.password,salt)
        }
    }).then(data=>{
        if(data.matchedCount==0)
        throw new Error("Student not exists");
        response.status(200).json({message:"Student updated",data});

    })
    .catch(error=>next(error))

        
}


module.exports.deleteStudent=(request,response,next)=>{

       if(request.role=="speaker")
       {
           throw new Error("Not Authorizd");
       }
   
        Student.deleteOne({id:request.body._id},{
          
        }).then(data=>{
             if(data.deletedCount==0)
            throw new Error("Student not exists");
            response.status(200).json({message:"Student deleted",data});
    
        })
        .catch(error=>next(error))
    
}



module.exports.GetStudentById = (request,response,next)=>{
    if(request.role=="speaker")
    {
        throw new Error("Not Authorized");
    }

    
    Student.findOne({id:request.params._id}).select({"password":0})
    .then((data)=>{
        //send json data of choosen speaker to front ent
        response.status(200).json(data);
    })
    .catch(error => {
        next(error);
    })
}
//View his registered events

module.exports.studentEvent = (request,response,next)=>{
    if(request.role!=="speaker")
    {
        console.log(request.role)

        throw new Error("Not Authorized");
    }

    
    EventSchema.findOne({studentsId:request.params.id}).select({"title":1,"date":1,"mainSpeakerId":1,"otherSpeakersId":1})
    .then((data)=>{
        //send json data of choosen speaker to front ent
        response.status(200).json(data);
    })
    .catch(error => {
        next(error);
    })
}