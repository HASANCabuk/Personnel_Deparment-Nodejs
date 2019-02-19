const express=require("express");
const app=express(); 

const sett=require("./settings");
const depController=require("./routes/DepartmentController");
const perController=require("./routes/PersonnalController");
const usController=require("./routes/UserController");
const httpMsgs=require("./Controllers/htttpMsg");
/*app.use('/',(req,res)=>{
    httpMsgs.showHome(req,res,"controller")
});*/
app.use("/department",depController);
app.use("/personnal",perController);
app.use("/user"||"/",usController)

app.listen(sett.webPort,()=>{
    console.log("Listening on port: "+sett.webPort);
});