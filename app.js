const express=require("express");
const app=express(); 

const sett=require("./settings");


const depController=require("./routes/DepartmentController");
const perController=require("./routes/PersonnalController");
const usController=require("./routes/UserController");


app.use("/department",depController);
app.use("/personnal",perController);
app.use("/user",usController)
app.use("/",usController)

app.listen(sett.webPort,()=>{
    console.log("Listening on port: "+sett.webPort);
});