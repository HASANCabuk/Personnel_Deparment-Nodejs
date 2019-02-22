var db = require("../dbConnect");
const httpMsgs=require("../helpers/htttpMsg");
const util=require("util");

const userService ={};

userService.getList = function (req, res) {
    db.executeSql("SELECT * FROM user","User", (data, err) => {
         if (err) {
        httpMsgs.show405(res,err);
        }
        else {
        httpMsgs.sendJson(res,data);        
        }

    });
};
userService.get = function (req, res, usId) {
    db.executeSql("SELECT * FROM user WHERE Id="+usId,"User", (data, err) => {
            if (err) {
           httpMsgs.show500(res,err);
           }
           else {
           httpMsgs.sendJson(res,data);        
           }
   
       });
};
userService.add = function (req, res, reqBody) {
    try {
        if(!reqBody)throw new Error("İnput not valid");
        const data=JSON.parse(reqBody);
        if(data){            
         var sql="INSERT INTO user(Id,Name,Surname,Username,Role) VALUES ";
         sql+=util.format("(%d,'%s','%s','%s','%s')",null,data.Name,data.Surname,data.Username,data.Role);
            db.executeSql(sql,"User",(err)=>{
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
userService.update = function (req, res, reqBody) {
    try {
        if(!reqBody)throw new Error("İnput not valid");
        const data=JSON.parse(reqBody);
        if(data){
            if(!data.Id) throw new Error("User Id no provided")

            var sql="UPDATE user SET ";
            var isDataProvided=false;    
            if(data.Name){
                sql+="Name='"+data.Name+"',";
                isDataProvided=true;
            }     
           if(data.Surname){
                sql+="Surname=''"+data.Surname+"',";
                isDataProvided=true;
            }   
            if(data.Username){
                sql+="Username ='"+data.Username+"',";
                isDataProvided=true;
            }          
            if(data.Role){
                sql+="Role ='"+data.Role+"',";
                isDataProvided=true;
            }    
            sql=sql.slice(0,-1);//remove last comma
            sql+=" WHERE Id="+data.Id;
            
            db.executeSql(sql,"User",(err)=>{
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
userService.delete = function (req, res, reqBody) {
    try {
        if(!reqBody)throw new Error("İnput not valid");
        const data=JSON.parse(reqBody);
        if(data){
            if(!data.Id) throw new Error("User Id no provided")

            var sql="DELETE FROM user";
               sql+=" WHERE Id="+data.Id;
            db.executeSql(sql,"User",(err)=>{
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

module.exports=userService;