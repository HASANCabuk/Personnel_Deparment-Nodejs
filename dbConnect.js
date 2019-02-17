const mysqlDb = require("mysql");
const sett = require("./settings");

exports.executeDepSql = function (sql, callback) {
  var conn = new mysqlDb.createConnection(sett.dbConfing);
  conn.connect((err)=>{
    if(err){
      callback(null,err);
    }else{
      console.log("Connection to the department");
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

exports.executePerSql = function (sql, callback) {
  var conn = new mysqlDb.createConnection(sett.dbConfing);
  conn.connect((err)=>{
    if(err){
      callback(null,err);
    }else{
      console.log("Connection to the personnal");
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
