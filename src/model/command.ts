class command {      
    command: string; 
    args: String[]     
    constructor(strcomm :string) {
        this.command = strcomm.trimStart().substring(0,strcomm.indexOf(' ')!=-1?strcomm.indexOf(' '):strcomm.length);
        this.args=strcomm.trimStart().substring(strcomm.indexOf(' ')!=-1?strcomm.indexOf(' '):strcomm.length).trimStart().split(' ')        
      }    
} 

module.exports = {
    GetCommand: (strcomm :string) => new command(strcomm)
  };