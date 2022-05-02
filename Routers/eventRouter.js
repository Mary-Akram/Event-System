const express=require("express");
const router=express.Router();
const controller=require("../Controllers/eventController")
const express_validator=require("express-validator");
const {body, param, query}=require("express-validator");
const authMW=require("../MiddleWares/authMiddleWare");

router.use(authMW);


router.route("/events")
.get(controller.getAllEvents)
.post(controller.createEvent)
.put(controller.updateEvent)
.delete(controller.deleteEvent)

module.exports=router;