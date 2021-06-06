const express = require("express")
const app = express()
require("./database/databaseConnect")
require('dotenv').config()
const port = process.env.PORT || 3000
const jwt = require("./security/jwt")
app.use(express.json())


app.use("/authentication",require("./route/authenticationRouter"))
app.use("/admin",jwt.verifyToken,require("./route/adminRouter"))
// app.use("/admin",require("./route/adminRouter"))


app.listen(3000,(err,data)=>{
    if(err)
    console.error(err)
    else
    console.log("app is running on port : ", port)

})


