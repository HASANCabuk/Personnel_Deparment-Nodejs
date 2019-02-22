var db = require("../dbConnect");
const httpMsgs=require("../helpers/htttpMsg");
const util=require("util");

const departmantService ={};
departmantService.getList = function (req, res) {
    db.executeSql("SELECT * FROM department","Department", (data, err) => {
         if (err) {
        httpMsgs.show405(res,err);
        }
        else {
        httpMsgs.sendJson(res,data);        
        }

    });
};
departmantService.get = function (req, res, depId) {
    db.executeSql("SELECT * FROM department WHERE Id="+depId,"Department", (data, err) => {
            if (err) {
           httpMsgs.show500(res,err);
           }
           else {
           httpMsgs.sendJson(res,data);        
           }
   
       });
};
departmantService.add = function (req, res, reqBody) {
    try {
        if(!reqBody)throw new Error("İnput not valid");
        const data=JSON.parse(reqBody);
        if(data){       
           // var sql="INSERT INTO students(Name) VALUES ('"+data.Name+"')";
           var sql="INSERT INTO department  (Id,Name) VALUES ";
            sql+=util.format("(%d,'%s')",null,data.Name);
            db.executeSql(sql,"Department",(data,err)=>{
                if (err) {
                    httpMsgs.show500(res,err);
                    }
                    else {
                    httpMsgs.send200(res);        
                    }
          });          
        }else{
            throw new Error("İnput not valid");
        }
    } catch (err) {
        httpMsgs.show500(res,err);
    }

};
departmantService.update = function (req, res, reqBody) {
    try {
        if(!reqBody)throw new Error("İnput not valid");
        const data=JSON.parse(reqBody);
        if(data){
            if(!data.Id) throw new Error("No no provided")

            var sql="UPDATE department SET";
            var isDataProvided=false;
            if(data.Name){
                sql+=" Name='"+data.Name+"' ";
                isDataProvided=true;
            }
                      
            sql=sql.slice(0,-1);//remove last comma
            sql+=" WHERE Id="+data.Id;
            
            db.executeSql(sql,"Department",(data,err)=>{
            if (err) {
                httpMsgs.show500(rres,err);
                }
                else {
                httpMsgs.send200(res);        
                }
          });          
        }else{
            throw new Error("İnput not valid");
        }
    } catch (err) {
        httpMsgs.show500(res,err);
    }

};
departmantService.delete = function (req, res, reqBody) {
    try {
        if(!reqBody)throw new Error("İnput not valid");
        const data=JSON.parse(reqBody);
        if(data){
            if(!data.Id) throw new Error(" Department Id no provided")

            var sql="DELETE FROM department";
               sql+=" WHERE Id="+data.Id;
            db.executeSql(sql,"Department",(data,err)=>{
            if (err) {
                httpMsgs.show500(res,err);
                }
                else {
                httpMsgs.send200(res);        
                }
          });          
        }else{
            throw new Error("İnput not valid");
        }
    } catch (err) {
        httpMsgs.show500(res,err);
    }
};

module.exports=departmantService;