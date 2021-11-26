import { spawn } from "child_process";
const comm = require("../model/command");
const saveDTA = require("../controler/db_std");

function RunCMD( StrCommand: string ) {
    // *** Return the promise
    return new Promise(function (resolve, reject) {
      
      const param= comm.GetCommand(StrCommand);      
      const process = spawn(param.command, param.args,{shell:true});
      var output='';
      var Erroutput='';
      process.on('close', function (code) { // Should probably be 'exit', not 'close'        
        resolve({stdout:output,stderr:Erroutput});
      });
      process.stdout.on("data", data => {        
        data=data.toString();
        output+=data;
      });
      process.stderr.on("data", data => {    
        data=data.toString();
        Erroutput+=data;
      });    
      process.on('error', function (err) {        
        reject(err);
      });
    });
}
async function get(options:string) {
  var data ={}
  const result=await RunCMD(options);
  await saveDTA.SaveDBlog({command:options,result:result})
  return result
}
module.exports = {
  SendCommand: (options:string) => get(options)
};