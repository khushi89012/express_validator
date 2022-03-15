const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/user.model");

const usermodel = require("../models/user.model")
const router = express.Router();

router.post("/",

body("firstName")
.not()
.trim()
.isEmpty()
.withMessage("First Name cannot be empty")
.isLength({min:4})
.withMessage("First Name must be at least 4 characters"),
body("lasttName")
.not()
.trim()
.isEmpty()
.withMessage("First Name cannot be empty")
.isLength({min:4})
.withMessage("First Name must be at least 4 characters"),

body("email")
.not()
.isEmail()
.normalizeEmail()
.withMessage("Email should not be empty")
.custom((value => {
    return User.findByEmail(value).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    });
  })),
body("pincode")
.not()
.isEmpty()
.withMessage("Pincode mustnot be empty")
.not()
.isNumeric()
.withMessage("pincode must be a number between 1 and 100")
.custom((val)=>{
    if(val > 100 && val < 1){
        throw new error("Incorrect pincode has provided");
    }
return true;
}),
body("gender")
.not()
.isEmpty()
.custom((val)=>{
    
    
        var gM = val.gender_male.value;
        var gF= val.gender_female.value; //error here

        if(gM.checked==false && gF.checked==false )
           {
                alert("You must select male or female");
                return false;
           }  
           return true; 
     
})
,


async(req,res)=>{

try {
    const err = validationResult(req)
    console.log({err})
    if(!err.isEmpty()){
        return res.status(400).send({ err: err.array() });
    }
    const user = await User.create(req.body)
    return res.status(201).send({user:user})



} catch (error) {
    res.status(400).send("OPPs something went wrong")
}



})

module.exports = router;

