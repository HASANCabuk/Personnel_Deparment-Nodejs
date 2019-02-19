const mysqlDb = require("mysql");
const sett = require("./settings");

exports.executeSql = function (sql,service, callback) {
  var conn = new mysqlDb.createConnection(sett.dbConfing);
  conn.connect((err)=>{
    if(err){
      callback(null,err);
    }else{
      if(service==="Department"){
        console.log("Connection to the "+service);
      }else if(service==="Personnal"){
        console.log("Connection to the "+service);
      }else if(service==="User"){
        console.log("Connection to the "+service);
      }
      conn.query(sql,(err,rows)=>{
        if(err){
          console.log("Error in the query");
          callback(null,err);
       }else{
        console.log("Success query");
          callback(rows,null);
       }      
    });
    } 
  });   
};
