const express=require("express");
const router=express.Router();
const controller=require("../Controllers/speakerController")
const express_validator=require("express-validator");
const {body, param, query}=require("express-validator");
const authMW=require("./../MiddleWares/authMiddleWare")

router.route("/speakers")
.get(authMW,controller.getAllSpeakers)
.post(controller.createSpeaker)
.put(authMW,controller.updateSpeakerbySpeaker)
.delete(authMW,controller.deleteSpeaker)
router.put("/speakersAdmin",authMW,controller.updateSpeakerbyAdmin)
router.get("/speakerId/:id",authMW,controller.GetSpeakerById)
router.get("/registerEventforspeaker/:id",controller.SpeakerEvent)

module.exports=router;