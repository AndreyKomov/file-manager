export class LoggerService {
    userName;

    constructor(userName) {
      this.userName = userName
    }
  
    gretting() {
      console.log(`Welcome to the File Manager, ${this.userName}!`);
    }
  
    showCurrentDirectory(workingDirPath) {
      console.log(`You are currently in "${workingDirPath}".`);
    }
  
    showFiles(files) {
      console.table(files);
    }
  
    log(data) {
      console.log(data);
    }
  
    showByeMessage() {
      console.log(`\nThank you for using File Manager, ${this.userName}, goodbye!!`)
    }
  }