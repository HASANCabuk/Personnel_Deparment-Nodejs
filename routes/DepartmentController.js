var express = require('express');
var router = express.Router();

const httpMsgs=require("../helpers/htttpMsg");
var departmentService=require("../services/DepartmentService") 
router.get('/',(req,res)=>{
    departmentService.getList(req,res);
 });

router.get('/:dep_id',(req,res)=>{
    var depId="[0-9]+";
    var patt= new RegExp(depId);
    if(patt.test(req.url)){
        patt=new RegExp(depId);
        var deppId=patt.exec(req.url);
       departmentService.get(req,res,deppId);
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
        departmentService.add(req,res,reqBody);
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
        departmentService.update(req,res,reqBody);
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
        departmentService.delete(req,res,reqBody);
    })

});
module.exports=router;