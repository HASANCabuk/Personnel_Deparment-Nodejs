var express = require('express');
var router = express.Router();

const httpMsgs=require("../Controllers/htttpMsg");
var userService=require("../services/UserService");

router.get('/',(req,res)=>{
    userService.getList(req,res);
 });

router.get('/:user_id',(req,res)=>{
    var depId="[0-9]+";
    var patt= new RegExp(depId);
    if(patt.test(req.url)){
        patt=new RegExp(depId);
        var deppId=patt.exec(req.url);
        userService.get(req,res,deppId);
    }else{
    httpMsgs.show404(req,res);
    }
});

router.post('/add',(req,res)=>{
    var reqBody='';
    req.on("data",(data)=>{
        reqBody+=data;
        if(reqBody.length>1e7)//10MB
        {
            httpMsgs.show413 (req,res); 
        } 
    });
    req.on("end",()=>{
        userService.add(req,res,reqBody);
    })

});

router.put('/update',(req,res)=>{
    var reqBody='';
    req.on("data",(data)=>{
        reqBody+=data;
        if(reqBody.length>1e7)//10MB
        {
            httpMsgs.show413 (req,res); 
        } 
    });
    req.on("end",()=>{
        userService.update(req,res,reqBody);
    })

});

router.delete('/delete',(req,res)=>{
    var reqBody='';
    req.on("data",(data)=>{
        reqBody+=data;
        if(reqBody.length>1e7)//10MB
        {
            httpMsgs.show413 (req,res); 
        } 
    });
    req.on("end",()=>{
        userService.delete(req,res,reqBody);
    })

});

module.exports=router;