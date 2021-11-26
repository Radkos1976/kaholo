import { spawn } from "child_process";
const comm = require("../model/command");

function RunCMD( StrCommand: string ) {
    // *** Return the promise
    return new Promise(function (resolve, reject) {
      console.log('Im here');
      const param= comm.GetCommand(StrCommand);      
      const process = spawn(param.command, param.args,{shell:true});
      var output='';
      var Erroutput='';
      process.on('close', function (code) { // Should probably be 'exit', not 'close'
        // *** Process completed
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
        // *** Process creation failed
        reject(err);
      });
    });
}
async function get(options:string) {
  var data ={}
  const result=await RunCMD(options);
  
  return result
}
module.exports = {
  SendCommand: (options:string) => get(options)
};