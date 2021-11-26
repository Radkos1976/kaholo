import { spawn } from "child_process";
const comm = require("../model/command");

export default function RunCMD( StrCommand: string ) {
    // *** Return the promise
    return new Promise(function (resolve, reject) {
      const param= comm.GetCommand(command);      
      const process = spawn(param.command, param.args);
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
