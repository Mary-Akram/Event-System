const express=require("express");
const router=express.Router();
const controller=require("../Controllers/speakerController")
const express_validator=require("express-validator");
const {body, param, query}=require("express-validator");

router.route("/speakers")
.get(controller.getAllSpeakers)
.post(controller.createSpeaker)
.put(controller.updateSpeaker)
.delete(controller.deleteSpeaker)

module.exports=router;