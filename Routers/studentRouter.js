const express=require("express");
const router=express.Router();


const authMW=require("../MiddleWares/authMiddleWare");
const controller=require("../Controllers/studentController");

const express_validator=require("express-validator");
const {body, param, query}=require("express-validator");

router.post("/students",controller.createStudent)


router.use(authMW);

router.route("/students")
.get(controller.getAllStudents)
.put(controller.updateStudent)
.delete(controller.deleteStudent)
router.get("/students/:id",controller.GetStudentById)
router.get("/studentevents/:id",controller.studentEvent)

module.exports=router;
