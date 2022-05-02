const express=require("express");
const router=express.Router();


const authMW=require("../MiddleWares/authMiddleWare");
const controller=require("../Controllers/studentController");

const express_validator=require("express-validator");
const {body, param, query}=require("express-validator");

router.use(authMW);

router.route("/students")
.get(controller.getAllStudents)
.post(controller.createStudent)
.put(controller.updateStudent)
.delete(controller.deleteStudent)

module.exports=router;
