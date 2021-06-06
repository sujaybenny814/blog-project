const Router = require("express").Router()
const authenticationController = require("../controller/authenticationController")
const validation  = require("../validation/validation")
const userValidation = require("../schemavalidation/userValidation")

Router.post("/signUp",validation.schemaValidation(userValidation.signUp),authenticationController.signUp)

Router.post("/signIn",validation.schemaValidation(userValidation.signIn),authenticationController.signIn("user"))


module.exports =Router
