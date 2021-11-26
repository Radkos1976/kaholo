class command {      
    command: string; 
    args: String[]     
    constructor(strcomm :string) {
        this.command = strcomm.trimStart().substring(1,strcomm.indexOf(' '));
        this.args=strcomm.trimStart().substring(strcomm.indexOf(' ')).split(' ')
      }    
} 

module.exports = {
    GetCommand: (strcomm :string) => new command(strcomm)
  };