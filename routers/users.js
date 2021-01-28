const express = require("express");
const { check } = require("express-validator");
const { registerUser , login , renewToken} = require("../controllers/user");
const { validateCamp } = require("../middlewares/validate-camp");
const {ValidateToken} = require('../middlewares/validate-token')

const routers = express.Router();

routers.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("email", "Email is invalid").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "The password must be 6 characters").isLength({ min: 6 }),
    validateCamp
  ],
  registerUser
);

routers.post('/login' , 
[
     check('email' , 'Email is required').not().isEmpty(),
     check('password' , 'Password is required').not().isEmpty(),
     validateCamp
]
 , login)

 routers.get('/renew',[ValidateToken] , renewToken)

module.exports = routers;
