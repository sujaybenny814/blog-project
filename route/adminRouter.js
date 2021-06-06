const Router = require("express").Router()
const adminController = require("../controller/adminController")
const validation  = require("../validation/validation")
const categoryValidation = require("../schemavalidation/categoryValidation")
const authenticationController = require("../controller/authenticationController")
const userValidation = require("../schemavalidation/userValidation")



Router.post("/create-category",validation.schemaValidation(categoryValidation.createCategory),adminController.createCategory)

Router.post("/signIn",validation.schemaValidation(userValidation.signIn),authenticationController.signIn("admin")) // to change jwt problem


// Router.post("/create-category",validation.schemaValidation(categoryValidation.createCategory),adminController.createCategory)


// Router.post("/signIn",validation.schemaValidation(userValidation.signIn),adminController.signIn("user"))


module.exports =Router
