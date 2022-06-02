const { response } = require("express");
const { validationResult } = require("express-validator");
const SpeakerSchema = require("../Models/speakerModel");
const EventSchema=require("./../Models/eventModel");

module.exports.getAllSpeakers = (request, response) => {
  if (request.role == "student" || request.role == "speaker") {
    console.log("No valid Role", request.role);

    throw new Error("Not Authorizd");
  }
  SpeakerSchema.find({}).select({"password":0})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};

module.exports.createSpeaker = async (request, response, next) => {
  let result = validationResult(request);
  if (!result.isEmpty()) {
    let message = result
      .array()
      .reduce((current, error) => current + error.msg, " ");
    let error = new Error(message);
    error.status = 422;
    throw error;
  }
  const speaker = new SpeakerSchema(request.body);
  try {
    const savedspeaker = await speaker.save();
    response.status(201).json({ message: "Speaker created", savedspeaker });
  } catch (err) {
    response.status(500).json(err);
  }
};

module.exports.updateSpeakerbySpeaker = (request, response, next) => {
  if (request.role == "student" || request.role == "Admin") {
    throw new Error("Not Authorizd");
  }
  const updatedSpeaker = SpeakerSchema.updateOne(
    { _id: request.body.id },
    {
      $set: {
        email: request.body.email,
        username: request.body.username,
        password: request.body.password,
        address: {
          city: request.body.address.city,
          street: request.body.address.street,
          buillding: request.body.address.buillding,
        },
      },
    }
  )
    .then((data) => {
      if (data.matchedCount == 0) throw new Error("Speaker not exists");
      response.status(200).json({ message: "Speaker updated", data });
    })
    .catch((error) => next(error));
};
module.exports.updateSpeakerbyAdmin = (request, response, next) => {
  if (request.role == "student" || request.role == "speaker") {
    console.log(request.role);
    throw new Error("Not Authorizd");
  }
  console.log("this is ", request.role);

  console.log("Ready");
  const updatedSpeaker = SpeakerSchema.updateOne(
    { _id: request.body.id },
    {
      $set: {
        email: request.body.email,
        address: {
          city: request.body.address.city,
          street: request.body.address.street,
          buillding: request.body.address.buillding,
        },
      },
    }
  )
    .then((data) => {
      if (data.matchedCount == 0) throw new Error("Speaker not exists");
      response.status(200).json({ message: "Speaker updated", data });
    })
    .catch((error) => next(error));
};
module.exports.deleteSpeaker = (request, response, next) => {
  if (request.role == "student") {
    console.log("No valid Role", request.role);

    throw new Error("Not Authorizd");
  }
  console.log("valid Role", request.role);
  SpeakerSchema.deleteOne({ _id: request.body.id }, {})
    .then((data) => {
      if (data.deletedCount == 0) throw new Error("Speaker not exists");
      response.status(200).json({ message: "Speaker deleted", data });
    })
    .catch((error) => next(error));
};

module.exports.GetSpeakerById = (request,response,next)=>{
    if(request.role=="student")
    {
        throw new Error("Not Authorized");
    }

    
    SpeakerSchema.findOne({id:request.params._id}).select({"password":0})
    .then((data)=>{
        //send json data of choosen speaker to front ent
        response.status(200).json(data);
    })
    .catch(error => {
        next(error);
    })
}
//View his registered events

module.exports.SpeakerEvent = (request,response,next)=>{
    if(request.role=="student")
    {
        throw new Error("Not Authorized");
    }

    
    EventSchema.findOne({$or:[{mainSpeakerId:request.params.id},{otherSpeakersId:request.params.id}]}).select({"title":1,"date":1,"mainSpeakerId":1,"otherSpeakersId":1})
    .then((data)=>{
        //send json data of choosen speaker to front ent
        response.status(200).json(data);
    })
    .catch(error => {
        next(error);
    })
}