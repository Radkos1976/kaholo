var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/commandHist";

  
async function SaveDTA (data:any) {
    MongoClient.connect(url, function(err:any, db :any) {
        if (err) throw err;
        var dbo = db.db("commandHist");
        var myobj =data;
        dbo.collection("History_of_Commands").insertOne(myobj, function(err :any, res :any) {
          if (err) throw err;          
          db.close();
        });
      });
      
}
module.exports = {
    SaveDBlog: (options:any) => SaveDTA(options)
  }; 