var db = require("../dbConnect");
const httpMsgs=require("../Controllers/htttpMsg");
const util=require("util");

const personnalService ={};

personnalService.getList = function (req, res) {
    db.executePerSql("SELECT * FROM personnal", (data, err) => {
     /* if(err){
          res.status(500).send(err);
      }else{
          res.send(data);
      }*/
         if (err) {
        httpMsgs.show405(req,res,err);
        }
        else {
        httpMsgs.sendJson(req,res,data);        
        }

    });
};
personnalService.get = function (req, res, perId) {
    db.executePerSql("SELECT * FROM personnal WHERE Id="+perId, (data, err) => {
            if (err) {
           httpMsgs.show500(req,res,err);
           }
           else {
           httpMsgs.sendJson(req,res,data);        
           }
   
       });
};
personnalService.add = function (req, res, reqBody) {
    try {
        if(!reqBody)throw new Error("İnput not valid");
        const data=JSON.parse(reqBody);
        if(data){            
         var sql="INSERT INTO 'personnal'('Id','DepId','Name','Surname','DateOfBirth','Gender','Married','Salary') VALUES ";
         sql+=util.format("(%d,%d,'%s','%s','%s',%d,%d,%d)",null,data.DepId,data.Name,data.Surname,data.DateOfBirth ,data.Gender,data.Married,data.Salary);
                   
         /*  var sql="INSERT INTO 'personnal'('Id','DepId','Name','Surname','DateOfBirth','Gender','Married','Salary') VALUES "+
           "("+null+","+data.DepId+",'"+data.Name+"','"+data.Surname+"','"+data.DateOfBirth+"',"+data.Gender+","+data.Married+","+data.Salary+")";   */   
            db.executePerSql(sql,(data,err)=>{
            if (err) {
                httpMsgs.show500(req,res,err);
                }
                else {
                httpMsgs.send200(req,res);        
                }
          });          
        }else{
            throw new Error("İnput not valid");
        }
    } catch (err) {
        httpMsgs.show500(req,res,err);
    }

};
personnalService.update = function (req, res, reqBody) {
    try {
        if(!reqBody)throw new Error("İnput not valid");
        const data=JSON.parse(reqBody);
        if(data){
            if(!data.Id) throw new Error("Personnal Id no provided")

            var sql="UPDATE Personnal SET ";
            var isDataProvided=false;
            if(data.DepId){
                sql+="DepId="+data.DepId+",";
                isDataProvided=true;
            }  
            if(data.Name){
                sql+="Name='"+data.Name+"',";
                isDataProvided=true;
            }     
           if(data.Surname){
                sql+="Surname=''"+data.Surname+"',";
                isDataProvided=true;
            }   
            if(data.DateOfBirth){
                sql+="DateOfBirth ='"+data.DateOfBirth+"',";
                isDataProvided=true;
            }    
            if(data.Gender){
                sql+="Gender ="+data.Gender+",";
                isDataProvided=true;
            }   
            if(data.Married){
                sql+="Married ="+data.Married+",";
                isDataProvided=true;
            }   
            if(data.Salary){
                sql+="Salary="+data.Salary+",";
                isDataProvided=true;
            }      
            sql=sql.slice(0,-1);//remove last comma
            sql+=" WHERE Id="+data.Id;
            
            db.executePerSql(sql,(data,err)=>{
            if (err) {
                httpMsgs.show500(req,res,err);
                }
                else {
                httpMsgs.send200(req,res);        
                }
          });          
        }else{
            throw new Error("İnput not valid");
        }
    } catch (err) {
        httpMsgs.show500(req,res,err);
    }

};
personnalService.delete = function (req, res, reqBody) {
    try {
        if(!reqBody)throw new Error("İnput not valid");
        const data=JSON.parse(reqBody);
        if(data){
            if(!data.Id) throw new Error("Personnal Id no provided")

            var sql="DELETE FROM personnal";
               sql+=" WHERE Id="+data.Id;
            db.executePerSql(sql,(data,err)=>{
            if (err) {
                httpMsgs.show500(req,res,err);
                }
                else {
                httpMsgs.send200(req,res);        
                }
          });          
        }else{
            throw new Error("İnput not valid");
        }
    } catch (err) {
        httpMsgs.show500(req,res,err);
    }
};

module.exports=personnalService;