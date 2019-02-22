var express = require('express');
var router = express.Router();

const httpMsgs=require("../helpers/htttpMsg");
var personnalService=require("../services/PersonnalService");

router.get('/',(req,res)=>{
    personnalService.getList(req,res);
 });

router.get('/:per_id',(req,res)=>{
    var depId="[0-9]+";
    var patt= new RegExp(depId);
    if(patt.test(req.url)){
        patt=new RegExp(depId);
        var deppId=patt.exec(req.url);
       personnalService.get(req,res,deppId);
    }else{
    httpMsgs.show404(res);
    }
});

router.post('/add',(req,res)=>{
    var reqBody='';
    req.on("data",(data)=>{
        reqBody+=data;
        if(reqBody.length>1e7)//10MB
        {
            httpMsgs.show413 (res); 
        } 
    });
    req.on("end",()=>{
        personnalService.add(req,res,reqBody);
    })

});

router.put('/update',(req,res)=>{
    var reqBody='';
    req.on("data",(data)=>{
        reqBody+=data;
        if(reqBody.length>1e7)//10MB
        {
            httpMsgs.show413 (res); 
        } 
    });
    req.on("end",()=>{
        personnalService.update(req,res,reqBody);
    })

});

router.delete('/delete',(req,res)=>{
    var reqBody='';
    req.on("data",(data)=>{
        reqBody+=data;
        if(reqBody.length>1e7)//10MB
        {
            httpMsgs.show413 (res); 
        } 
    });
    req.on("end",()=>{
        personnalService.delete(req,res,reqBody);
    })

});

module.exports=router;